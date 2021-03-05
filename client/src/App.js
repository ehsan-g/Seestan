import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Header from './components/nav/Header';
import EnterForm from './pages/auth/EnterFrom';
import RegisterForm from './pages/auth/RegisterForm';
import 'react-toastify/dist/ReactToastify.css';

// Override the defualt theme from here
const theme = createMuiTheme({
  overrides: {
    // Style sheet name => example Link component ⚛️
    MuiLink: {
      // Name of the rule
      underlineNone: {
        // Some CSS
        color: 'black',
        '&:hover': {
          color: 'blue',
          textDecoration: 'none',
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: 'white',
        color: 'black',
      },
    },
    MuiTypography: {
      root: {
        alignContent: 'center',
        padding: '2px',
      },
      subtitle1: {
        fontSize: '14px',
        padding: '5px',
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: 'black',
        color: 'white',
        minWidth: '41px',
        '&:hover': {
          color: 'white',
          backgroundColor: '#b77990',
          textDecoration: 'none',
        },
      },
      outlined: {
        minWidth: '41px',
        '&:hover': {
          borderColor: 'black',
        },
      },
    },
  },
});

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <Header />
      {/*  use Toastontainer here to access it in the whole project */}
      <ToastContainer />
      <React.StrictMode>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={EnterForm} />
          <Route exact path="/register" component={RegisterForm} />
        </Switch>
      </React.StrictMode>
      ,
    </ThemeProvider>
  </>
);
export default App;
