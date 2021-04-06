/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { Form } from 'react-final-form';
import { TextField, Checkboxes, Radios, Select } from 'mui-rff';
import { Paper, Grid, Button, CssBaseline, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { fetchUserDetails, updateUserProfile } from '../../actions/index';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const useStyles = makeStyles((theme) => ({
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

const validate = (firstName, lastName, email) => {
  // const errors = {};
  // if (!firstName) {
  //   errors.firstName = 'لطفا نام خود را وارد کنید';
  // }
  // if (!lastName) {
  //   errors.lastName = 'لطفا نام خانوادگی خود را وارد کنید';
  // }
  // if (!email) {
  //   errors.email = 'لطفا ایمیل را وارد کنید';
  // }
  // return errors;
};

function AccountUserForm() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user || !user.firstName || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(fetchUserDetails('profile'));
    } else {
      setfirstName(user.firstName);
      setlastName(user.lastName);
      setemail(user.email);
    }
  }, [dispatch, history, userInfo, user, success]);

  const onSubmit = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    // setfirstName(user.firstName);
    // setlastName(user.lastName);
    // setemail(user.email);
    // window.alert(JSON.stringify(values, 0, 2));
    dispatch(
      updateUserProfile({
        id: user._id,
        firstName,
        lastName,
        email,
        password,
      })
    );
    // history.push('/login?redirect=payment');
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
          value={firstName}
          margin="none"
          variant="filled"
          placeholder="نام خود را وارد کنید"
          onChange={(e) => setfirstName(e.target.value)}
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
          value={lastName}
          margin="none"
          variant="filled"
          onChange={(e) => setlastName(e.target.value)}
          required
        />
      ),
    },
    {
      size: 6,
      size2: 12,
      field: (
        <TextField
          label="ایمیل"
          name="email"
          value={email}
          margin="none"
          variant="filled"
          onChange={(e) => setemail(e.target.value)}
          required
        />
      ),
    },
    {
      size: 6,
      size2: 12,
      field: (
        <TextField
          label="پسوزد"
          name="password"
          value={password}
          margin="none"
          variant="filled"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          required
        />
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 600 }}>
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting }) => (
          <form onSubmit={handleSubmit} noValidate className={classes.root}>
            <Paper style={{ padding: 10 }} elevation={0}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12} />
                {formFields.map((item, idx) => (
                  <Grid item lg={item.size} xs={item.size2} key={idx}>
                    {item.field}
                  </Grid>
                ))}
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    ذخیره
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

export default AccountUserForm;
