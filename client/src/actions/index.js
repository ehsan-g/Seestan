import axios from 'axios';
import artworksBase from '../apis/artworksBase';
import {
  ARTWORK_LIST_REQUEST,
  ARTWORK_LIST_SUCCESS,
  ARTWORK_LIST_FAIL,
  ARTWORK_DETAILS_REQUEST,
  ARTWORK_DETAILS_SUCCESS,
  ARTWORK_DETAILS_FAIL,
} from '../constants/artworkConstants';
import {
  CART_ADD_REQUEST,
  CART_ADD_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_REMOVE_ITEMS,
  CHANGE_CART_STEP,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../constants/orderConstants';

export const headerStatus = (status) => async (dispatch) => {
  dispatch({ type: 'HEADER_HIDDEN', payload: status });
};

export const fetchAllArtWorks = () => async (dispatch) => {
  try {
    const response = await artworksBase.get('/api/artworks/');
    dispatch({ type: ARTWORK_LIST_REQUEST });
    dispatch({
      type: ARTWORK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: ARTWORK_LIST_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
    console.log(e.message);
  }
};

export const fetchOneArtWork = (workId) => async (dispatch) => {
  try {
    const response = await artworksBase.get(`/api/artworks/${workId}/`);
    await dispatch({ type: ARTWORK_DETAILS_REQUEST });
    dispatch({
      type: ARTWORK_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: ARTWORK_DETAILS_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
    console.log(e.message);
  }
};

export const addToCart = (workId) => async (dispatch, getState) => {
  const { data } = await artworksBase.get(`/api/artworks/${workId}`);
  dispatch({ type: CART_ADD_REQUEST });
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      artworkId: data._id,
      title: data.title,
      image: data.image,
      price: data.price,
      quantity: data.quantity,
      editionNum: data.editionNum,
      editionSize: data.editionSize,
    },
  });
  // save the item in browser local storage. It needs to be parsed back to an object to be used
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().theCart.cartItems)
  );
};

export const cleanTheCart = () => async (dispatch) => {
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('paymentMethod');
  dispatch({
    type: CART_REMOVE_ITEMS,
  });
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/users/login/', {
      username: email,
      password,
      config,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
    console.log(e.message);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_LOGOUT });
};

export const register = (firstName, lastName, email, password) => async (
  dispatch
) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/users/register/', {
      firstName,
      lastName,
      email,
      username: email,
      password,
      config,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const fetchUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}/`, config);

    console.log(id);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/profile/update/`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    // login the user with new data and update local storage
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const cartStep = (step) => async (dispatch) => {
  dispatch({
    type: CHANGE_CART_STEP,
    payload: step,
  });
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders/add`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    // login the user with new data and update local storage
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};
