/* eslint-disable no-case-declarations */
import { CART_ADD_ITEM } from '../constants/artworkConstants';

export default (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      console.log(action);
      const item = action.payload;
      console.log(state);
      const existItem = state.cartItems.find(
        (x) => x.artworkId === item.artworkId
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.artworkId === existItem.artworkId ? item : x
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
