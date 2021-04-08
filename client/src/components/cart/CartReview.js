/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, Field } from 'react-final-form';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography, Button, Grid, Paper } from '@material-ui/core';
import { cartStep } from '../../actions/index';
import CartPaymentButton from './CartPaymentButton';

function CartReview() {
  const [payment, setPayment] = useState('PayPal');
  // for progress bar
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const theCart = useSelector((state) => state.theCart);
  const { shippingAddress } = theCart;

  const onEdit = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    dispatch(cartStep(step));
  };

  const onSubmit = async () => {
    // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await sleep(300);
    dispatch(cartStep(step));
  };

  return (
    <div>
      <Grid container direction="row-reverse" spacing={2}>
        <Grid item xs>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                  <Typography variant="h5">مشخصات و نشانی دریافت</Typography>
                  <Typography variant="body1">
                    <label>نام</label>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ paddingRight: 1 }}>
                    {shippingAddress.firstName}
                  </Typography>
                  <Typography variant="body1">
                    <label>نام خانوادگی</label>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ paddingRight: 1 }}>
                    {shippingAddress.lastName}
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
                  <Button
                    variant="contained"
                    onClick={() => onEdit(setStep('1'))}
                  >
                    ویرایش
                  </Button>
                  <CartPaymentButton
                    onClick={() => setStep('3')}
                    type="submit"
                  />
                </Grid>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}
export default CartReview;
