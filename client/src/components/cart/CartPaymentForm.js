/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, Field } from 'react-final-form';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchCartStatus } from '../../actions/index';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function CartPaymentForm() {
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await sleep(300);
    console.log(values);
    dispatch(fetchCartStatus(values));
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            value="1"
            type="button"
            onClick={form.reset}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </form>
      )}
    />
  );
}
export default CartPaymentForm;
