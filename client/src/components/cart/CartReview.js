/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, Field } from 'react-final-form';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography, Button, Grid } from '@material-ui/core';
import { cartStep } from '../../actions/index';

function CartShipForm() {
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
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle1">
                  <label>نام</label>
                </Typography>
                <Typography variant="body1">
                  {shippingAddress.firstName}
                </Typography>
                <Typography variant="subtitle1">
                  <label>نام خانوادگی</label>
                </Typography>
                <Typography variant="body1">
                  {shippingAddress.lastName}
                </Typography>
                <Typography variant="subtitle1">
                  <label>آدرس</label>
                </Typography>
                <Typography variant="body1">
                  {shippingAddress.address}
                </Typography>
                <Typography variant="subtitle1">
                  <label>کدپستی</label>
                </Typography>
                <Typography variant="body1">
                  {shippingAddress.postalCode}
                </Typography>
                <Typography variant="subtitle1">
                  <label>تلفن</label>
                </Typography>
                <Typography variant="body1">{shippingAddress.phone}</Typography>
              </Grid>

              <Grid item style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  onClick={() => onEdit(setStep('1'))}
                >
                  ویرایش
                </Button>

                <Button
                  variant="contained"
                  onClick={() => setStep('3')}
                  type="submit"
                >
                  تایید و پرداخت
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}
export default CartShipForm;
