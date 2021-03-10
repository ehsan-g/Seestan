import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import ArtWorks from './pages/ArtWorks';
import Header from './components/nav/Header';
import EnterForm from './pages/auth/EnterFrom';
import RegisterForm from './pages/auth/RegisterForm';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/nav/Footer';

// Override the defualt theme from here
const theme = createMuiTheme({
  components: {
    // Style sheet name => example Link component ⚛️
    MuiLink: {
      styleOverrides: {
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
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          alignContent: 'center',
          padding: '2px',
          color: 'secondary',
        },
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
      styleOverrides: {
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
          <Route exact path="/" component={ArtWorks} />
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
