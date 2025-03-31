// import axios from 'axios';
// import baseURL from '../../assets/common/baseUrl';

// // Action Types
// export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
// export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
// export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
// export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
// export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
// export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
// export const PRODUCT_FAILURE = 'PRODUCT_FAILURE';

// // Fetch Products
// export const fetchProducts = () => {
//     return async (dispatch) => {
//         dispatch({ type: FETCH_PRODUCTS_REQUEST });
//         try {
//             const response = await axios.get(`${baseURL}/product/get/all`);
//             dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data.products });
//         } catch (error) {
//             dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
//         }
//     };
// };

// // Add Product
// export const addProduct = (productData) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.post(`${baseURL}/product/create`, productData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
//         } catch (error) {
//             dispatch({ type: PRODUCT_FAILURE, payload: error.message });
//             throw error;
//         }
//     };
// };

// // Update Product
// export const updateProduct = (productId, productData) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.put(`${baseURL}/product/update/${productId}`, productData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
//         } catch (error) {
//             dispatch({ type: PRODUCT_FAILURE, payload: error.message });
//             throw error;
//         }
//     };
// };

// // Delete Product
// export const deleteProduct = (productId) => {
//     return async (dispatch) => {
//         try {
//             await axios.delete(`${baseURL}/product/delete/${productId}`);
//             dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
//         } catch (error) {
//             dispatch({ type: PRODUCT_FAILURE, payload: error.message });
//             throw error;
//         }
//     };
// };

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

// Action Types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

// Fetch Products
export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });

        const { data } = await axios.get(`${baseURL}/product/get/all`);

        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Add Product
export const addProduct = (productData, token) => async (dispatch) => {
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`${baseURL}/product/create`, productData, config);

        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: data,
        });

        // Optionally fetch updated product list
        dispatch(fetchProducts());
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};

// Update Product
export const updateProduct = (productId, productData, token) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`${baseURL}/product/update/${productId}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data,
        });

        // Optionally fetch updated product list
        dispatch(fetchProducts());
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};

// Delete Product
export const deleteProduct = (productId, token) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.delete(`${baseURL}/product/delete/${productId}`, config);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: productId,
        });

        // Optionally fetch updated product list
        dispatch(fetchProducts());
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};