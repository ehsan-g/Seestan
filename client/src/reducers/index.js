import { combineReducers } from '@reduxjs/toolkit';
import artworksReducer from './artworksReducer.js';
import artworkReducer from './artworkReducer.js';
import cartReducer from './cartReducer.js';
import { userLoginReducer, userRegisterReducer } from './userReducer';
import headerReducer from './headerReducer';

export default combineReducers({
  artworks: artworksReducer,
  theArtwork: artworkReducer,
  theCart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  headerStatus: headerReducer,
});
