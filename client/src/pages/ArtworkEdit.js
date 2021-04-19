/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { TextField, Checkboxes } from 'mui-rff';
import { Typography, Grid, Button, ownerDocument } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  headerStatus,
  fetchUsers,
  updateArtwork,
  fetchArtists,
  fetchArtistDetails,
  fetchOneArtWork,
} from '../actions/index.js';

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

const validate = (email) => {
  const errors = {};
  if (!email) {
    errors.email = 'لطفا ایمیل خود را وارد کنید';
  }
  return errors;
};

export default function ArtworkEdit() {
  const history = useHistory();
  const [accountOwner, setAccountOwner] = useState('');
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  //   const [title, setTitle] = useState('');
  //   const [title, setTitle] = useState('');
  //   const [title, setTitle] = useState('');
  //   const [title, setTitle] = useState('');
  //   const [title, setTitle] = useState('');
  //   const [title, setTitle] = useState('');
  //   const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  const { artworkId } = useParams();

  const userList = useSelector((state) => state.userList);
  const { users, loading: loadingUsers } = userList;

  const theArtwork = useSelector((state) => state.theArtwork);
  const { error, loading, artwork } = theArtwork;

  const artistList = useSelector((state) => state.artistList);
  const { artists } = artistList;

  const artistDetails = useSelector((state) => state.artistDetails);
  const { theArtist, loading: loadingTheArtist } = artistDetails;

  const artworkUpdate = useSelector((state) => state.artworkUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = artworkUpdate;

  useEffect(() => {
    if (successUpdate) {
      history.push('/admin/artworks');
    } else if (!artwork.title || artwork._id !== Number(artworkId)) {
      dispatch(fetchOneArtWork(artworkId));
      dispatch(fetchUsers());
      dispatch(fetchArtists());
    } else if (artwork.artist) {
      dispatch(fetchArtistDetails(artwork.artist));
    } else {
      setAccountOwner(artwork.accountOwner);
      // setTitle(artwork.title);
      // setArtist(artwork.artist);
    }
  }, [artworkId, dispatch, successUpdate, history]);

  useEffect(() => {
    dispatch(headerStatus(false));
    return function cleanup() {
      dispatch(headerStatus(true));
    };
  }, [dispatch]);

  const onSubmit = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    dispatch(updateArtwork({ _id: artwork._id, title }));
  };
  console.log(artwork.accountOwner);
  const formFields = [
    {
      size: 6,
      field: (
        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
          {artwork && artwork.accountOwner && users && (
            <>
              <InputLabel
                htmlFor="uncontrolled-native"
                style={{ paddingRight: 5 }}
              >
                {' '}
                صاحب اکانت
              </InputLabel>
              <Select
                defaultValue={artwork.accountOwner}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => setAccountOwner(e.target.value)}
                label="صاحب اکانت"
              >
                {users[0]
                  ? users.map((user, idx) =>
                      user.isAdmin ? (
                        <MenuItem value={user.id} key={idx}>
                          {user.id} - {user.firstName}
                        </MenuItem>
                      ) : (
                        <MenuItem value={user.id} key={idx} disabled>
                          {user.id} - {user.firstName}
                        </MenuItem>
                      )
                    )
                  : null}
              </Select>
            </>
          )}
        </FormControl>
      ),
    },
    {
      size: 6,
      field: (
        <FormControl
          variant="outlined"
          style={{ minWidth: '100%' }}
          margin="normal"
        >
          <InputLabel htmlFor="uncontrolled-native" style={{ paddingRight: 5 }}>
            {' '}
            هنرمند
          </InputLabel>

          <NativeSelect
            defaultValue={theArtist._id}
            inputProps={{
              name: 'هنرمند',
              id: 'artist_uncontrolled-native',
            }}
            onChange={(e) => setArtist(e.target.value)}
          >
            {theArtist && theArtist._id && artists
              ? artists.map((item) =>
                  item._id ? (
                    <option value={item._id} key={item._id}>
                      {item._id} - {item.firstName}
                    </option>
                  ) : null
                )
              : null}
          </NativeSelect>
        </FormControl>
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          variant="outlined"
          type="name"
          label="عنوان"
          name="title"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          variant="outlined"
          type="name"
          label="ساب عنوان"
          name="Subtitle"
          //   value={Subtitle || ''}
          //   onChange={(e) => setSubtitle(e.target.value)}
          margin="normal"
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
          name="year"
          //   value={year || ''}
          //   onChange={(e) => setYear(e.target.value)}
          margin="normal"
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
          name="category"
          //   value={category || ''}
          //   onChange={(e) => setCategory(e.target.value)}
          margin="normal"
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
          name="medium"
          //   value={medium || ''}
          //   onChange={(e) => setMedium(e.target.value)}
          margin="normal"
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
          name="condition"
          //   value={condition || ''}
          //   onChange={(e) => setCondition(e.target.value)}
          margin="normal"
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
          name="classifications"
          //   value={classifications || ''}
          //   onChange={(e) => setClassifications(e.target.value)}
          margin="normal"
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
          name="image"
          //   value={image || ''}
          //   onChange={(e) => setImage(e.target.value)}
          margin="normal"
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
          name="width"
          //   value={width || ''}
          //   onChange={(e) => setWidth(e.target.value)}
          margin="normal"
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
          name="height"
          //   value={height || ''}
          //   onChange={(e) => setHeight(e.target.value)}
          margin="normal"
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
          name="depth"
          //   value={depth || ''}
          //   onChange={(e) => setDepth(e.target.value)}
          margin="normal"
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
          name="unit"
          //   value={unit || ''}
          //   onChange={(e) => setUnit(e.target.value)}
          margin="normal"
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
          name="isAnEdition"
          //   value={isAnEdition || ''}
          //   onChange={(e) => setIsAnEdition(e.target.value)}
          margin="normal"
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
          name="editionNum"
          //   value={editionNum || ''}
          //   onChange={(e) => setEditionNum(e.target.value)}
          margin="normal"
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
          name="editionSize"
          //   value={editionSize || ''}
          //   onChange={(e) => setEditionSize(e.target.value)}
          margin="normal"
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
          name="isSigned"
          //   value={isSigned || ''}
          //   onChange={(e) => setIsSigned(e.target.value)}
          margin="normal"
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
          name="isAuthenticated"
          //   value={isAuthenticated || ''}
          //   onChange={(e) => setIsAuthenticated(e.target.value)}
          margin="normal"
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
          name="frame"
          //   value={frame || ''}
          //   onChange={(e) => setFrame(e.target.value)}
          margin="normal"
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
          name="isPrice"
          //   value={isPrice || ''}
          //   onChange={(e) => setIsPrice(e.target.value)}
          margin="normal"
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
          name="pice"
          //   value={pice || ''}
          //   onChange={(e) => setPrice(e.target.value)}
          margin="normal"
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
          name="aboutWork"
          //   value={aboutWork || ''}
          //   onChange={(e) => setAboutWork(e.target.value)}
          margin="normal"
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
          name="provenance"
          //   value={provenance || ''}
          //   onChange={(e) => setProvenance(e.target.value)}
          margin="normal"
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
          name="artLocation"
          //   value={artLocation || ''}
          //   onChange={(e) => setArtLocation(e.target.value)}
          margin="normal"
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
          name="quantity"
          //   value={quantity || ''}
          //   onChange={(e) => setQuantity(e.target.value)}
          margin="normal"
        />
      ),
    },
  ];
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to="/admin/artworks">برگشت</Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message severity="error">{errorUpdate}</Message>}
      <Typography variant="h6" align="center">
        ویرایش کاربر
      </Typography>
      {error ? (
        <Message severity="error">{error}</Message>
      ) : loading || loadingUsers ? (
        <Loader />
      ) : (
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={{}}
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
                    ذخیره
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      )}
    </div>
  );
}
