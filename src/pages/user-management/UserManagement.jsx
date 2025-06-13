// src/pages/user-management/UserManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { fetchUsers, deleteUser } from '../../redux/auth/actions'; // Import actions
import PageBreadcrumb from '../../components/PageBreadcrumb';
import UserFormModal from '../../components/UserFormModal'; // Import the new UserFormModal
import { Grid } from 'gridjs-react'; // Import Grid directly here
import { api } from '../../helpers/api/apiCore'; // Import the api instance

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const { users, usersLoading, usersError } = useSelector(state => state.Auth); // Get users data from Redux

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); // Null for create, user object for edit

  // Fetch users on component mount and whenever a refresh is triggered (after CUD operations)
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOpenCreateModal = () => {
    setUserToEdit(null); // Ensure no user is selected for editing
    setIsModalOpen(true);
  };

  const handleOpenEditModal = useCallback(async (userId) => {
    try {
      // Fetch the user data to pre-fill the form
      const response = await api.fetchUserById(userId); // Direct API call to get single user
      setUserToEdit(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch user for editing:', error.response ? error.response.data : error.message);
      alert('Failed to load user data for editing. Please try again.');
    }
  }, []);

  const handleDeleteUser = useCallback((userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      dispatch(deleteUser(userId)); // Dispatch delete action
      // Saga will re-fetch users on success
    }
  }, [dispatch]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUserToEdit(null); // Clear user to edit state
  };

  const handleSaveSuccess = () => {
    // This function is called after a successful save in the modal.
    // The saga for addUser/updateUser already dispatches fetchUsers,
    // so no explicit action needed here to refresh, but good to keep for clarity.
    console.log("User saved successfully, table will refresh via saga.");
  };

  const columns = [
    { id: 'id', name: 'ID', width: '50px' },
    { id: 'firstName', name: 'First Name' },
    { id: 'lastName', name: 'Last Name' },
    { id: 'email', name: 'Email' },
    {
      id: 'role',
      name: 'Role',
      formatter: (role) => role ? role.name : 'N/A' // Access role.name directly
    },
    { id: 'createdAt', name: 'Created At', formatter: (cell) => new Date(cell).toLocaleDateString() },
    {
      id: 'actions',
      name: 'Actions',
      sort: false,
      formatter: (cell, row) => {
        const userId = row.cells[0].data; // Assuming ID is the first column

        return (
          <div className="flex items-center justify-start space-x-3">
            <button
              onClick={() => handleOpenEditModal(userId)}
              className="text-indigo-600 hover:text-indigo-900 transition"
              title="Edit User"
            >
              <i className="ri-settings-3-line text-base"></i>
            </button>
            <button
              onClick={() => handleDeleteUser(userId)}
              className="text-red-600 hover:text-red-900 transition"
              title="Delete User"
            >
              <i className="ri-delete-bin-2-line text-base"></i>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <PageBreadcrumb title="User Management" subName="CRM" />
      <div className="card p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Users, Roles & Permissions</h1>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Add New User
          </button>
        </div>
        <p className="text-gray-600 mb-4">Manage user accounts, assign roles, and control permissions within the system.</p>
        <p className="text-red-500 font-semibold mb-4">Access: Admin Only</p>

        {usersLoading && <div className="text-center p-4">Loading users...</div>}
        {usersError && <div className="text-center p-4 text-red-500">Error: {usersError.message || JSON.stringify(usersError)}</div>}

        {!usersLoading && !usersError && (
          <Grid
            data={users} // Data comes from Redux state
            columns={columns}
            pagination={{ enabled: true, limit: 10 }}
            search={true}
            sort={true}
            className={{
              table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
              thead: 'bg-gray-50 dark:bg-gray-800',
              th: 'px-4 py-4 text-start text-sm font-medium text-gray-500 dark:text-gray-200',
              tbody: 'divide-y divide-gray-200 dark:divide-gray-700',
              td: 'px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200',
              footer: 'p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700',
              pagination: 'flex items-center justify-between mt-4 text-gray-700 dark:text-gray-200',
              container: 'overflow-x-auto',
            }}
          />
        )}
      </div>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        userToEdit={userToEdit}
        onSaveSuccess={handleSaveSuccess}
      />
    </div>
  );
};

export default UserManagementPage;