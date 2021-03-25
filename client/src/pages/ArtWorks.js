/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@material-ui/core/ImageList';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import ArtCard from '../components/ArtCard';
import { fetchAllArtWorks } from '../actions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  responsive: {
    padding: 20,
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
    <div>
      {loading === undefined ? (
        <Loader />
      ) : error ? (
        <Message variant="outlined" severity="error">
          {error}
        </Message>
      ) : (
        <>
          <div className={classes.root}>
            <ImageList
              variant="woven"
              cols={3}
              gap={25}
              style={{ paddingBottom: 80 }}
            >
              {artworks.map((item) => (
                <ArtCard key={item._id} artWork={item} />
              ))}
            </ImageList>
          </div>
          <div>
            <Hidden mdUp>
              <Grid
                container
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
