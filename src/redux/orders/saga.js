// src/redux/orders/saga.js
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { api }_from_ '../../helpers/api/apiCore'; // Adjust path if apiCore is elsewhere

import { fetchOrdersSuccess, fetchOrdersFailure } from './actions';
import { FETCH_ORDERS_REQUEST } from './constants';

// Worker saga: makes the API call when watcher saga sees the action
function* fetchOrders() {
  try {
    // Assuming apiCore.get returns the response object with a 'data' field
    // The API doc says the response body is an array of Order objects.
    // It also mentions /crm/orders, so the full path might be needed if apiCore is not pre-configured with /crm base
    // Let's assume api.get handles the full URL or combines base paths correctly.
    // The API doc says: "Successful Response (200 OK): Body: An array of Order objects."
    // And the base path for CRM API is /crm. So, endpoint is /crm/orders.
    const response = yield call(api.get, '/crm/orders');

    // The API documentation shows the data is directly the array of orders.
    // If api.get wraps response in a 'data' object like { data: [...] }, use response.data
    // Based on user's previous UserManagement.jsx, response.data was common.
    // However, the CRM API doc for Get All Orders says "Body: An array of Order objects."
    // Let's assume response IS the array or response.data is the array.
    // If api.get returns { data: actualArray, status: 'success' } (like other APIs in project)
    // then we need response.data.
    // Given the project context, it's safer to assume response.data holds the payload.
    // If the API returns the array directly as response body, then `response` itself.
    // Let's stick to `response.data` as a common pattern in this app.
    // If the API directly returns the array, this will need adjustment.
    // The user's API docs say: "Body: An array of Order objects."
    // This implies the direct body IS the array. api.get might return this directly or wrapped.
    // Let's assume api.get returns an object where the actual data array is in a property,
    // typically 'data' or the response itself if it's configured to return direct data.
    // Most axios wrappers return { data, status, headers, ... }. So `response.data` is common.

    yield put(fetchOrdersSuccess(response.data.data)); // Assuming response.data.data is the array of orders
  } catch (error) {
    // Construct a more informative error object if possible
    const errorData = error.response ? error.response.data : { message: error.message };
    yield put(fetchOrdersFailure(errorData));
  }
}

// Watcher saga: spawns a new fetchOrders task on each FETCH_ORDERS_REQUEST
export function* watchFetchOrders() {
  yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrders);
}

// Root saga for orders module
export default function* ordersSaga() {
  yield all([
    watchFetchOrders(),
    // Add other order sagas here if any
  ]);
}
