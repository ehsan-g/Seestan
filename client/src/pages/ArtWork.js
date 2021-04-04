/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
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
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchOneArtWork, headerStatus } from '../actions';
import Dialog from '../components/Dialog';
import TheTabe from '../components/TheTab';

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
  const dispatch = useDispatch();

  const theArtwork = useSelector((state) => state.theArtwork);
  const { error, loading, artwork } = theArtwork;

  useEffect(() => {
    dispatch(fetchOneArtWork(match.params.workId));
  }, [dispatch, match]);

  const addToCart = (e) => {
    history.push(`/cart/${match.params.workId}?title=${artwork.title}`);
  };
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
                <Link to="/" variant="subtitle1">
                  {theArt.owner}
                </Link>
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
                <Link to="/">
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
                  {theArt.material}
                </Typography>
                <Typography color="#666666" variant="body1">
                  {theArt.unit === '0' && ' in '}
                  {theArt.unit === '1' && ' cm '}
                  <span style={{ position: 'absolute', direction: 'ltr' }}>
                    {theArt.width} x {theArt.height}
                  </span>
                </Typography>
                {theArt.editionNum > 0 && (
                  <Typography variant="subtitle1">
                    {theArt.editionNum} از {theArt.editionSize} شماره
                  </Typography>
                )}
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
                onClick={(e) => addToCart(e)}
                variant="contained"
                type="submit"
                fullWidth
              >
                {/* {theArt.Order.paymen} */}hi
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
              <TheTabe theArt={theArt} />
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
