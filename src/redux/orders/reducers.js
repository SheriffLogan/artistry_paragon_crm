// src/redux/orders/reducers.js
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
} from './constants';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        orders: [], // Optionally clear orders on failure or keep stale data
      };
    default:
      return state;
  }
};

export default ordersReducer;
