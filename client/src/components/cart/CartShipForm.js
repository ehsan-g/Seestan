/* eslint-disable no-nested-ternary */
import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'react-final-form';
import { TextField, Checkboxes, Radios, Select } from 'mui-rff';
import { Paper, Grid, Button, CssBaseline, MenuItem } from '@material-ui/core';

const onSubmit = async (values) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  console.log('here');
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.address) {
    errors.address = 'Required';
  }
  if (!values.phone) {
    errors.phone = 'Required';
  }
  return errors;
};

const formFields = [
  {
    size: 6,
    size2: 12,
    field: <TextField label="نام" name="firstName" margin="none" required />,
  },
  {
    size: 6,
    size2: 12,
    field: (
      <TextField label="نام خانوادگی" name="lastName" margin="none" required />
    ),
  },
  {
    size: 6,
    size2: 12,
    field: (
      <TextField label="کد پستی" name="postalCode" margin="none" required />
    ),
  },
  {
    size: 6,
    size2: 12,
    field: (
      <Select
        name="city"
        label="انتخاب شهر"
        formControlProps={{ margin: 'none' }}
      >
        <MenuItem default value="Tehran">
          تهران
        </MenuItem>
      </Select>
    ),
  },
  {
    size: 12,
    size2: 12,
    field: <TextField label="آدرس" name="address" margin="none" required />,
  },
  {
    size: 12,
    size2: 12,
    field: <TextField label="شماره تلفن" name="phone" margin="none" required />,
  },
  {
    size: 12,
    size2: 12,
    field: (
      <Checkboxes
        name="saveShipping"
        formControlProps={{ margin: 'none' }}
        data={{ label: 'ذخیره اطلاعات', value: true }}
      />
    ),
  },
];

function CartShipForm() {
  return (
    <div style={{ maxWidth: 600 }}>
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 10 }} elevation={0}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Radios
                    label="روش ارسال مرسوله"
                    name="deliveryMethod"
                    formControlProps={{ margin: 'none' }}
                    radioGroupProps={{ row: true }}
                    data={[
                      { label: 'ارسال به شما', value: 'delivery' },
                      { label: 'پیکاپ', value: 'pickup' },
                    ]}
                  />
                </Grid>
                {values.deliveryMethod === 'delivery' ? (
                  formFields.map((item, idx) => (
                    <Grid item lg={item.size} xs={item.size2} key={idx}>
                      {item.field}
                    </Grid>
                  ))
                ) : values.deliveryMethod === 'pickup' ? (
                  <Grid item xs={12}>
                    <TextField
                      label="شماره تلفن"
                      name="phone"
                      margin="none"
                      required
                    />
                  </Grid>
                ) : null}
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    مرحله بعد
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );
}

export default CartShipForm;
