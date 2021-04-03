import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from './reducers';

// To save cart items in local storage for multiple items in cart
// const cartItemFromStorage = localStorage.getItem('cartItems')
//   ? JSON.parse(localStorage.getItem('cartItems'))
//   : [];

// console.log(cartItemFromStorage);
// const initialState = {
//   theCart: {
//     cartItems: cartItemFromStorage,
//   },
// };

// Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
  reducers,
  // initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
