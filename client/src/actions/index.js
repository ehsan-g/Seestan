import artworksBase from '../apis/artworksBase';
import {
  ARTWORK_LIST_FAIL,
  ARTWORK_DETAILS_FAIL,
  ARTWORK_LIST_SUCCESS,
  ARTWORK_LIST_REQUEST,
  ARTWORK_DETAILS_REQUEST,
  ARTWORK_DETAILS_SUCCESS,
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
