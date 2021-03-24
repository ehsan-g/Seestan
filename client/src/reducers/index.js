import { combineReducers } from '@reduxjs/toolkit';
import fetchArtWorks from './fetchArtWorks.js';
import fetchArtWork from './fetchArtWork.js';

export default combineReducers({
  artworks: fetchArtWorks,
  theArtwork: fetchArtWork,
});
