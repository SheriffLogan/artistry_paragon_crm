// src/pages/crm/OrdersManagement.jsx
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // For linking to order details
import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css'; // Or your preferred theme

import { fetchOrdersRequest } from '../../redux/orders/actions';
import PageBreadcrumb from '../../components/PageBreadcrumb'; // Assuming this component exists and is suitable

const OrdersManagementPage = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.Orders);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
  }, [dispatch]);

  const formatCurrency = (cents) => {
    return (cents / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }); // Assuming INR, adjust as needed
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const columns = useMemo(() => [
    { id: 'id', name: 'Order ID', width: '100px' },
    {
      id: 'customerName',
      name: 'Customer Name',
      formatter: (cell, row) => row.cells.find(c => c.id === 'user')?.data?.firstName ? \`\${row.cells.find(c => c.id === 'user')?.data?.firstName} \${row.cells.find(c => c.id === 'user')?.data?.lastName}\` : cell
    },
    {
      id: 'customerEmail',
      name: 'Customer Email',
      formatter: (cell, row) => row.cells.find(c => c.id === 'user')?.data?.email || cell
    },
    { id: 'status', name: 'Status', width: '120px' },
    {
      id: 'totalCents',
      name: 'Total',
      formatter: (cell) => formatCurrency(cell),
      width: '120px',
    },
    {
      id: 'items',
      name: 'Items',
      formatter: (cell) => Array.isArray(cell) ? cell.length : 'N/A',
      width: '80px',
    },
    { id: 'paymentStatus', name: 'Payment', width: '120px' },
    {
      id: 'createdAt',
      name: 'Order Date',
      formatter: (cell) => formatDate(cell),
      width: '150px',
    },
    {
      name: 'Actions',
      sort: false,
      width: '150px', // Increased width slightly for debugging text
      formatter: (cell, row) => {
        const orderIdCell = row.cells.find(c => c.id === 'id');
        const orderId = orderIdCell ? orderIdCell.data : undefined;

        if (!orderId) return 'ID_ERR'; // Indicate if orderId is not found

        return React.createElement(Link, {
          to: \`/crm/orders/\${orderId}\`,
          className: 'text-indigo-600 hover:text-indigo-900'
        }, \`View \${orderId}\`); // Added orderId to text for confirmation
      }
    },
    // Hidden column for user object to access its properties in other formatters
    { id: 'user', name: 'User Object', hidden: true },
  ], []);

  // Prepare data for the Grid to match column IDs
  // Grid.js expects data to be an array of arrays, or an array of objects if using 'id' in columns
  // The formatters above assume 'row.cells.find(c => c.id === '...').data' which is for when Grid receives array of objects
  // and columns have 'id's.
  const gridData = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    return orders.map(order => ({
        id: order.id,
        customerName: order.customerName, // Fallback if user object is not directly on order
        customerEmail: order.customerEmail, // Fallback
        user: order.user, // Pass the whole user object
        status: order.status,
        totalCents: order.totalCents,
        items: order.items,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt
    }));
  }, [orders]);


  if (loading) {
    return <div className="text-center p-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error fetching orders: {error.message || JSON.stringify(error)}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <PageBreadcrumb title="Order Management" subName="CRM" />
      <div className="card p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Orders</h1>
          {/* Add any buttons here if needed, e.g., Refresh */}
        </div>

        {gridData.length === 0 && !loading && (
          <div className="text-center p-4 text-gray-500">No orders found.</div>
        )}

        {gridData.length > 0 && (
            <>
              <p className="text-gray-600 text-sm mb-2">Total Orders: {gridData.length}</p>
              <Grid
                data={gridData}
                columns={columns}
                pagination={{ enabled: true, limit: 10 }}
                search={true}
                sort={true}
                className={{
                  container: 'overflow-x-auto w-full',
                  table: 'min-w-full table-auto border-collapse border border-gray-200',
                  thead: 'bg-gray-100',
                  th: 'px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200',
                  tbody: 'bg-white divide-y divide-gray-200',
                  tr: 'hover:bg-gray-50',
                  td: 'px-4 py-3 whitespace-nowrap text-sm text-gray-700 border-b border-gray-200',
                  footer: 'p-4 bg-gray-100 border-t border-gray-200',
                  pagination: 'flex items-center justify-between mt-4 text-sm text-gray-600',
                  // Modified lines:
                  paginationButton: 'px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 text-gray-700', // Added default text color
                  paginationButtonCurrent: 'bg-indigo-500 text-white border-indigo-500 opacity-100', // Added opacity-100
                  // Original search and input styles
                  search: 'max-w-xs mb-4',
                  input : 'mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                }}
              />
            </>
        )}
      </div>
    </div>
  );
};

export default OrdersManagementPage;
