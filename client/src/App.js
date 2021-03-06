import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import Home from './pages/Home';
import Header from './components/nav/Header';
import EnterForm from './pages/auth/EnterFrom';
import RegisterForm from './pages/auth/RegisterForm';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/nav/Footer';

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
          color: 'black',
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
        color: 'secondery',
      },
      subtitle1: {
        fontSize: '14px',
        padding: '5px',
      },
      colorPrimary: {
        color: '#6c757d',
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
      <Divider />
      <Footer />
    </ThemeProvider>
  </>
);
export default App;
