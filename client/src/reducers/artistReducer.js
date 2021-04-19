import {
  ARTIST_LIST_REQUEST,
  ARTIST_LIST_SUCCESS,
  ARTIST_LIST_FAIL,
  ARTIST_LIST_RESET,
  ARTIST_DETAILS_REQUEST,
  ARTIST_DETAILS_SUCCESS,
  ARTIST_DETAILS_FAIL,
} from '../constants/artistConstants';

export const artistDetailsReducer = (state = { theArtist: {} }, action) => {
  switch (action.type) {
    case ARTIST_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ARTIST_DETAILS_SUCCESS:
      return { loading: false, theArtist: action.payload };
    case ARTIST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const artistsReducer = (state = { artists: [] }, action) => {
  switch (action.type) {
    case ARTIST_LIST_REQUEST:
      return { loading: true };
    case ARTIST_LIST_SUCCESS:
      return { loading: false, artists: action.payload };
    case ARTIST_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ARTIST_LIST_RESET:
      return { artists: [] };
    default:
      return state;
  }
};
