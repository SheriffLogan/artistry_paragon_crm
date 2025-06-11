// src/components/UserFormModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Use Redux hooks
import { addUser, updateUser } from '../redux/auth/actions'; // Import actions

const UserFormModal = ({ isOpen, onClose, userToEdit, onSaveSuccess, roles, rolesLoading, rolesError }) => {
  const dispatch = useDispatch();
  const { usersLoading, usersError } = useSelector(state => state.Auth); // Get roles and loading/error states

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '', // Only for create or if password is being updated
    roleId: 1, // Default to a common user role ID (e.g., 'user' role)
  });
  const [formError, setFormError] = useState(null); // Local error for form validation/submission

  const isEditing = !!userToEdit;
  const isLoading = usersLoading || rolesLoading; // Combined loading state

  useEffect(() => {
    // if (isOpen) {
    //   dispatch(fetchRoles()); // Fetch roles when modal opens
    // }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if(userToEdit){
      setFormData({
        firstName: userToEdit.firstName || '',
        lastName: userToEdit.lastName || '',
        email: userToEdit.email || '',
        password: '', // Never pre-fill password for security
        roleId: userToEdit.role?.id || (roles.length > 0 ? roles[0].id : 1), // Pre-fill role ID, fallback to first role or 1
      });
    } else {
      // Reset form for new user creation
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: roles.length > 0 ? roles[0].id : 1, // Default to first role or 1
      });
    }
  }
    setFormError(null); // Clear local errors when modal opens/changes user
  }, [isOpen, userToEdit, roles]); // Depend on roles to update default roleId if roles load later

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null); // Clear previous errors

    // Basic client-side validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (!isEditing && !formData.password) {
      setFormError('Password is required for new users.');
      return;
    }
    if (formData.password && formData.password.length < 6) {
        setFormError('Password must be at least 6 characters long.');
        return;
    }

    try {
      if (isEditing) {
        const updatePayload = { ...formData };
        if (!updatePayload.password) {
          delete updatePayload.password; // Don't send empty password if not changed
        }
        dispatch(updateUser(userToEdit.id, updatePayload)); // Dispatch update action
      } else {
        dispatch(addUser(formData)); // Dispatch add action
      }
      // Saga will handle API call and re-fetching users.
      // We just need to close the modal and indicate success to parent.
      onClose();
      onSaveSuccess(); // This will trigger a refresh in the parent component
    } catch (err) {
      // Errors will be handled by Redux saga and stored in state.Auth.usersError
      // We can display a generic message or rely on the Redux error state being displayed
      console.error("Form submission error caught in component:", err);
      setFormError("An unexpected error occurred during submission.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <i className="ri-close-line text-lg text-gray-600"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditing ? 'Edit User' : 'Create New User'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
              disabled={isEditing || isLoading} // Email usually not editable or requires special handling
            />
          </div>
          {!isEditing && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required={!isEditing}
                disabled={isLoading}
              />
            </div>
          )}
          {isEditing && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Leave blank to keep current password"
                disabled={isLoading}
              />
            </div>
          )}

          <div>
            <label htmlFor="roleId" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              id="roleId"
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              required
              disabled={isLoading || roles.length === 0}
            >
              {rolesLoading ? (
                <option value="">Loading roles...</option>
              ) : rolesError ? (
                <option value="">Error loading roles</option>
              ) : (
                roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
          {usersError && <p className="text-red-500 text-sm mt-2">API Error: {usersError.message || JSON.stringify(usersError)}</p>}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;