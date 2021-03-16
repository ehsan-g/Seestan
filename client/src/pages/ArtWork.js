import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    marginTop: 100,
    marginBottom: 100,
    paddingBottom: '20px !important',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ArtWork = function () {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={5}>
          {/* <img src={`${this.props.product.image}`} alt="Art work" /> */}
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ArtWork;
