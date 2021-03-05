import React from 'react';
import { Form } from 'react-final-form';
import { TextField, Checkboxes } from 'mui-rff';
import { Typography, Grid, Button, CssBaseline } from '@material-ui/core';

const onSubmit = async () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(300);
  window.alert('JSON.stringify(values, 0, 2)');
};

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
        margin="fullWidth"
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
        margin="fullWidth"
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
        margin="fullWidth"
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
              <Grid item xs="12" style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  color="secondery"
                  type="submit"
                  disabled={submitting}
                  fullWidth="true"
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
