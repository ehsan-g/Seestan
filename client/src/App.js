import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import ArtWork from './pages/ArtWork';
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

        subtitle1: {
          fontSize: '12px',
          margin: '2px',
        },
        colorPrimary: {
          color: '#6c757d',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: 'black',
          padding: '0px 15px 0px 15px',
          margin: 2,
          color: 'white',
          minWidth: '41px',
          '&:hover': {
            color: 'white',
            backgroundColor: '#b77990',
            textDecoration: 'none',
          },
        },
        outlined: {
          margin: 2,
          padding: '0px 15px 0px 15px',
          minWidth: '41px',
          '&:hover': {
            borderColor: 'black',
            textDecoration: 'none',
          },
        },
      },
    },
    MuiImageList: {
      styleOverrides: {
        root: {
          overflowY: '-moz-hidden-unscrollable',
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
      <Container maxWidth="lg">
        <React.StrictMode>
          <Switch>
            <Route exact path="/" component={ArtWorks} />
            <Route exact path="/product/:id" component={ArtWork} />
            <Route exact path="/login" component={EnterForm} />
            <Route exact path="/register" component={RegisterForm} />
          </Switch>
        </React.StrictMode>
        <Divider />
        <Footer />
      </Container>
    </ThemeProvider>
  </>
);
export default App;
