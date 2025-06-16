// src/constants/menu.js

const MENU_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    isTitle: true,
  },
  {
    key: 'dashboard-main',
    label: 'Dashboard',
    isTitle: false,
    icon: 'ri-dashboard-line',
    // roles: ['admin', 'client'],
    children: [
      {
        key: 'dashboard-overview',
        label: 'Overview',
        url: '/dashboard/overview',
        parentKey: 'dashboard-main',
        roles: ['admin', 'client'],
      },
      {
        key: 'dashboard-key-metrics',
        label: 'Key Metrics',
        url: '/dashboard/key-metrics',
        parentKey: 'dashboard-main',
        roles: ['admin'],
      },
    ],
  },
  {
    key: 'crm-orders-main',
    label: 'CRM Orders',
    isTitle: false,
    icon: 'ri-shopping-cart-2-line', // Example icon for orders
    roles: ['admin', 'crm_user'],
    children: [
      {
        key: 'crm-orders-list-page',
        label: 'All Orders',
        url: '/crm/orders-list',
        parentKey: 'crm-orders-main',
        roles: ['admin', 'crm_user'],
      },
    ],
  },

  // {
  //   key: 'analytics',
  //   label: 'Analytics',
  //   isTitle: true,
  // },
  {
    key: 'analytics-main',
    label: 'Analytics',
    isTitle: false,
    icon: 'ri-bar-chart-line',
    roles: ['admin', 'client'], // Accessible to both admin and client roles
    children: [
      {
        key: 'analytics-website',
        label: 'Website',
        url: '/analytics/website',
        roles: ['admin'],
        parentKey: 'analytics-main',
      },
      {
        key: 'analytics-instagram',
        label: 'Instagram',
        url: '/analytics/instagram',
        roles: ['admin'],
        parentKey: 'analytics-main',
      },
      {
        key: 'analytics-social-media',
        label: 'Social Media',
        url: '/analytics/social-media',
        roles: ['admin'],
        parentKey: 'analytics-main',
      },
      {
        key: 'analytics-campaigns',
        label: 'Campaigns',
        url: '/analytics/campaigns',
        roles: ['admin'],
        parentKey: 'analytics-main',
      },
      {
        key: 'analytics-sales',
        label: 'Sales',
        url: '/analytics/sales',
        roles: ['admin'],
        parentKey: 'analytics-main',
      },
    ],
  },

    // --- NEW CRM MENU ITEMS ---
  {
    key: 'crm',
    label: 'CRM',
    isTitle: true,
    roles: ['admin', 'client'], // Accessible to both admin and client roles
  },
  {
    key: 'crm-users-customers',
    label: 'Users & Customers',
    isTitle: false,
    roles: ['admin', 'client'],
    icon: 'ri-group-line', // Icon for user management
    children: [
      {
        key: 'crm-user-management',
        label: 'User Management',
        url: '/crm/user-management',
        parentKey: 'crm-users-customers',
        roles: ['admin'], // Only accessible to admin
      },
      {
        key: 'crm-customers',
        label: 'Customers List',
        url: '/crm/customers',
        parentKey: 'crm-users-customers',
        roles: ['admin', 'client'], // Accessible to both admin and client
      },
    ],
  },

  {
    key: 'products',
    label: 'Products',
    isTitle: false,
    icon: 'ri-store-2-line',
    roles: ['admin', 'client'],
    children: [
      { 
        key: 'products-categories', 
        label: 'Categories', 
        url: '/products/categories', 
        roles: ['admin', 'client'],
        parentKey: 'products' 
      },
      { 
        key: 'products-images', 
        label: 'Images', 
        url: '/products/images', 
        roles: ['admin', 'client'],
        parentKey: 'products' 
      },
      { 
        key: 'products-descriptions', 
        label: 'Content Descriptions', 
        url: '/products/descriptions', 
        roles: ['admin', 'client'],
        parentKey: 'products' 
      },
      { 
        key: 'products-variants', 
        label: 'Variants', 
        url: '/products/variants',
        roles: ['admin', 'client'], 
        parentKey: 'products' 
      },
    ],
  },

  {
    key: 'orders',
    label: 'Orders',
    isTitle: false,
    icon: 'ri-shopping-cart-line',
    roles: ['admin', 'client'],
    children: [
      { key: 'orders-all', 
        label: 'All Orders', 
        url: '/orders/all', 
        parentKey: 'orders' 
      },
      { 
        key: 'orders-returns', 
        label: 'Return Requests', 
        url: '/orders/returns', 
        parentKey: 'orders' 
      },
    ],
  },

  {
    key: 'inventory',
    label: 'Inventory',
    isTitle: false,
    icon: 'ri-stack-line',
    children: [
      { key: 'inventory-stock-levels', label: 'Stock Levels', url: '/inventory/stock-levels', parentKey: 'inventory' },
      { key: 'inventory-reconciliation', label: 'Reconciliation', url: '/inventory/reconciliation', parentKey: 'inventory' },
    ],
  },

  {
    key: 'shipments',
    label: 'Shipments',
    isTitle: false,
    icon: 'ri-truck-line',
    children: [
      { key: 'shipments-carriers', label: 'Carrier Integrations', url: '/shipments/carriers', parentKey: 'shipments' },
      { key: 'shipments-tracking', label: 'Tracking Info', url: '/shipments/tracking', parentKey: 'shipments' },
    ],
  },

  {
    key: 'returns-refunds',
    label: 'Returns & Refunds',
    isTitle: false,
    icon: 'ri-refund-line',
    children: [
      { key: 'returns-refunds-requests', label: 'Return Request Flow', url: '/returns-refunds/requests', parentKey: 'returns-refunds' },
      { key: 'returns-refunds-logs', label: 'Refund Logs', url: '/returns-refunds/logs', parentKey: 'returns-refunds' },
    ],
  },

  {
    key: 'promotions',
    label: 'Promotions',
    isTitle: false,
    icon: 'ri-coupon-3-line',
    children: [
      { key: 'promotions-codes', label: 'Promo Codes', url: '/promotions/codes', parentKey: 'promotions' },
      { key: 'promotions-campaigns', label: 'Campaigns', url: '/promotions/campaigns', parentKey: 'promotions' },
      { key: 'promotions-discounts', label: 'Discounts', url: '/promotions/discounts', parentKey: 'promotions' },
    ],
  },

  {
    key: 'payments',
    label: 'Payments',
    isTitle: false,
    icon: 'ri-wallet-line',
    children: [
      { key: 'payments-transactions', label: 'Transactions', url: '/payments/transactions', parentKey: 'payments' },
      { key: 'payments-reconciliation', label: 'Reconciliation', url: '/payments/reconciliation', parentKey: 'payments' },
      { key: 'payments-webhooks', label: 'Webhook Logs', url: '/payments/webhooks', parentKey: 'payments' },
    ],
  },

  {
    key: 'customers',
    label: 'Customers',
    isTitle: false,
    icon: 'ri-user-line',
    children: [
      { key: 'customers-list', label: 'Client List', url: '/customers/list', parentKey: 'customers' },
      { key: 'customers-segmentation', label: 'Segmentation', url: '/customers/segmentation', parentKey: 'customers' },
      { key: 'customers-tags', label: 'Tags', url: '/customers/tags', parentKey: 'customers' },
    ],
  },

  {
    key: 'user-management',
    label: 'User Management',
    isTitle: false,
    icon: 'ri-group-line',
    children: [
      { key: 'user-management-admins', label: 'Admin Users', url: '/user-management/admins', parentKey: 'user-management' },
      { key: 'user-management-roles', label: 'Roles & Permissions', url: '/user-management/roles', parentKey: 'user-management' },
    ],
  },

  {
    key: 'settings',
    label: 'Settings',
    isTitle: false,
    icon: 'ri-settings-3-line',
    children: [
      { key: 'settings-general', label: 'General', url: '/settings/general', parentKey: 'settings' },
      { key: 'settings-branding', label: 'Branding', url: '/settings/branding', parentKey: 'settings' },
      { key: 'settings-api', label: 'API Keys', url: '/settings/api-keys', parentKey: 'settings' },
      { key: 'settings-env', label: 'Environment Config', url: '/settings/env-config', parentKey: 'settings' },
    ],
  },

  {
    key: 'notifications',
    label: 'Notifications',
    isTitle: false,
    icon: 'ri-notification-line',
    children: [
      { key: 'notifications-templates', label: 'Email/SMS Templates', url: '/notifications/templates', parentKey: 'notifications' },
      { key: 'notifications-alerts', label: 'System Alerts', url: '/notifications/alerts', parentKey: 'notifications' },
    ],
  },

  {
    key: 'support',
    label: 'Support',
    isTitle: false,
    icon: 'ri-headphone-line',
    children: [
      { key: 'support-tickets', label: 'Tickets', url: '/support/tickets', parentKey: 'support' },
      { key: 'support-logs', label: 'Logs', url: '/support/logs', parentKey: 'support' },
      { key: 'support-audit', label: 'Audit Trails', url: '/support/audit', parentKey: 'support' },
    ],
  },

  {
    key: 'profile',
    label: 'Profile',
    isTitle: false,
    icon: 'ri-user-settings-line',
    children: [
      { key: 'profile-view', label: 'View Profile', url: '/profile/view', parentKey: 'profile' },
      { key: 'profile-account', label: 'Account Info', url: '/profile/account', parentKey: 'profile' },
      { key: 'profile-password', label: 'Change Password', url: '/profile/password', parentKey: 'profile' },
    ],
  },
];

export { MENU_ITEMS };
