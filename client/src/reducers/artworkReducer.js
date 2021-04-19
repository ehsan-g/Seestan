import {
  ARTWORK_DETAILS_FAIL,
  ARTWORK_DETAILS_SUCCESS,
  ARTWORK_DETAILS_REQUEST,
  ARTWORK_UPDATE_REQUEST,
  ARTWORK_UPDATE_SUCCESS,
  ARTWORK_UPDATE_FAIL,
  ARTWORK_UPDATE_RESET,
} from '../constants/artworkConstants';

export const artworkReducer = (state = { artwork: {} }, action) => {
  switch (action.type) {
    case ARTWORK_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ARTWORK_DETAILS_SUCCESS:
      return { loading: false, artwork: action.payload };
    case ARTWORK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// admin panel edit user
export const artworkUpdateReducer = (state = { artwork: {} }, action) => {
  switch (action.type) {
    case ARTWORK_UPDATE_REQUEST:
      return { loading: true };
    case ARTWORK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ARTWORK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ARTWORK_UPDATE_RESET:
      return { artwork: {} };
    default:
      return state;
  }
};
