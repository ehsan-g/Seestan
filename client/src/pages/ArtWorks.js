/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ImageList from '@material-ui/core/ImageList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArtCard from '../components/ArtCard';
import { fetchAllArtWorks } from '../actions';

const styles = () => ({
  root: {
    width: '70%',
    marginTop: 100,
    marginBottom: 150,
    paddingBottom: '20px !important',
  },
});

class ArtWorks extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchAllArtWorks();
  };

  render() {
    const { classes } = this.props;
    if (this.props.fetchedWorks[1]) {
      const allWorks = this.props.fetchedWorks;
      return (
        <ImageList variant="woven" cols={3} gap={25} className={classes.root}>
          {allWorks.map((item) => (
            <ArtCard key={item._id} artWork={item} />
          ))}
        </ImageList>
      );
    }
    return <div>Loading...</div>;
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
