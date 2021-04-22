/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { useParams } from 'react-router';
import { fetchOneArtWork, addToCart, headerStatus } from '../../actions/index';

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    marginTop: 60,
  },
  media: {
    minHeight: 100,
  },
  notif: {
    paddingTop: 24,
    // [theme.breakpoints.down('md')]: {
    //   paddingLeft: 0,
    // },
  },
}));

export default function PurchaseCard() {
  const { workId, orderId } = useParams();
  const dispatch = useDispatch();

  const theArtwork = useSelector((state) => state.theArtwork);
  const { artwork } = theArtwork;

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { orderById } = orderDetails;

  useEffect(() => {
    dispatch(headerStatus(false));
  }, [dispatch]);

  // adding shipping price to the cart - toFixed for decimal
  useEffect(() => {
    if (workId && (!artwork._id || !theCart.totalCartPrice)) {
      dispatch(fetchOneArtWork(workId));
    } else if (!workId && cartItems[0]) {
      // dispatch(fetchOneArtWork(cartItems[0].artworkId));
    } else if (orderById.orderItems) {
      dispatch(fetchOneArtWork(orderById.orderItems[0].artwork));
      dispatch(addToCart(orderById.orderItems[0].artwork));
    }
  }, [artwork, cartItems, dispatch, orderById, theCart, workId]);

  theCart.shippingPrice = (Number(artwork.price) > 100000 ? 0 : 10000).toFixed(
    0
  );
  theCart.taxPrice = (artwork.price * 0.09).toFixed(0);
  theCart.totalCartPrice =
    Number(artwork.price) +
    Number(theCart.shippingPrice) +
    Number(theCart.taxPrice);
  const classes = useStyles();

  return (
    <>
      {!cartItems[0] ? null : (
        <>
          <Paper
            className={classes.root}
            elevation={0}
            variant="outlined"
            square
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: 3,
                ':hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <Grid container sx={{ marginBottom: 8 }}>
                <Grid item xs={7}>
                  <Typography gutterBottom variant="h5" component="div">
                    {cartItems[0].title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {cartItems[0].subtitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {cartItems[0].editionNum} از {cartItems[0].editionSize}{' '}
                    شماره
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <img
                    src={`${cartItems[0].image}`}
                    alt="Art work"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Grid>
              </Grid>

              <Grid container sx={{ borderTop: '1px solid #e0e0e0' }}>
                <Grid item xs={4}>
                  <Typography gutterBottom variant="subtitle1" component="p">
                    قیمت
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`${cartItems[0].price} تومان`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Typography gutterBottom variant="subtitle1" component="p">
                    حمل و نقل
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`${theCart.shippingPrice} تومان`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Typography gutterBottom variant="subtitle1" component="p">
                    (۹٪)مالیات
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`${theCart.taxPrice} تومان`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ borderTop: '1px solid #e0e0e0' }}>
                <Grid item xs={4}>
                  <Typography gutterBottom variant="subtitle1" component="p">
                    جمع
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`${theCart.totalCartPrice} تومان`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Grid item ali="center" className={classes.notif}>
            <Paper
              sx={{
                height: 100,
                padding: 3,
                backgroundColor: '#e5e5e5',
                ':hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              square
            >
              <Typography variant="body2">
                <VerifiedUserIcon sx={{ paddingTop: 1 }} />
                پرداخت شما به وسیله بانک مرکزی و فتا خیلی امنه{' '}
              </Typography>
            </Paper>
          </Grid>
        </>
      )}
    </>
  );
}
