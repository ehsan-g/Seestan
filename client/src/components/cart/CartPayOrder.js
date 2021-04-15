/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form } from 'react-final-form';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Grid, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { PayPalButton } from 'react-paypal-button-v2';
import { cartStep, payOrder, fetchOrderDetails } from '../../actions/index';
import Loader from '../Loader';

function CartPayOrder() {
  const { orderId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  // our PayPal sdk ready or no
  const [sdkReady, setSdkReady] = useState(false);

  // for progress bar
  const [step, setStep] = useState(0);

  const theArtwork = useSelector((state) => state.theArtwork);
  const { artwork } = theArtwork;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { orderById } = orderDetails;

  // loading: loadingPay - we load loading as loadingPay
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // adding a script file to DOM for PayPal
  const addPayPalScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://www.paypal.com/sdk/js?client-id=ASdFcSesnCWCb7ateg0hqdnaaJKwgz0za-aaqSSMzFlL0KJI_LLdrC3-UCQmBfYBX3AkGP35Ulxo92QS';
    SelectInput.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  // go to receipt page if payment successful
  useEffect(() => {
    if (!orderById || successPay || orderById._id !== Number(orderId)) {
      dispatch(fetchOrderDetails(orderId));
      dispatch(cartStep('4'));
    } else if (orderById && !orderById.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, successPay, orderById, orderId]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const onSubmit = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    dispatch(cartStep(step));
  };

  // const deleteOrder = async () => {
  //   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //   await sleep(300);
  //   dispatch(cartStep('3'));
  // };

  const onEdit = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    dispatch(cartStep(step));
    history.push(`/cart/shippingAddress/${artwork._id}?title=${artwork.title}`);
  };
  return (
    <div>
      <Grid container direction="row-reverse" spacing={2}>
        <Grid item xs>
          <Grid sx={{ direction: 'ltr' }}>
            <Button variant="outlined">پاک کردن</Button>
          </Grid>

          <Grid style={{ margin: 100 }}>
            {orderById &&
            !orderById.isPaid &&
            orderById.paymentMethod === 'PayPal Payment' ? (
              <Grid>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={orderById.totalCartPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </Grid>
            ) : (
              <Button variant="outlined" color="primary" type="submit">
                پرداخت با شاپرک
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default CartPayOrder;
