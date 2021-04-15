/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form } from 'react-final-form';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { cartStep } from '../../actions/index';
import PlaceOrderButton from './PlaceOrderButton';
import Message from '../Message';
import { ORDER_PAY_RESET } from '../../constants/orderConstants';

function CartPlaceOrder() {
  const history = useHistory();
  const dispatch = useDispatch();

  const theCart = useSelector((state) => state.theCart);
  const { shippingAddress } = theCart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const theArtwork = useSelector((state) => state.theArtwork);
  const { artwork } = theArtwork;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  const onEdit = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    dispatch(cartStep('2'));
    history.push(`/cart/shippingAddress/${artwork._id}?title=${artwork.title}`);
  };

  // go to receipt page if payment successful
  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_PAY_RESET });
      history.push(`/orders/${order._id}`);
      dispatch(cartStep('3'));
    }
  }, [dispatch, success, order, history]);

  return (
    <div>
      <Grid container direction="row-reverse" spacing={2}>
        <Grid item xs>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h5">مشخصات و نشانی دریافت</Typography>
            <Typography variant="body1">
              <label>نام</label>
            </Typography>
            <Typography variant="subtitle1" sx={{ paddingRight: 1 }}>
              {userInfo.firstName}
            </Typography>
            <Typography variant="body1">
              <label>نام خانوادگی</label>
            </Typography>
            <Typography variant="subtitle1" sx={{ paddingRight: 1 }}>
              {userInfo.lastName}
            </Typography>
            <Typography variant="body1">
              <label>آدرس</label>
            </Typography>
            <Typography variant="subtitle1" sx={{ paddingRight: 1 }}>
              {shippingAddress.address}
            </Typography>
            <Typography variant="body1">
              <label>کدپستی</label>
            </Typography>
            <Typography variant="subtitle1" sx={{ paddingRight: 1 }}>
              {shippingAddress.postalCode}
            </Typography>
            <Typography variant="body1">
              <label>تلفن</label>
            </Typography>
            <Typography variant="subtitle1" sx={{ paddingRight: 1 }}>
              {shippingAddress.phone}
            </Typography>
          </Paper>
          <Grid style={{ marginTop: 16 }}>
            <Button variant="contained" onClick={() => onEdit()}>
              ویرایش
            </Button>
            <PlaceOrderButton />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default CartPlaceOrder;
