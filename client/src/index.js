import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from './reducers';
import customTheme from './styles/customTheme';

// Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
