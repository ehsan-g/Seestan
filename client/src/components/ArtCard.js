/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ArtCard({ artwork }) {
  const [theArtist, setTheArtist] = useState('');

  // to prevent the following when searching: Can't perform a React state update on an unmounted component
  // isSubscribed condition and clean up helps not setting state when component is unmounted
  useEffect(() => {
    let isSubscribed = true;
    const fetchArtistLocally = async () => {
      const { data } = await axios.get(`/api/artists/${artwork.artist}`);
      if (isSubscribed) {
        setTheArtist(data);
      }
    };
    fetchArtistLocally();
    return () => {
      isSubscribed = false;
    };
  }, [artwork]);

  return (
    <Grid
      container
      direction="row"
      sx={{
        marginBottom: 5,
        opacity: 0.6,
        ':hover': {
          opacity: 1,
        },
      }}
    >
      <ImageListItem
        style={{
          color: '#666666',

          margin: 0,
        }}
      >
        <ImageListItemBar
          style={{ background: 'transparent' }}
          actionPosition="left"
          actionIcon={
            <IconButton
              onClick={() => alert('در حال حاضر راه اندازی نشده است')}
              aria-label={`star ${artwork.title}`}
              style={{ zIndex: 10 }}
            >
              <FavoriteBorder style={{ color: 'white' }} />
            </IconButton>
          }
        />
        <Link
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          to={`/artworks/${artwork._id}`}
        />
        <img
          srcSet={`${artwork.image}?w=161&fit=crop&auto=format 1x,
                  ${artwork.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
          alt={artwork.name}
          loading="lazy"
        />
      </ImageListItem>
      <Grid container>
        <Typography variant="h6">
          {theArtist.firstName} {theArtist.lastName}
        </Typography>
        <Typography variant="subtitle1" sx={{ width: '100%', margin: 0 }}>
          {artwork.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ width: '100%', margin: 0 }}>
          {artwork.price} تومان
        </Typography>
      </Grid>
    </Grid>
  );
}
