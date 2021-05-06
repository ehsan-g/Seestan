import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import ArtWork from './pages/ArtWork';
import ArtWorks from './pages/ArtWorks';
import Header from './components/nav/Header';
import EnterForm from './pages/auth/LoginForm';
import RegisterForm from './pages/auth/RegisterForm';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import Sell from './pages/Sell';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/nav/Footer';
import AdminPanel from './pages/admin/AdminPanel';
import UserEdit from './pages/admin/UserEdit';
import ArtworkEdit from './pages/admin/ArtworkEdit';
import Carousel from './components/Carousel';

// Create an enhanced history that syncs navigation events with the store

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <Hidden mdDown>
        <Paper elevation={0} sx={{ direction: 'ltr', marginBottom: 0 }}>
          <Carousel />
        </Paper>
      </Hidden>
      {/*  use Toastontainer here to access it in the whole project */}
      <ToastContainer />
      <Container maxWidth="lg">
        <React.StrictMode>
          <Switch>
            <Route exact path="/" component={ArtWorks} />
            <Route exact path="/sell" component={Sell} />
            <Route path="/artworks/:workId" component={ArtWork} />
            <Route
              path="/admin-panel/artwork/:artworkId/edit"
              component={ArtworkEdit}
            />
            <Route path="/cart/shippingAddress/:workId?" component={Cart} />
            <Route path="/cart/placeOrder/:workId?" component={Cart} />
            <Route path="/orders/:orderId" component={Cart} />
            <Route exact path="/login" component={EnterForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/profile" component={UserProfile} />
            <Route path="/admin-panel/user/:userId/edit" component={UserEdit} />
            <Route exact path="/admin-panel/:route" component={AdminPanel} />
          </Switch>
        </React.StrictMode>
      </Container>
      <Divider style={{ maxWidth: '70%', margin: 'auto' }} variant="middle" />
      <Footer />
    </BrowserRouter>
  </>
);
export default App;
