/* eslint-disable no-case-declarations */
import {
  CART_ADD_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_REMOVE_ITEMS,
} from '../constants/cartConstants';

export default (state = { cartItems: [], shippingAddress: {} }, action) => {
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
            x.artworkId === existItem.artworkId ? item : x
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_REMOVE_ITEMS:
      return { cartItems: [], shippingAddress: state.shippingAddress };

    default:
      return state;
  }
};
