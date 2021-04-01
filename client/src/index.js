import React from 'react';
import ReactDOM from 'react-dom';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { create } from 'jss';
import rtl from 'jss-rtl';
import App from './App';
import reportWebVitals from './reportWebVitals';
import customTheme from './styles/customTheme';
import history from './history';
import store from './store';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={customTheme}>
          <App />
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  </Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
