import React from 'react';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { Typography, Grid, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    margin: 'auto',
    maxWidth: 400,
    [theme.breakpoints.down('sm')]: {
      margin: 100,
    },
  },
}));

const onSubmit = async () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(300);
  window.alert('JSON.stringify(values, 0, 2)');
};

const validate = (values) => {
  const errors = {};

  if (!values.pass) {
    errors.pass = 'Password is required.';
  }
  if (!values.email) {
    errors.email = 'Email is required.';
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
        type="password"
        label="Enter a password"
        name="pass"
        margin="normal"
        required
      />
    ),
  },
];

export default function EnterForm() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
              <Grid item xs={12} style={{ marginTop: 0 }}>
                <Typography
                  variant="subtitle1"
                  align="right"
                  style={{ marginBottom: 16 }}
                >
                  <Link href="#">Forgot Password?</Link>
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
    </div>
  );
}
