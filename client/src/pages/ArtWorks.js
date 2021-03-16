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
    console.log(this.props.allFetchedWorks.all);
  };

  render() {
    const { classes } = this.props;
    if (this.props.allFetchedWorks.all[1]) {
      const products = this.props.allFetchedWorks.all;
      return (
        <ImageList variant="woven" cols={3} gap={25} className={classes.root}>
          {products.map((item) => (
            <ArtCard key={item._id} product={item} />
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
  allFetchedWorks: state.artworks,
});

export default connect(mapStateToProps, {
  fetchAllArtWorks,
})(withStyles(styles)(ArtWorks));
