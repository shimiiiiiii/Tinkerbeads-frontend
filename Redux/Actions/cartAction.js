import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_SELECTED_ITEMS_FOR_CHECKOUT = 'SET_SELECTED_ITEMS_FOR_CHECKOUT';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const PLACE_ORDER = 'PLACE_ORDER';
export const FETCH_USER_ORDERS_REQUEST = 'FETCH_USER_ORDERS_REQUEST';
export const FETCH_USER_ORDERS_SUCCESS = 'FETCH_USER_ORDERS_SUCCESS';
export const FETCH_USER_ORDERS_FAIL = 'FETCH_USER_ORDERS_FAIL';

export const FETCH_ADMIN_ORDERS_REQUEST = 'FETCH_ADMIN_ORDERS_REQUEST';
export const FETCH_ADMIN_ORDERS_SUCCESS = 'FETCH_ADMIN_ORDERS_SUCCESS';
export const FETCH_ADMIN_ORDERS_FAIL = 'FETCH_ADMIN_ORDERS_FAIL';

export const UPDATE_ORDER_STATUS_REQUEST = 'UPDATE_ORDER_STATUS_REQUEST';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const UPDATE_ORDER_STATUS_FAIL = 'UPDATE_ORDER_STATUS_FAIL';

export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item
});

export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id
});

export const updateQuantity = (id, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: { id, quantity }
});

export const toggleSelection = (id) => ({
    type: TOGGLE_SELECTION,
    payload: id
});

export const clearCart = () => ({
    type: CLEAR_CART
});

export const setSelectedItemsForCheckout = (items) => ({
    type: SET_SELECTED_ITEMS_FOR_CHECKOUT,
    payload: items
});

export const setCartItems = (items) => {
    return {
      type: 'SET_CART_ITEMS',
      payload: items,
    };
  };

//   export const placeOrder = (orderDetails) => ({
//     type: PLACE_ORDER,
//     payload: orderDetails,
//   });

export const placeOrder = (orderData, token) => async (dispatch) => {
    try {
      console.log('Token in placeOrder:', token); // Debug the token
  
      const response = await axios.post(`${baseURL}/order/create-order`, orderData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      dispatch({
        type: 'PLACE_ORDER_SUCCESS',
        payload: response.data,
      });
  
      return Promise.resolve(response.data);
    } catch (error) {
      console.error('Error in placeOrder:', error.response?.data || error.message); // Log the error
      dispatch({
        type: 'PLACE_ORDER_FAIL',
        payload: error.response?.data?.message || error.message,
      });
  
      return Promise.reject(error);
    }
  };

  export const fetchUserOrders = (token) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USER_ORDERS_REQUEST });

        const response = await axios.get(`${baseURL}/order/my-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: FETCH_USER_ORDERS_SUCCESS,
            payload: response.data.orders,
        });
    } catch (error) {
        console.error('Error fetching user orders:', error.response?.data || error.message);
        dispatch({
            type: FETCH_USER_ORDERS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Fetch all orders (admin only)
export const fetchAdminOrders = (token) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_ADMIN_ORDERS_REQUEST });

        const response = await axios.get(`${baseURL}/order/admin-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: FETCH_ADMIN_ORDERS_SUCCESS,
            payload: response.data.orders,
        });
    } catch (error) {
        console.error('Error fetching admin orders:', error.response?.data || error.message);
        dispatch({
            type: FETCH_ADMIN_ORDERS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateOrderStatus = (orderId, newStatus, token) => async (dispatch) => {
  try {
      dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

      const response = await axios.put(
          `${baseURL}/order/admin-orders-update`,
          { orderId, status: newStatus }, // Payload for the request
          {
              headers: {
                  Authorization: `Bearer ${token}`, // Pass the token for authentication
                  'Content-Type': 'application/json',
              },
          }
      );

      dispatch({
          type: UPDATE_ORDER_STATUS_SUCCESS,
          payload: response.data, // Response from the server
      });

      console.log('Success:', `Order status updated to ${newStatus}`);
  } catch (error) {
      console.error('Error updating order status:', error.response?.data || error.message);
      dispatch({
          type: UPDATE_ORDER_STATUS_FAIL,
          payload: error.response?.data?.message || error.message,
      });

      console.error('Error:', error.response?.data?.message || 'Failed to update order status.');
  }
};