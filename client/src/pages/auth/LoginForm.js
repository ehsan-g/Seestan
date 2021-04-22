/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { headerStatus, login } from '../../actions/index';
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
        type="password"
        label="پسورد"
        name="pass"
        margin="normal"
        required
      />
    ),
  },
];

export default function EnterForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    dispatch(headerStatus(false));
    if (!location.pathname.includes('/register'))
      return function cleanup() {
        dispatch(headerStatus(true));
      };
  }, [dispatch, location]);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    dispatch(login(values.email, values.pass));

    // window.alert(JSON.stringify(values, 0, 2));
  };

  useEffect(() => {}, [location]);
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo && userInfo.token !== undefined) {
      history.push(redirect);
      history.go();
    }
  }, [history, userInfo, redirect]);

  return (
    <div className={classes.root}>
      <Typography variant="h6" align="center">
        .به دنیای دازاین خوش آمدید. مثلا...
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
              <Grid item xs={12} style={{ marginTop: 0 }}>
                <Typography variant="subtitle1" align="right">
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : '/register'
                    }
                  >
                    ثبت‌نام کنید
                  </Link>
                </Typography>
                <Typography
                  variant="subtitle1"
                  align="right"
                  style={{ marginBottom: 16 }}
                >
                  <Link to="/register"> رمز خود را فراموش کرده‌ام </Link>
                </Typography>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                  fullWidth
                >
                  ورود
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      {error && <Message severity="error">{error}</Message>}
      {loading && <Loader />}
    </div>
  );
}
