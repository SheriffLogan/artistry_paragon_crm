// src/pages/UserManagement/UserManagement.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageBreadcrumb } from '../../components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchUsers } from '../../redux/auth/actions'; // Assuming fetchUsers action

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => ({
    users: state.Auth.users,
    loading: state.Auth.loading, // Or a more specific loading state if available
    error: state.Auth.fetchUsersError, // Assuming this error state exists
  }));

  const [colDefs] = useState([
    { field: 'id', headerName: 'User ID', sortable: true, filter: true },
    { field: 'firstName', headerName: 'First Name', sortable: true, filter: true },
    { field: 'lastName', headerName: 'Last Name', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'role.name', headerName: 'Role', sortable: true, filter: true },
    // Example of combining fields if needed, though current colDefs are separate
    // { headerName: 'Name', valueGetter: params => `${params.data.firstName} ${params.data.lastName}`, sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: () => (
        <div>
          <button className="text-blue-500 hover:text-blue-700">Edit</button>
          <button className="text-red-500 hover:text-red-700 ml-2">Delete</button>
        </div>
      ),
      flex: 1,
    }
  ]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // const handleAddNewUser = () => {
  //   // This function would need to dispatch an action to add a user via Redux
  //   // For now, it's commented out as the task focuses on displaying Redux-sourced data
  //   // const newUser = {
  //   //   id: Math.floor(Math.random() * 1000) + 10,
  //   //   firstName: "New",
  //   //   lastName: "User",
  //   //   email: "newuser@example.com",
  //   //   role: { id: 3, name: 'editor' },
  //   //   createdAt: new Date().toISOString(),
  //   //   updatedAt: new Date().toISOString()
  //   // };
  //   // const deepCopiedNewUser = JSON.parse(JSON.stringify(newUser));
  //   // setUsers(prevUsers => [...prevUsers, deepCopiedNewUser]); // This would be a dispatch
  // };

  const usersForGrid = users ? JSON.parse(JSON.stringify(users)) : [];

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error fetching users: {typeof error === 'object' ? JSON.stringify(error) : error}</p>;
  }

  return (
    <>
      <PageBreadcrumb title="User Management" subName="Admin" />
      <div className="card">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="card-title">All Users</h3>
            {/* <button
              onClick={handleAddNewUser} // Commented out as it needs Redux integration
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add New User
            </button> */}
          </div>
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
              rowData={usersForGrid}
              columnDefs={colDefs}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
