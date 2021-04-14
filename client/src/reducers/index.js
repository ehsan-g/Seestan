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
} from './userReducer';
import {
  orderDetailsReducer,
  orderCreateReducer,
  userOrderListReducer,
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
  artistDetails: artistDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  allOrders: userOrderListReducer,
});
