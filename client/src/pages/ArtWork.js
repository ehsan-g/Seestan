/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Divider from '@material-ui/core/Divider';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import MilitaryTechOutlinedIcon from '@material-ui/icons/MilitaryTechOutlined';
import { fetchOneArtWork } from '../actions';
import Dialog from '../components/Dialog';
import TheTabe from '../components/TheTab';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    marginTop: 100,
    marginBottom: 100,
    paddingBottom: '20px !important',
  },
  container: {
    display: 'grid',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: '100%',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
});

// match params has the id from the router /:workId
class ArtWork extends React.Component {
  componentDidMount() {
    this.fetchTheWork();
  }

  fetchTheWork = async () => {
    await this.props.fetchOneArtWork(this.props.match.params.workId);
  };

  renderElement() {
    if (this.props.fetchedWork.gallery) {
      this.fetchTheWork();
      const theArt = this.props.fetchedWork;
      const { classes } = this.props;

      return (
        <>
          <Grid item xs={4} container>
            <Paper className={classes.paper} elevation={1}>
              <Grid item xs={12}>
                <Link to="/" variant="subtitle1">
                  {theArt.artist}
                </Link>
              </Grid>
              <Grid
                item
                xs={12}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <IconButton>
                  <AddCircleOutlineIcon style={{ color: 'black' }} />
                  <Link to="/">
                    <Typography variant="body2" style={{ fontSize: '0.75rem' }}>
                      Follow
                    </Typography>
                  </Link>
                </IconButton>
                <Typography color="#666666" variant="body1">
                  {theArt.colors}
                </Typography>
                <Typography color="#666666" variant="body1">
                  {theArt.material}
                </Typography>
                <Typography color="/#666666" variant="body1">
                  {theArt.width} x {theArt.height} in
                </Typography>
              </Grid>
              <Divider
                className={classes.divider}
                style={{ marginTop: 20, marginBottom: 20 }}
              />

              <Typography
                variant="subtitle2"
                style={{ marginTop: 30, marginBottom: 30 }}
              >
                ${theArt.price}
              </Typography>
              <Button variant="contained" type="submit" fullWidth>
                تماس با گالری
              </Button>
              <Link to="/">
                <Typography variant="subtitle2">
                  {theArt.gallery.name}
                </Typography>
              </Link>
              <Typography variant="subtitle1" color="#666666">
                <RoomOutlinedIcon />
                {theArt.gallery.location}
              </Typography>
              <Typography
                variant="subtitle1"
                color="#666666"
                style={{ display: 'flex' }}
              >
                <MilitaryTechOutlinedIcon />
                <Dialog />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={8} align="center">
            <Paper className={classes.paper} elevation={1}>
              <img
                src={`${theArt.image}`}
                alt="Art work"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Paper>
            <Paper className={classes.paper} elevation={1}>
              <IconButton>
                <FavoriteBorder style={{ color: 'black' }} />
              </IconButton>
            </Paper>
            <TheTabe />
          </Grid>
        </>
      );
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {this.renderElement()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchedWork: state.artworks.one,
});

export default connect(mapStateToProps, {
  fetchOneArtWork,
})(withStyles(styles)(ArtWork));
