import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
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

// Create an enhanced history that syncs navigation events with the store

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      {/*  use Toastontainer here to access it in the whole project */}
      <ToastContainer />
      <Container maxWidth="lg" style={{ minHeight: '100vh' }}>
        <React.StrictMode>
          <Switch>
            <Route exact path="/" component={ArtWorks} />
            <Route path="/artworks/:workId" component={ArtWork} />
            <Route exact path="/login" component={EnterForm} />
            <Route exact path="/register" component={RegisterForm} />
          </Switch>
        </React.StrictMode>
      </Container>
      <Divider style={{ maxWidth: '70%', margin: 'auto' }} variant="middle" />
      <Footer />
    </BrowserRouter>
  </>
);
export default App;
