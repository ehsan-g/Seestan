/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { PayPalButton } from 'react-paypal-button-v2';
import { cartStep, payOrder, fetchOrderDetails } from '../../actions/index';
import Loader from '../Loader';
import { ORDER_PAY_RESET } from '../../constants/orderConstants';

function CartPayOrder() {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  // our PayPal sdk ready or no
  const [sdkReady, setSdkReady] = useState(false);

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
    if (successPay) {
      dispatch(fetchOrderDetails(orderId));
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(cartStep('4'));
    } else if (!orderById || orderById._id !== Number(orderId)) {
      dispatch(fetchOrderDetails(orderId));
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
                {!sdkReady || !orderById.totalPrice ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={orderById.totalPrice.toString()}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {
                      successPaymentHandler();
                      alert(
                        `Transaction completed by ${details.payer.name.given_name}`
                      );

                      // OPTIONAL: Call your server to save the transaction
                      // return fetch('/paypal-transaction-complete', {
                      //   method: 'post',
                      //   body: JSON.stringify({
                      //     orderID: data.orderID,
                      //   }),
                      // });
                    }}
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
