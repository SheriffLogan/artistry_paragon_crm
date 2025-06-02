// src/config/ApiConfig.jsx
import axios from 'axios';
import endpoint from './endpoint';

const client = axios.create({
  baseURL: endpoint.base_url,
  headers: { 'Content-Type': 'application/json' },
});

// CART
export const fetchCart = () =>
  client.get(endpoint.cart_endpoints.getCart).then(res => res.data);

export const addCartItem = (variantId, quantity) =>
  client.post(endpoint.cart_endpoints.addItem, { variantId, quantity })
        .then(res => res.data);

export const removeCartItem = (itemId) =>
  client.delete(`${endpoint.cart_endpoints.removeItem}${itemId}`)
        .then(res => res.data);

export const clearCart = () =>
  client.delete(endpoint.cart_endpoints.clearCart);

// ORDERS
export const createOrder = (items) =>
  client.post(endpoint.order_endpoints.createOrder, { items })
        .then(res => res.data);

export const listOrders = () =>
  client.get(endpoint.order_endpoints.listOrders).then(res => res.data);

export const getOrder = (orderId) =>
  client.get(`${endpoint.order_endpoints.getOrder}${orderId}`)
        .then(res => res.data);

// PRODUCTS
export const fetchProducts = () =>
  client.get(endpoint.product_endpoints.list).then(res => res.data);

export const fetchProduct = (productId) =>
  client.get(`${endpoint.product_endpoints.getOne}${productId}`)
        .then(res => res.data);

// add more exports for shipments, promotions, returns, inventory, support…

export default {
  fetchCart, addCartItem, removeCartItem, clearCart,
  createOrder, listOrders, getOrder,
  fetchProducts, fetchProduct,
};
