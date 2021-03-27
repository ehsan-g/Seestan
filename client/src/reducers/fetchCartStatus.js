import {
  CART_DETAILS_FAIL,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_REQUEST,
} from '../constants/artworkConstants';

export default (state = { Cart: {} }, action) => {
  switch (action.type) {
    case CART_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CART_DETAILS_SUCCESS:
      return { loading: false, CART: action.payload };
    case CART_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
