import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { TextField, Checkboxes } from 'mui-rff';
import { Typography, Grid, Button, CssBaseline } from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { headerStatus, register } from '../../actions/index.js';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    margin: 'auto',
    maxWidth: 400,
    [theme.breakpoints.down('sm')]: {
      marginTop: 100,
    },
  },
}));

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'لطفا نام‌ خود را وارد کنید';
  }
  if (!values.lastName) {
    errors.lastName = 'لطفا نام خانوادگی خود را وارد کنید';
  }
  if (!values.pass) {
    errors.pass = 'لطفا پسورد خود را وارد کنید';
  }
  if (!values.email) {
    errors.email = 'لطفا ایمیل خود را وارد کنید';
  }
  return errors;
};

const formFields = [
  {
    size: 12,
    field: (
      <TextField
        variant="outlined"
        type="email"
        label="ایمیل"
        name="email"
        margin="normal"
        required
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        variant="outlined"
        // helperText="Password must be at least 8 characters."
        type="password"
        label="پسورد"
        name="pass"
        margin="normal"
        required
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        variant="outlined"
        type="name"
        label="نام"
        name="firstName"
        margin="normal"
        required
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        variant="outlined"
        type="name"
        label="نام خانوادگی"
        name="lastName"
        margin="normal"
        required
      />
    ),
  },
  {
    size: 12,
    field: (
      <Checkboxes
        name="terms"
        formControlProps={{ margin: 'none' }}
        data={{ label: 'با کلیک کردن شما...', value: true }}
      />
    ),
  },
];

export default function RegisterForm() {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo && userInfo.access !== undefined) {
      history.push(redirect);
      history.go();
    }
  }, [history, userInfo, redirect]);

  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    if (!values.terms) {
      setMessage('لطفا قبول کنید');
    } else {
      dispatch(
        register(values.firstName, values.lastName, values.email, values.pass)
      );
      toast.success(`Email is sent to ${values.email}`);
    }
  };

  // removing header for when we go directly to the page instead of opening the modal
  useEffect(() => {
    dispatch(headerStatus(false));
    return function cleanup() {
      dispatch(headerStatus(true));
    };
  }, [dispatch]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Typography variant="h6" align="center">
        به دنیای دازاین خوش آمدید. مثلا...
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container alignItems="flex-start" spacing={2}>
              {formFields.map((item, idx) => (
                <Grid item xs={item.size} key={idx}>
                  {item.field}
                </Grid>
              ))}
              <Grid item xs={12} style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                  fullWidth
                >
                  ثبت‌نام
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      {message && <Message severity="error">{message}</Message>}
      {error && <Message severity="error">{error}</Message>}
      {loading && <Loader />}
    </div>
  );
}
