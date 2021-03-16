import { combineReducers } from '@reduxjs/toolkit';
import fetchArtWork from './fetchArtWork.js';

export default combineReducers({
  artworks: fetchArtWork,
});
