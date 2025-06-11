// src/config/endpoint.js
const endpoint = {
  // base_url: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',  // your NestJS URL
    base_url: 'http://localhost:3000',  // your NestJS URL


 auth: {
    login:    '/auth/login',
    register: '/auth/register',
    refresh:  '/auth/refresh',
    profile:  '/auth/profile',
    forgotPassword:  '/auth/forgot-password',
  },

  // Users and Roles Management (NEW)
  users: {
    list: '/users',
    getOne: '/users/', // + userId
    create: '/users',
    update: '/users/', // + userId
    remove: '/users/', // + userId
  },
  roles: { // Assuming you will add a GET /roles endpoint in your backend
    list: '/roles',
  },

  // carts
  cart_endpoints: {
    getCart:     '/carts',
    addItem:     '/carts/items',
    removeItem:  '/carts/items/',       // + itemId
    clearCart:   '/carts',
  },

  // orders
  order_endpoints: {
    createOrder: '/orders',
    listOrders:  '/orders',
    getOrder:    '/orders/',            // + orderId
  },

  // products
  product_endpoints: {
    list:        '/products',
    getOne:      '/products/',          // + productId
  },

  // shipments
  shipment_endpoints: {
    list:        '/shipments',
    getOne:      '/shipments/',         // + shipmentId
    create:      '/shipments',
    update:      '/shipments/',         // + shipmentId
    remove:      '/shipments/',         // + shipmentId
  },

  // promotions (coupons)
  promo_endpoints: {
    list:        '/promotions',
    getOne:      '/promotions/',        // + promoId
    create:      '/promotions',
    update:      '/promotions/',        // + promoId
    remove:      '/promotions/',        // + promoId
  },

  // …and so on for returns, inventory, support tickets, etc.
};

export default endpoint;