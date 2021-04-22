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

  useEffect(() => {
    const fetchArtistLocally = async () => {
      const { data } = await axios.get(`/api/artists/${artwork.artist}`);
      if (data) {
        setTheArtist(data);
      }
    };
    fetchArtistLocally();
    return () => {
      setTheArtist(''); // to prevent this when searching: Can't perform a React state update on an unmounted component
    };
  }, [artwork]);

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
        to={`/artworks/${artwork._id}`}
      />
      <img
        srcSet={`${artwork.image}?w=161&fit=crop&auto=format 1x,
                  ${artwork.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
        alt={artwork.name}
        loading="lazy"
      />

      <ImageListItemBar
        style={{ background: 'transparent' }}
        position="bottom"
        actionPosition="right"
        actionIcon={
          <IconButton
            onClick={() => alert('در حال حاضر راه اندازی نشده است')}
            aria-label={`star ${artwork.title}`}
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
        <Typography variant="h6">
          {theArtist.firstName} {theArtist.lastName}
        </Typography>
        <ImageListItemBar
          title={artwork.title}
          sx={{ width: '100%' }}
          subtitle={
            <span
              style={{
                lineHeight: 2,
                display: 'flex',
                position: 'absolute',
              }}
            >
              {artwork.price} تومان
            </span>
          }
          position="below"
          style={{ background: 'transparent' }}
        />
      </Grid>
    </ImageListItem>
  );
}
