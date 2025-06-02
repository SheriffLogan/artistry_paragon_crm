// const testUrl = 'http://127.0.0.1:8000';
// const deployedUrl = 'https://hootmonk-backend.vercel.app'

// const endpoint = {
//     base_url: deployedUrl,

//     group_endpoints: {
//         fetchGroups: '/groups',
//         createGroup: '/group',
//         updateGroup: '/groups/update',
//         addToExistingGroup: '/groups/add-people',
//         deleteGroup: '/groups'
//     },
//     email_endpoints: {
//         sendEmail: '/send-mail',
//         fetchConfigurations: '/configurations',
//         saveConfiguration: '/configurations',
//         setupGmail: "/setup-smtp/gmail/",
//         setupCustom: "/setup-smtp/"
//     },
//     template_endpoints: {
//         fetchTemplates: '/templates',
//         createTemplate: '/template',
//         deleteTemplate: '/template'
//     }
// }

// export default endpoint;

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