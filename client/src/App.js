import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
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
import AdminPanel from './pages/AdminPanel';
import UserEdit from './pages/UserEdit';

// Create an enhanced history that syncs navigation events with the store

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      {/*  use Toastontainer here to access it in the whole project */}
      <ToastContainer />
      <Container maxWidth="lg">
        <React.StrictMode>
          <Switch>
            <Route exact path="/" component={ArtWorks} />
            <Route exact path="/sell" component={Sell} />
            <Route path="/artworks/:workId" component={ArtWork} />
            <Route path="/cart/shippingAddress/:workId?" component={Cart} />
            <Route path="/cart/placeOrder/:workId?" component={Cart} />
            <Route path="/orders/:orderId" component={Cart} />
            <Route exact path="/login" component={EnterForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/profile" component={UserProfile} />
            <Route path="/admin/user/:userId/edit" component={UserEdit} />
            <Route exact path="/admin/:route" component={AdminPanel} />
          </Switch>
        </React.StrictMode>
      </Container>
      <Divider style={{ maxWidth: '70%', margin: 'auto' }} variant="middle" />
      <Footer />
    </BrowserRouter>
  </>
);
export default App;
