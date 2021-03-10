/* eslint-disable no-plusplus */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import products from '../apis/products';

const useStyles = makeStyles({
  root: {
    width: '50%',
    height: '50%',
  },
  img: {
    // maxHeight: '80%',
  },
});

const ArtWorks = () => (
  <>
    <Gallery />
  </>
);

function Gallery() {
  const classes = useStyles();

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
      author: 'swabdesign',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
      author: 'Pavel Nekoranec',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
      author: 'Charles Deluvio',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
      author: 'Christian Mackie',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
      author: 'Darren Richardson',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
      author: 'Taylor Simpson',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
      author: 'Ben Kolde',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
      author: 'Philipp Berndt',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
      author: 'Jen P.',
    },
    {
      img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
      title: 'Storage',
      author: 'Douglas Sheppard',
    },
    {
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
      author: 'Fi Bell',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
      author: 'Hutomo Abrianto',
    },
  ];

  return (
    <ImageList variant="woven" cols={3} gap={30} className={classes.root}>
      {products.map((item) => (
        <ImageListItem key={item.img}>
          <img
            className={classes.img}
            srcSet={`${item.image}?w=161&fit=crop&auto=format 1x,
                ${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ArtWorks;
