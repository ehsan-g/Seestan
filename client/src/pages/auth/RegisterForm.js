import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import { TextField, Checkboxes } from 'mui-rff';
import { Typography, Grid, Button, CssBaseline } from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { headerStatus } from '../../actions/index.js';
import history from '../../history';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(headerStatus(false));
    return function cleanup() {
      dispatch(headerStatus(true));
    };
  }, []);

  const onSubmit = async (event) => {
    await auth()
      .createUserWithEmailAndPassword(event.email, event.pass)
      .then((userCredential) => {
        // Signed in

        const { user } = userCredential;
        toast.success(`ایمیل به این نشانی فرستاده شد: ${event.email}`);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
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
    </div>
  );
}
