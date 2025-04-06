
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

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

        dispatch(fetchProducts());
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};

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

        dispatch(fetchProducts());
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};

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

        dispatch(fetchProducts());
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};