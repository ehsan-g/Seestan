/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Divider from '@material-ui/core/Divider';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import MilitaryTechOutlinedIcon from '@material-ui/icons/MilitaryTechOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchOneArtWork, addToCart, fetchArtistDetails } from '../actions';
import Dialog from '../components/Dialog';
import TheTab from '../components/TheTab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100,
    marginBottom: 100,
  },
  container: {
    display: 'grid',
  },
  paper: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '16px',
    marginLeft: theme.spacing(2),
  },
}));

// match params has the id from the router /:workId
function Artwork({ match, history }) {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    console.log('artwork');
    dispatch(fetchOneArtWork(match.params.workId));
  }, [dispatch, match]);

  const theArtwork = useSelector((state) => state.theArtwork);
  const { error, loading, artwork } = theArtwork;

  useEffect(() => {
    if (artwork.quantity < 1) {
      setDisabled(true);
    }
  }, [artwork]);

  useEffect(() => {
    if (artwork.artist) {
      dispatch(fetchArtistDetails(artwork.artist));
    }
  }, [artwork.artist]);

  const theCart = useSelector((state) => state.theCart);
  const { loadingCart } = theCart;

  const artistDetails = useSelector((state) => state.artistDetails);
  const { artist } = artistDetails;

  const onAddToCart = () => {
    if (userInfo) {
      dispatch(addToCart(match.params.workId));
      history.push(
        `/cart/shippingAddress/${match.params.workId}?title=${artwork.title}`
      );
    } else {
      history.push(`/login`);
    }
  };

  let classification;
  switch (artwork.classifications) {
    case '1':
      classification = 'Unique';
      break;
    case '2':
      classification = 'Limited edition';
      break;
    case '3':
      classification = 'Open edition';
      break;
    case '4':
      classification = 'Unknown edition';
      break;
    default:
      classification = '1';
  }

  const classes = useStyles();

  const renderElement = () => {
    const theArt = artwork;
    return (
      <>
        <Grid container direction="row">
          <Grid item xs={10} md={8} align="center">
            <Paper className={classes.paper} elevation={0}>
              <img
                src={`${theArt.image}`}
                alt="Art work"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Paper>
            <Paper className={classes.paper} elevation={0}>
              <IconButton
                onClick={() => alert('در حال حاضر راه اندازی نشده است')}
              >
                <FavoriteBorder style={{ color: 'black' }} />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={10} md>
            <Paper className={classes.paper} elevation={0}>
              <Grid item xs={12}>
                <Typography>
                  {!artist.firstName ? (
                    <CircularProgress />
                  ) : (
                    `${artist.firstName} ${artist.lastName}`
                  )}
                </Typography>
              </Grid>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <IconButton
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    padding: 0,
                  }}
                >
                  <AddCircleOutlineIcon style={{ color: 'black' }} />
                </IconButton>
                <Link
                  to="#"
                  onClick={() => alert('در حال حاضر راه اندازی نشده است')}
                >
                  <Typography
                    variant="body2"
                    style={{
                      fontSize: '1rem',
                    }}
                  >
                    دنبال‌کردن
                  </Typography>
                </Link>
              </Grid>
              <Grid>
                <Typography color="#666666" variant="body1">
                  {theArt.title}
                </Typography>
                <Typography color="#666666" variant="body1">
                  {theArt.subtitle}
                </Typography>
                <Typography color="#666666" variant="body1">
                  {classification}
                </Typography>
                <Typography color="#666666" variant="subtitle1">
                  {theArt.year}
                </Typography>
                <Typography color="#666666" variant="body1">
                  {theArt.medium}
                </Typography>
                <Typography color="#666666" variant="subtitle1">
                  {theArt.unit === '0' && ' in '}
                  {theArt.unit === '1' && ' cm '}
                  <span style={{ position: 'absolute', direction: 'ltr' }}>
                    `{theArt.width} x {theArt.height}`
                  </span>
                </Typography>
                {theArt.editionNum > 0 && (
                  <Typography variant="subtitle1">
                    {theArt.editionNum} از {theArt.editionSize} شماره
                  </Typography>
                )}
                <Typography color="#666666" variant="subtitle1">
                  {classification === 'Unique'
                    ? null
                    : `${theArt.quantity} عدد باقیمانده`}
                </Typography>
              </Grid>
              <Divider
                className={classes.divider}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
              <Typography
                variant="subtitle2"
                style={{ marginTop: 30, marginBottom: 30 }}
              >
                <span style={{ position: 'absolute' }}>
                  {theArt.price} تومان
                </span>
              </Typography>
              <Button
                onClick={(e) => onAddToCart(e)}
                variant="contained"
                type="submit"
                fullWidth
                disabled={disabled}
              >
                {loadingCart ? <CircularProgress /> : ` خرید اثر`}
              </Button>

              <Link to="/">
                <Typography variant="subtitle2">{theArt.name}</Typography>
              </Link>
              <Typography variant="subtitle1" color="#666666">
                <RoomOutlinedIcon />
                {theArt.artLocation}
              </Typography>
              <Typography
                variant="subtitle1"
                color="#666666"
                style={{ display: 'flex' }}
              >
                <MilitaryTechOutlinedIcon />
                <Dialog />
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-start" alignItems="flex-start">
          <Grid item xs={10} md={8}>
            <Paper className={classes.paper} elevation={0}>
              <TheTab theArt={theArt} />
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {loading === undefined ? (
          <Loader />
        ) : error ? (
          <Message variant="outlined" severity="error">
            {error}
          </Message>
        ) : (
          renderElement()
        )}
      </Grid>
    </div>
  );
}

export default Artwork;
