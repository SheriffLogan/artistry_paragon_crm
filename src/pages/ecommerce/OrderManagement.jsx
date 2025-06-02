// src/pages/crm/OrdersManagement.jsx
import React, { useEffect, useState } from 'react';
import { PageBreadcrumb } from '../../components';
import { listOrders } from '../../config/ApiConfig';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    listOrders().then(setOrders);
  }, []);

  return (
    <>
      <PageBreadcrumb title="Orders" subName="Management" />
      <div className="card">
        <div className="p-6">
          <h3 className="card-title mb-4">All Orders</h3>
          <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-start text-sm font-medium text-gray-500">Order ID</th>
                  <th className="px-4 py-2 text-start text-sm font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-2 text-start text-sm font-medium text-gray-500">Total</th>
                  <th className="px-4 py-2 text-start text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-2 text-start text-sm font-medium text-gray-500">Placed On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="px-4 py-2 text-sm text-gray-600">#{o.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{o.user.firstName} {o.user.lastName}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">${(o.totalCents/100).toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{o.status}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersManagement;
