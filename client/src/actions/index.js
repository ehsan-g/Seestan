import axios from 'axios';
import artworksBase from '../apis/artworksBase';
import {
  ARTWORK_LIST_REQUEST,
  ARTWORK_LIST_SUCCESS,
  ARTWORK_LIST_FAIL,
  ARTWORK_DETAILS_REQUEST,
  ARTWORK_DETAILS_SUCCESS,
  ARTWORK_DETAILS_FAIL,
  CART_ADD_ITEM,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
} from '../constants/artworkConstants';

// export const fetchOneArtWork = (workId) => {
//   const oneArtwork = products.find((p) => p._id === workId);
//   return {
//     type: 'FETCH_THE_ARTWORK',
//     payload: oneArtwork,
//   };
// };

export const fetchAllArtWorks = () => async (dispatch) => {
  try {
    const response = await artworksBase.get('/api/artworks');
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
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
    console.log(e.message);
  }
};

export const fetchOneArtWork = (workId) => async (dispatch) => {
  try {
    const response = await artworksBase.get(`/api/artworks/${workId}`);
    console.log(response);
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
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
    console.log(e.message);
  }
};

export const fetchCartStatus = (workId) => async (dispatch, getState) => {
  try {
    const { data } = await artworksBase.get(`/api/artworks/${workId}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        artworkId: data._id,
        title: data.title,
        image: data.image,
        price: data.price,
        editionNum: data.editionNum,
        editionSize: data.editionSize,
      },
    });
    // save the item in browser local storage. It needs to be parsed back to an object to be used
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().theCart.cartItems)
    );
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CART_DETAILS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
    console.log(e.message);
  }
};
