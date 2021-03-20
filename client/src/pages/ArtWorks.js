/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ImageList from '@material-ui/core/ImageList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import ArtCard from '../components/ArtCard';
import { fetchAllArtWorks } from '../actions';

const styles = (theme) => ({
  root: {
    width: '70%',
    marginTop: 100,
    // paddingBottom: '20px !important',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  responsive: {
    marginTop: 100,
    padding: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
});

class ArtWorks extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchAllArtWorks();
  };

  render() {
    const { classes } = this.props;
    if (this.props.fetchedWorks.map) {
      const allWorks = this.props.fetchedWorks;
      return (
        <>
          <div className={classes.root}>
            <ImageList
              className={classes.imageList}
              variant="woven"
              cols={3}
              gap={25}
            >
              {allWorks.map((item) => (
                <ArtCard key={item._id} artWork={item} />
              ))}
            </ImageList>
          </div>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Paper className={classes.responsive} elevation={0}>
              {allWorks.map((item) => (
                <Hidden mdUp key={item._id}>
                  <Grid>
                    <Paper className={classes.paper}>
                      <ArtCard artWork={item} />
                    </Paper>
                  </Grid>
                </Hidden>
              ))}
            </Paper>
          </Grid>
        </>
      );
    }

    return <div className={classes.root}>Loading...</div>;
  }
}

ArtWorks.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  fetchedWorks: state.artworks.all,
});

export default connect(mapStateToProps, {
  fetchAllArtWorks,
})(withStyles(styles)(ArtWorks));
