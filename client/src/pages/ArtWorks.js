/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@material-ui/core/ImageList';
import { Grid, Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import ArtCard from '../components/ArtCard';
import { fetchAllArtWorks, headerStatus } from '../actions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  responsive: {
    // margin: 40,
    // width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

function Artworks() {
  const dispatch = useDispatch();
  const artworksList = useSelector((state) => state.artworks);
  const { error, loading, artworks } = artworksList;

  useEffect(() => {
    dispatch(fetchAllArtWorks());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <div style={{ minHeight: '100vh', marginTop: 100 }}>
      {loading === undefined ? (
        <Loader />
      ) : error ? (
        <Message variant="outlined" severity="error">
          {error}
        </Message>
      ) : (
        <>
          <Grid container direction="row">
            <Grid item xs={9} className={classes.root}>
              <Box sx={{ minHeight: '100VH', overflow: 'hidden' }}>
                <ImageList
                  variant="masonry"
                  cols={3}
                  gap={50}
                  style={{ paddingBottom: 80 }}
                >
                  {artworks.map((item) => (
                    <ArtCard key={item._id} artWork={item} />
                  ))}
                </ImageList>
              </Box>
            </Grid>
            <Grid item xs={3}>
              'dgregrtgtgtthththhth'
            </Grid>
          </Grid>
          <div>
            <Hidden mdUp>
              <Grid
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={5}
              >
                <Paper className={classes.responsive} elevation={0}>
                  {artworks.map((item) => (
                    <Grid key={item._id}>
                      <Paper className={classes.paper}>
                        <ArtCard artWork={item} />
                      </Paper>
                    </Grid>
                  ))}
                </Paper>
              </Grid>
            </Hidden>
          </div>
        </>
      )}
    </div>
  );
}

export default Artworks;
