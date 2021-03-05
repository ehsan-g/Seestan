import React from 'react';
import { Form } from 'react-final-form';
import { TextField, Checkboxes } from 'mui-rff';
import { Typography, Grid, Button, CssBaseline } from '@material-ui/core';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required.';
  }
  if (!values.pass) {
    errors.pass = 'Password is required';
  }
  if (!values.email) {
    errors.email = 'Please enter a valid email';
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
        label="Enter your email address"
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
        helperText="Password must be at least 8 characters."
        type="password"
        label="Enter a password"
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
        label="Full name"
        name="name"
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
        data={{ label: 'By checking this checkbox,...', value: true }}
      />
    ),
  },
];

export default function RegisterForm() {
  const onSubmit = async (event) => {
    await auth()
      .createUserWithEmailAndPassword(event.email, event.pass)
      .then((userCredential) => {
        // Signed in

        const { user } = userCredential;
        toast.success(`Email is sent to ${event.email}`);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 400 }}>
      <CssBaseline />
      <Typography variant="h6" align="center">
        The art world online
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
