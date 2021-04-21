/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory, useParams } from 'react-router';
import { CartReceipt } from '../components/cart/CartReceipt';
import CartShipForm from '../components/cart/CartShipForm';
import CartReview from '../components/cart/CartPlaceOrder';
import PlaceOrder from '../components/cart/CartPayOrder';
import { headerStatus } from '../actions/index';
import LoginForm from './auth/LoginForm';
import PurchaseCard from '../components/cart/PurchaseCard';
import Loader from '../components/Loader';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
}));

export default function Cart() {
  const history = useHistory();
  const { workId, orderId } = useParams();
  const theCart = useSelector((state) => state.theCart);
  const { step } = theCart;

  const artworkId = workId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (artworkId) {
      dispatch(headerStatus(false));
      return function cleanup() {
        dispatch(headerStatus(true));
        // dispatch(cleanTheCart());
      };
    }
    if (orderId) {
      theCart.step = '3';
    }
  }, []);

  // if the direct order link is entered

  let value;
  switch (step) {
    case '1':
      value = '1';
      break;
    case '2':
      value = '2';
      break;
    case '3':
      value = '3';
      break;
    case '4':
      value = '4';
      break;
    default:
      value = '1';
    // code block
  }
  const classes = useStyles();

  try {
    const userLogin = useSelector((state) => state.userLogin);
    if (!userLogin) {
      history.push(`/login`);
      return <LoginForm />;
    }
  } catch (error) {
    alert(error);
  }

  return (
    <Grid
      className={classes.root}
      sx={{ marginTop: 5, marginBottom: 10 }}
      container
      direction="row"
      justifyContent="center"
      spacing={8}
    >
      <Grid
        container
        direction="column"
        spacing={8}
        item
        xs={12}
        md={4}
        sx={{ padding: 0 }}
      >
        <Grid item>
          {!theCart.cartItems ? <Loader /> : <PurchaseCard workId={workId} />}
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                indicatorColor="secondary"
                aria-label="lab API tabs example"
              >
                <Tab disabled label="آدرس" value="1" />
                <Tab disabled label="تایید" value="2" />
                <Tab disabled label="پرداخت" value="3" />
                <Tab disabled label="رسید" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CartShipForm history={history} />
            </TabPanel>
            <TabPanel value="2">
              <CartReview />
            </TabPanel>
            <TabPanel value="3">
              <PlaceOrder />
            </TabPanel>
            <TabPanel value="4">
              <CartReceipt />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
}
