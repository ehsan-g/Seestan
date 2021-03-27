import { combineReducers } from '@reduxjs/toolkit';
import fetchArtWorks from './fetchArtWorks.js';
import fetchArtWork from './fetchArtWork.js';
import fetchCart from './fetchCartStatus.js';

export default combineReducers({
  artworks: fetchArtWorks,
  theArtwork: fetchArtWork,
  theCart: fetchCart,
});
