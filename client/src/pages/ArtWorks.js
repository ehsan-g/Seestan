/* eslint-disable no-plusplus */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import products from '../apis/products';
import ArtCard from '../components/ArtCard';

const useStyles = makeStyles({
  root: {
    width: '70%',
    marginTop: 100,
    marginBottom: 100,
    paddingBottom: '20px !important',
  },
});

const ArtWorks = () => {
  const classes = useStyles();

  return (
    <ImageList variant="woven" cols={3} gap={25} className={classes.root}>
      {products.map((item) => (
        <ArtCard key={item._id} product={item} />
      ))}
    </ImageList>
  );
};

export default ArtWorks;
