import {
  ARTWORK_DETAILS_FAIL,
  ARTWORK_DETAILS_SUCCESS,
  ARTWORK_DETAILS_REQUEST,
} from '../constants/artworkConstants';

export default (state = { artwork: {} }, action) => {
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
