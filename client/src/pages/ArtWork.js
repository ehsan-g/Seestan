import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '70%',
    height: '100vh',
    marginTop: 100,
    marginBottom: 100,
    paddingBottom: '20px !important',
  },
});
const ArtWork = function () {
  const classes = useStyles();
  return <Container className={classes.root}> HI</Container>;
};

export default ArtWork;
