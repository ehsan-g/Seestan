/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../actions/index';

export default function ArtCard({ artWork }) {
  const dispatch = useDispatch();
  const { accountOwner } = artWork;
  console.log(artWork);
  useEffect(() => {
    if (!accountOwner) {
      dispatch(fetchUserDetails(accountOwner));
    }
  }, [dispatch]);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  return (
    <ImageListItem
      style={{
        color: '#666666',
        hover: 'none',
        textDecoration: 'none',
      }}
    >
      <Link
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        href={`/artworks/${artWork._id}`}
      />
      <img
        srcSet={`${artWork.image}?w=161&fit=crop&auto=format 1x,
                  ${artWork.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
        alt={artWork.name}
        loading="lazy"
      />

      <ImageListItemBar
        style={{ background: 'transparent' }}
        position="bottom"
        actionPosition="right"
        actionIcon={
          <IconButton
            onClick={() => alert('در حال حاضر راه اندازی نشده است')}
            aria-label={`star ${artWork.title}`}
          >
            <FavoriteBorder style={{ color: 'white' }} />
          </IconButton>
        }
      />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography>{user.firstName}</Typography>
        <ImageListItemBar
          title={artWork.title}
          sx={{ width: '100%' }}
          subtitle={
            <span
              style={{
                lineHeight: 2,
                display: 'flex',
                position: 'absolute',
              }}
            >
              {artWork.price} تومان
            </span>
          }
          position="below"
          style={{ background: 'transparent' }}
        />
      </Grid>
    </ImageListItem>
  );
}
