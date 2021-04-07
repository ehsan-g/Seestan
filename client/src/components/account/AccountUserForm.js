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
import Message from '../Message';
import Loader from '../Loader';

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

function AccountUserForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState();
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
    } else if (!user || !user.email || success) {
      // clean the field and update again using reset
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(fetchUserDetails('profile'));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [dispatch, history, userInfo, user, success]);

  const onSubmit = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    if (password !== confirmPassword) {
      setMessage('پسورد متفاوت وارد شده است');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          email,
          password,
        })
      );
      setMessage('');
    }
  };
  const classes = useStyles();

  const formFields = [
    {
      size: 12,
      size2: 12,
      field: (
        <TextField
          label="نام"
          name="firstName"
          value={firstName || ''}
          margin="none"
          variant="filled"
          placeholder="نام خود را وارد کنید"
          onChange={(e) => setFirstName(e.target.value)}
        />
      ),
    },
    {
      size: 12,
      size2: 12,
      field: (
        <TextField
          label="نام خانوادگی"
          name="lastName"
          value={lastName || ''}
          margin="none"
          variant="filled"
          onChange={(e) => setLastName(e.target.value)}
        />
      ),
    },
    {
      size: 12,
      size2: 12,
      field: (
        <TextField
          label="ایمیل"
          name="email"
          value={email || ''}
          margin="none"
          variant="filled"
          disabled
        />
      ),
    },
    {
      size: 12,
      size2: 12,
      field: (
        <TextField
          label="پسوزد"
          name="password"
          value={password || ''}
          margin="none"
          variant="filled"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      ),
    },
    {
      size: 12,
      size2: 12,
      field: (
        <TextField
          label="پسوزد تکرار"
          name="confirmPassword"
          value={confirmPassword || ''}
          margin="none"
          variant="filled"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      ),
    },
  ];

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'لطفا ایمیل را وارد کنید';
    }
    return errors;
  };

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
      {message && <Message severity="error">{message}</Message>}
      {error && <Message severity="error">{error}</Message>}
      {loading && <Loader />}
    </div>
  );
}

export default AccountUserForm;
