/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, Field } from 'react-final-form';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography, Button } from '@material-ui/core';
import { fetchCartStatus } from '../../actions/index';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function CartShipForm() {
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await sleep(300);
    dispatch(fetchCartStatus(values));
  };
  const [checked, setChecked] = React.useState();

  const handleChange = (event) => {
    console.log(checked);
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <Field name="name" component="input" placeholder="Name" />
            </div>
            <Checkbox
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <div className="buttons" />
            <Button variant="contained" type="submit" disabled={!checked}>
              hi
            </Button>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}
export default CartShipForm;
