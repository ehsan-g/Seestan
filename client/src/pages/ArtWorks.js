/* eslint-disable no-plusplus */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import products from '../apis/products';

const useStyles = makeStyles({
  root: {
    width: '70%',
  },
  img: {
    // maxHeight: '80%',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});

const ArtWorks = () => (
  <>
    <Gallery />
  </>
);

function Gallery() {
  const classes = useStyles();

  return (
    <ImageList variant="woven" cols={2} gap={25} className={classes.root}>
      {products.map((item) => (
        <ImageListItem key={item.image}>
          <img
            className={classes.img}
            srcSet={`${item.image}?w=161&fit=crop&auto=format 1x,
                ${item.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
          />

          <ImageListItemBar
            title={item.title}
            position="bottom"
            actionIcon={
              <IconButton
                aria-label={`star ${item.title}`}
                className={classes.icon}
              >
                <StarBorderIcon />
              </IconButton>
            }
            actionPosition="right"
            className={classes.titleBar}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ArtWorks;
