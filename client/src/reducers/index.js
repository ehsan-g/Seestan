import { combineReducers } from '@reduxjs/toolkit';
import artworksReducer from './artworksReducer.js';
import artworkReducer from './artworkReducer.js';
import cartReducer from './cartReducer.js';
import userReducer from './userReducer.js';
import headerReducer from './headerReducer';

export default combineReducers({
  artworks: artworksReducer,
  theArtwork: artworkReducer,
  theCart: cartReducer,
  theUser: userReducer,
  headerStatus: headerReducer,
});
