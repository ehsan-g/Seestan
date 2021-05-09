/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@material-ui/core/ImageList';
import { Grid, Box, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import { useHistory, Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import Divider from '@material-ui/core/Divider';
import ImageListItem from '@material-ui/core/ImageListItem';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ArtCard from '../components/ArtCard';
import { fetchAllArtWorks, cleanTheCart } from '../actions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ARTWORK_DETAILS_RESET } from '../constants/artworkConstants';
import Carousel from '../components/Carousel';
import SideFilter from '../components/SideFilter';
import Artist from '../components/TheArtist.js';

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
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(cleanTheCart());
    dispatch({ type: ARTWORK_DETAILS_RESET });
    return () => {
      dispatch(cleanTheCart());
    };
  }, [dispatch]);

  const artworksList = useSelector((state) => state.artworks);
  const { error, loading, artworks, pages } = artworksList;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(fetchAllArtWorks(keyword));
  }, [dispatch, keyword]);

  const classes = useStyles();

  const handlePageChange = (event, value) => {
    setPage(value);
    if (keyword) {
      keyword = keyword.split('?keyword=')[1].split('&')[0]; // example: ?keyword=اکبر&page=1  ===> اکبر
    }
    history.push(`/?keyword=${keyword}&page=${value}`);
  };

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
          <Hidden mdDown>
            <Grid sx={{ marginBottom: 60 }}>
              <Paper
                elevation={0}
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                }}
              >
                <Carousel />
              </Paper>
            </Grid>
          </Hidden>

          <Grid container direction="row" spacing={0}>
            <Grid item xs sx={{ marginTop: 5 }}>
              <Divider style={{ margin: 'auto' }} variant="middle" />

              <SideFilter name="مدیوم" />
              <SideFilter name="سایز" />
              <SideFilter name="قیمت" />
              <SideFilter name="تعداد" />
            </Grid>
            <Grid item xs={9} className={classes.root}>
              <Box sx={{ overflowY: 'scroll' }}>
                <Divider style={{ margin: 30 }} variant="middle" />
                <ImageList
                  variant="masonry"
                  cols={3}
                  gap={12}
                  sx={{ paddingRight: 5 }}
                >
                  {artworks.map((artwork) => (
                    <ArtCard artwork={artwork} />
                  ))}
                </ImageList>
              </Box>
              <Grid>
                {pages > 1 && (
                  <Pagination
                    count={pages}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="secondary"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Hidden mdUp>
              <Grid container>
                <Paper className={classes.responsive} elevation={0}>
                  {artworks.map((artwork) => (
                    <Grid key={artwork._id}>
                      <Paper className={classes.paper}>
                        <ArtCard artwork={artwork} />
                      </Paper>
                    </Grid>
                  ))}
                </Paper>
              </Grid>
            </Hidden>
          </Grid>
        </>
      )}
    </div>
  );
}

export default Artworks;
