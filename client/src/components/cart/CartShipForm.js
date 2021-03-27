/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, Field } from 'react-final-form';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchCartStatus } from '../../actions/index';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Address = ({ name, label }) => (
  <>
    <div>
      <label>{label} Street</label>
      <Field
        name={`${name}.street`}
        component="input"
        placeholder={`${label} Street`}
      />
    </div>
    <div>
      <label>{label} City</label>
      <Field
        name={`${name}.city`}
        component="input"
        placeholder={`${label} City`}
      />
    </div>
    <div>
      <label>{label} Postal Code</label>
      <Field
        name={`${name}.postalCode`}
        component="input"
        placeholder={`${label} Postal Code`}
      />
    </div>
  </>
);

function CartShipForm() {
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await sleep(300);
    dispatch(fetchCartStatus(values));
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <Field name="name" component="input" placeholder="Name" />
          </div>
          <Address name="shipping" label="Shipping" />
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  );
}
export default CartShipForm;
