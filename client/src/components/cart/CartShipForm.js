/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { TextField, Checkboxes, Radios, Select } from 'mui-rff';
import { Paper, Grid, Button, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  saveShippingAddress,
  cartStep,
  updateUserProfile,
} from '../../actions/index';

const useStyles = makeStyles(() => ({
  root: {
    '& label.Mui-focused': {
      color: '#b77990',
      borderColor: 'cyan',
    },
    '& .MuiFilledInput': {
      backgroundColor: 'green',
    },
    '& .MuiFilledInputInput-root': {
      '& fieldset': {
        borderColor: 'cyan',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'cyan',
      },
    },
  },
}));

function CartShipForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const theCart = useSelector((state) => state.theCart);
  const { shippingAddress } = theCart;

  const theArtwork = useSelector((state) => state.theArtwork);
  const { artwork } = theArtwork;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastname] = useState(userInfo.lastName);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState(shippingAddress.phone);

  // for progress bar
  const [step, setStep] = useState(0);

  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    dispatch(
      saveShippingAddress({
        address,
        postalCode,
        phone,
        city,
        saveShipping: values.saveShipping,
        deliveryMethod: values.deliveryMethod,
      })
    );

    dispatch(
      updateUserProfile({
        firstName,
        lastName,
      })
    );
    dispatch(cartStep(step));
    history.push(`/cart/placeOrder/${artwork._id}?title=${artwork.title}`);
  };
  const classes = useStyles();

  const formFields = [
    {
      size: 6,
      size2: 12,
      field: (
        <TextField
          label="نام"
          name="firstName"
          margin="none"
          variant="filled"
          placeholder="نام خود را وارد کنید"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName || ''}
          required
        />
      ),
    },
    {
      size: 6,
      size2: 12,
      field: (
        <TextField
          label="نام خانوادگی"
          name="lastName"
          margin="none"
          variant="filled"
          onChange={(e) => setLastname(e.target.value)}
          value={lastName || ''}
          required
        />
      ),
    },
    {
      size: 6,
      size2: 12,
      field: (
        <TextField
          label="کد پستی"
          name="postalCode"
          margin="none"
          variant="filled"
          onChange={(e) => setPostalCode(e.target.value)}
          value={postalCode || ''}
          required
        />
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
          displayEmpty
        >
          <MenuItem default value={city || 'تهران'}>
            تهران
          </MenuItem>
        </Select>
      ),
    },
    {
      size: 12,
      size2: 12,
      field: (
        <TextField
          label="آدرس"
          name="address"
          margin="none"
          variant="filled"
          onChange={(e) => setAddress(e.target.value)}
          value={address || ''}
          multiline
          required
        />
      ),
    },
    {
      size: 12,
      size2: 12,
      field: (
        <TextField
          label="شماره تلفن"
          name="phone"
          margin="none"
          variant="filled"
          onChange={(e) => setPhone(e.target.value)}
          value={phone || ''}
          required
        />
      ),
    },
    {
      size: 12,
      size2: 12,
      field: (
        <Checkboxes
          name="saveShipping"
          formControlProps={{ margin: 'none' }}
          data={{ label: 'ذخیره اطلاعات', value: true }}
          disabled
        />
      ),
    },
  ];

  const validate = () => {
    const errors = {};
    if (!firstName) {
      errors.firstName = 'لطفا نام خود را وارد کنید';
    }
    if (!lastName) {
      errors.lastName = 'لطفا نام خانوادگی خود را وارد کنید';
    }
    if (!address) {
      errors.address = 'لطفا آدرس را وارد کنید';
    }
    if (!phone) {
      errors.phone = 'لطفا شماره تماس خود را وارد کنید';
    }
    if (!postalCode) {
      errors.postalCode = 'لطفا کد‌پستی خود را وارد کنید';
    }
    return errors;
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <Form
        onSubmit={onSubmit}
        initialValues={{ saveShipping: true, deliveryMethod: 'delivery' }}
        validate={validate}
        render={({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit} noValidate className={classes.root}>
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
                      variant="filled"
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
                    onClick={() => setStep('2')}
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
