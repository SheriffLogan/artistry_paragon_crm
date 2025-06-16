// src/routes/index.jsx
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// --- Auth Pages ---
const Login2 = React.lazy(() => import('../pages/auth2/Login2'));
const Register2 = React.lazy(() => import('../pages/auth2/Register2'));
const Logout2 = React.lazy(() => import('../pages/auth2/Logout2'));
const RecoverPassword2 = React.lazy(() => import('../pages/auth2/RecoverPassword2'));
const LockScreen2 = React.lazy(() => import('../pages/auth2/LockScreen2'));
const ConfirmMail2 = React.lazy(() => import('../pages/auth2/ConfirmMail2'));

export const authRoutes = [
  { path: '/auth/login2', element: <Login2 />, route: Route },
  { path: '/auth/register2', element: <Register2 />, route: Route },
  { path: '/auth/logout2', element: <Logout2 />, route: Route },
  { path: '/auth/recover-password2', element: <RecoverPassword2 />, route: Route },
  { path: '/auth/lock-screen2', element: <LockScreen2 />, route: Route },
  { path: '/auth/confirm-mail2', element: <ConfirmMail2 />, route: Route },
];

// --- Error & Maintenance ---
const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error500 = React.lazy(() => import('../pages/error/Error500'));
const MaintenancePages = React.lazy(() => import('../pages/other/Maintenance'));

export const publicFallbackRoutes = [
  { path: '/error-404', element: <Error404 />, route: Route },
  { path: '/error-500', element: <Error500 />, route: Route },
  { path: '/pages/maintenance', element: <MaintenancePages />, route: Route },
];

// --- Dashboard ---
const OverviewPage = React.lazy(() => import('../pages/dashboard/Overview'));
const KeyMetricsPage = React.lazy(() => import('../pages/dashboard/KeyMetrics'));
export const dashboardRoutes = [
  { path: '/dashboard/overview', element: <OverviewPage />, route: PrivateRoute },
  { path: '/dashboard/key-metrics', element: <KeyMetricsPage />, route: PrivateRoute },
];

// --- Analytics ---
const WebsitePage = React.lazy(() => import('../pages/analytics/Website'));
const InstagramPage = React.lazy(() => import('../pages/analytics/Instagram'));
const OtherChannelsPage = React.lazy(() => import('../pages/analytics/OtherChannels'));
export const analyticsRoutes = [
  { path: '/analytics/website', element: <WebsitePage />, route: PrivateRoute },
  { path: '/analytics/instagram', element: <InstagramPage />, route: PrivateRoute },
  { path: '/analytics/other-channels', element: <OtherChannelsPage />, route: PrivateRoute },
];

// --- E-Commerce ---
const ProductsPage = React.lazy(() => import('../pages/ecommerce/Products'));
const CartPage = React.lazy(() => import('../pages/ecommerce/Cart'));
const OrdersMgmtPage = React.lazy(() => import('../pages/ecommerce/OrderManagement'));
export const ecommerceRoutes = [
  { path: '/ecommerce/products', element: <ProductsPage />, route: PrivateRoute },
  { path: '/ecommerce/cart', element: <CartPage />, route: PrivateRoute },
  { path: '/ecommerce/orders', element: <OrdersMgmtPage />, route: PrivateRoute },
];

// --- CRM Pages (NEW) ---
const CustomerPage = React.lazy(() => import('../pages/customers/Customer'));
const UserManagementPage = React.lazy(() => import('../pages/user-management/UserManagement'));
const OrdersManagementPage = React.lazy(() => import('../pages/crm/OrdersManagement'));

export const crmRoutes = [
  { path: '/crm/customers', element: <CustomerPage />, route: PrivateRoute, roles: ['admin', 'client'] },
  { path: '/crm/user-management', element: <UserManagementPage />, route: PrivateRoute, roles: ['admin'] },
  { path: '/crm/orders-list', element: <OrdersManagementPage />, route: PrivateRoute, roles: ['admin', 'crm_user'] },
];

// --- Combine Protected Routes ---
export const protectedRoutes = [
  // Redirect base '/dashboard' to overview
  { path: '/dashboard', element: <Navigate to="/dashboard/overview" replace />, route: PrivateRoute },
  ...dashboardRoutes,
  ...analyticsRoutes,
  ...ecommerceRoutes,
  ...crmRoutes,
  // add other modules here...
];

// --- Public Routes (root and auth) ---
export const publicRoutes = [
  { path: '/', element: <Navigate to="/auth/login2" replace />, route: Route },
  ...authRoutes,
  // catch all 404 → login
  { path: '*', element: <Navigate to="/auth/login2" replace />, route: Route },
  ...publicFallbackRoutes,
];

// --- Helpers to flatten for use in Routes.jsx ---
export const flattenRoutes = (routes = []) =>
  routes.reduce((acc, route) => {
    acc.push(route);
    return acc;
  }, []);

export const authProtectedFlattenRoutes = flattenRoutes(protectedRoutes);
export const publicProtectedFlattenRoutes = flattenRoutes(publicRoutes);
