// src/pages/customers/Customer.jsx
import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import PageBreadcrumb from '../../components/PageBreadcrumb';

const CustomerPage = () => {
    const userRoleName = useSelector(state => state.Auth.user?.role?.name);
    const isAdmin = userRoleName === 'admin';
    const isClient = userRoleName === 'client';

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <PageBreadcrumb title="Customers" subName="CRM" />
            <div className="card p-6 md:p-8">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Client List, Segmentation, Tags</h1>
                <p className="text-gray-600 mb-4">This section is for managing customer data, segmentation, and applying tags.</p>
                {isAdmin && <p className="text-green-600 font-semibold">Access: Admin (Full Access)</p>}
                {isClient && <p className="text-blue-600 font-semibold">Access: Client (View Only)</p>}
                {!isAdmin && !isClient && <p className="text-red-500 font-semibold">Access: Restricted (Admin or Client role required)</p>}

                {/* Add customer-specific content here. You might need to fetch data based on role. */}
                {/* For example, if client, show only their own customers. If admin, show all. */}
            </div>
        </div>
    );
}

export default CustomerPage;