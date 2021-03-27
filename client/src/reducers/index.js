import { combineReducers } from '@reduxjs/toolkit';
import artWorks from './fetchArtWorks.js';
import artWork from './fetchArtWork.js';
import cart from './fetchCartStatus.js';

export default combineReducers({
  artworks: artWorks,
  theArtwork: artWork,
  theCart: cart,
});
