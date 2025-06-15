// src/pages/user-management/UserManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { fetchUsers, deleteUser,fetchRoles } from '../../redux/auth/actions'; // Import actions
import PageBreadcrumb from '../../components/PageBreadcrumb';
import UserFormModal from '../../components/UserFormModal'; // Import the new UserFormModal
import { Grid } from 'gridjs-react'; // Import Grid directly here
import { api } from '../../helpers/api/apiCore'; // Import the api instance

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const { users: usersState, usersLoading, usersError, roles : rolesState, rolesLoading, rolesError } = useSelector(state => state.Auth); // Get users data from Redux
  // Extract the actual array data from the Redux state objects
// const usersData = Array.isArray(usersState) ? usersState : [];
// const rolesData = Array.isArray(rolesState) ? rolesState : [];

  const usersData = Array.isArray(usersState?.data) ? usersState.data.map(user => JSON.parse(JSON.stringify(user))) : [];
  // Roles data extraction, assuming it's also an object with a 'data' property
  const rolesData = Array.isArray(rolesState) ? rolesState.map(role => JSON.parse(JSON.stringify(role))) : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); // Null for create, user object for edit

  // Fetch users on component mount and whenever a refresh is triggered (after CUD operations)
  useEffect(() => {
    console.log("UserManagementPage: Dispatching fetchUsers and fetchRoles on mount.");
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleOpenCreateModal = () => {
    setUserToEdit(null); // Ensure no user is selected for editing
    setIsModalOpen(true);
    console.log("UserManagementPage: Opening create user modal.");
  };

  const handleOpenEditModal = useCallback(async (userId) => {
    console.log("UserManagementPage: Attempting to open edit modal for userId:", userId);
    try {
      const response = await api.fetchUserById(userId);
      console.log("UserManagementPage: Fetched user for editing:", response.data);
      setUserToEdit(JSON.parse(JSON.stringify(response.data)));
      setIsModalOpen(true);
    } catch (error) {
      console.error('UserManagementPage: Failed to fetch user for editing:', error.response ? error.response.data : error.message);
      const message = `Failed to load user data for editing: ${error.response?.data?.message || error.message}. Please try again.`;
      console.error(message);
    }
  }, []);

  const handleDeleteUser = useCallback((userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      console.log("UserManagementPage: Dispatching deleteUser for userId:", userId);
      dispatch(deleteUser(userId));
    }
  }, [dispatch]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
    console.log("UserManagementPage: Closing user form modal.");
  };

  const handleSaveSuccess = () => {
    console.log("UserManagementPage: User saved successfully. Table will refresh via saga.");
    // Re-fetch users to ensure the table reflects the latest state
    dispatch(fetchUsers());
    handleModalClose();
  };

  const columns = React.useMemo(() => [
    { id: 'id', name: 'ID', width: '50px' },
    { id: 'firstName', name: 'First Name' },
    { id: 'lastName', name: 'Last Name' },
    { id: 'email', name: 'Email' },
    {
      id: 'role',
      name: 'Role',
      formatter: (cell) => (cell && cell.name ? cell.name : 'N/A') // Access role.name directly
    },
    { id: 'createdAt', name: 'Created At', formatter: (cell) => cell ? new Date(cell).toLocaleDateString() : 'N/A' },
    {
      id: 'actions',
      name: 'Actions',
      sort: false,
      formatter: (cell, row) => { // 'cell' will be undefined as there's no 'actions' property on user object
                                  // 'row' will be the user object itself
        const userId = row.id; // Access userId directly from the row object

        return (
          <div className="flex items-center justify-start space-x-3">
            <button
              onClick={() => handleOpenEditModal(userId)}
              className="text-indigo-600 hover:text-indigo-900 transition p-1"
              title="Edit User"
            >
              <i className="ri-pencil-line text-lg"></i>
            </button>
            <button
              onClick={() => handleDeleteUser(userId)}
              className="text-red-600 hover:text-red-900 transition p-1"
              title="Delete User"
            >
              <i className="ri-delete-bin-2-line text-lg"></i>
            </button>
          </div>
        );
      },
    },
  ], [handleOpenEditModal, handleDeleteUser]);

  console.log("UserManagementPage: Current users data:", usersData);
  console.log("UserManagementPage: Current roles data:", rolesData);
  console.log("UserManagementPage: Users loading status:", usersLoading);
  console.log("UserManagementPage: Users error status:", usersError);

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
        {usersError && <div className="text-center p-4 text-red-500">Errorfetching users: {usersError.message || (usersError.data && usersError.data.message) || JSON.stringify(usersError)}</div>}
        {!usersLoading && !usersError && usersData && usersData.length === 0 && (
          <div className="text-center p-4 text-gray-500">No users found. Add one using the button above.</div>
        )}
        {/* Display count of users */}
        {!usersLoading && !usersError && usersData && (
            <p className="text-gray-600 text-sm mb-2">Total Users: {usersData.length}</p>
        )}

        {!usersLoading && !usersError && usersData.length > 0 && (
          <Grid
            data={usersData} // Data comes from Redux state
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
        roles={rolesData}
        rolesLoading={rolesLoading}
        rolesError={rolesError}
      />
    </div>
  );
};

export default UserManagementPage;