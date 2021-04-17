import { combineReducers } from '@reduxjs/toolkit';
import artworksReducer from './artworksReducer.js';
import artworkReducer from './artworkReducer.js';
import cartReducer from './cartReducer.js';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  artistDetailsReducer,
  userListReducer,
  userDeleteReducer,
} from './userReducer';
import {
  orderCreateReducer,
  userOrderListReducer,
  orderDetailsReducer,
  orderPayReducer,
} from './orderReducer';
import headerReducer from './headerReducer';

export default combineReducers({
  headerStatus: headerReducer,
  artworks: artworksReducer,
  theArtwork: artworkReducer,
  theCart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDeleteList: userDeleteReducer,
  artistDetails: artistDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  myOrders: userOrderListReducer,
  orderPay: orderPayReducer,
});
