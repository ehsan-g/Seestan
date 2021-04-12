/* eslint-disable no-case-declarations */
import {
  CART_ADD_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_REMOVE_ITEMS,
  CHANGE_CART_STEP,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_REQUEST,
} from '../constants/cartConstants';

export default (
  state = { cartItems: [], shippingAddress: {}, step: '1' },
  action
) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return { loadingCart: true, cartItems: [], shippingAddress: {} };
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.artworkId === item.artworkId
      );
      if (existItem) {
        return {
          ...state,
          loadingCart: false,
          cartItems: state.cartItems.map((x) =>
            x.artworkId === existItem.artworkId ? item : x
          ),
        };
      }

      return {
        ...state,
        loadingCart: false,
        cartItems: [...state.cartItems, item],
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_REMOVE_ITEMS:
      return { cartItems: [], shippingAddress: state.shippingAddress };

    case CHANGE_CART_STEP:
      return {
        shippingAddress: state.shippingAddress,
        cartItems: state.cartItems,
        step: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
