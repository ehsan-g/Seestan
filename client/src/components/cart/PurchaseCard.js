/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import zIndex from '@material-ui/core/styles/zIndex';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { fetchOneArtWork } from '../../actions';
import TotalTable from './TotalTable';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    marginTop: 60,
  },
  media: {
    minHeight: 100,
  },
  notif: {
    paddingTop: 24,
    // [theme.breakpoints.down('md')]: {
    //   paddingLeft: 0,
    // },
  },
}));

export default function MediaCard({ workId }) {
  const classes = useStyles();
  const theArtwork = useSelector((state) => state.theArtwork);
  const { artwork } = theArtwork;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOneArtWork(workId));
  }, [dispatch, workId]);

  return (
    <>
      <Paper className={classes.root} elevation={0} variant="outlined" square>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            padding: 3,
            ':hover': {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Grid container sx={{ marginBottom: 8 }}>
            <Grid item xs={7}>
              <Typography gutterBottom variant="h5" component="div">
                {artwork.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {artwork.subtitle}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <img
                src={`${artwork.image}`}
                alt="Art work"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Grid>
          </Grid>

          <Grid container sx={{ borderTop: '1px solid #e0e0e0' }}>
            <CardContent>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Typography gutterBottom variant="subtitle1" component="p">
                    قیمت
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    {artwork.price} تومان
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>
      <Grid item ali="center" className={classes.notif}>
        <Paper
          sx={{
            height: 100,
            padding: 3,
            backgroundColor: '#e5e5e5',
            ':hover': {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          square
        >
          <Typography variant="body2">
            <VerifiedUserIcon sx={{ paddingTop: 1 }} />
            پرداخت شما به وسیله بانک مرکزی و فتا خیلی امنه{' '}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}
