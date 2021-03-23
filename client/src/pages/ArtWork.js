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
    marginTop: 100,
    marginBottom: 100,
  },
  container: {
    display: 'grid',
  },
  paper: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(2),
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
    if (this.props.fetchedWork) {
      const theArt = this.props.fetchedWork;
      const { classes } = this.props;
      return (
        <>
          <Grid container direction="row-reverse">
            <Grid item sm={8} align="center">
              <Paper className={classes.paper} elevation={1}>
                <img
                  src={`${theArt.image}`}
                  alt="Art work"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Paper>
              <Paper className={classes.paper} elevation={1}>
                <IconButton
                  onClick={() => alert('در حال حاضر راه اندازی نشده است')}
                >
                  <FavoriteBorder style={{ color: 'black' }} />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xs>
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
                      <Typography
                        variant="body2"
                        style={{ fontSize: '0.75rem' }}
                      >
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
                  <Typography variant="subtitle2">{theArt.name}</Typography>
                </Link>
                <Typography variant="subtitle1" color="#666666">
                  <RoomOutlinedIcon />
                  {theArt.workName}
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
          </Grid>
          <Grid container justifyContent="flex-end" alignItems="flex-end">
            <Grid item xs sm={8}>
              <Paper className={classes.paper} elevation={1}>
                <TheTabe />
              </Paper>
            </Grid>
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
