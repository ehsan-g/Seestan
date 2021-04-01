/* eslint-disable no-case-declarations */
import {
  // CART_DETAILS_FAIL,
  // CART_DETAILS_SUCCESS,
  CART_ADD_ITEM,
} from '../constants/artworkConstants';

export default (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.artworkId === item.artworkId
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.artwork === existItem.artworkId ? item : x
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    // case CART_DETAILS_SUCCESS:
    //   return { loading: false, cartItems: action.payload };
    // case CART_DETAILS_FAIL:
    //   return { loading: false, error: action.payload };
    default:
      return state;
  }
};
