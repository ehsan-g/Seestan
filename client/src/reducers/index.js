import { combineReducers } from '@reduxjs/toolkit';
import { artworksReducer, artworkDeleteReducer } from './artworksReducer.js';
import {
  artworkReducer,
  artworkUpdateReducer,
  artworkCreateReducer,
} from './artworkReducer.js';
import { artistDetailsReducer, artistsReducer } from './artistReducer';
import cartReducer from './cartReducer.js';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  usersReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './userReducer';
import {
  orderCreateReducer,
  userOrderListReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
  orderDeliverReducer,
} from './orderReducer';
import headerReducer from './headerReducer';

export default combineReducers({
  headerStatus: headerReducer,
  artworks: artworksReducer,
  theArtwork: artworkReducer,
  artworkDeleteList: artworkDeleteReducer,
  theCart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  artworkUpdate: artworkUpdateReducer, // update artwork from admin
  userUpdateProfile: userUpdateProfileReducer,
  userList: usersReducer,
  userDeleteList: userDeleteReducer,
  artworkCreate: artworkCreateReducer,
  userUpdate: userUpdateReducer, // update user from admin
  artistList: artistsReducer,
  artistDetails: artistDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  ordersList: orderListReducer,
  myOrders: userOrderListReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
});
