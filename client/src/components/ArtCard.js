/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EnterForm from '../pages/auth/EnterFrom';
import { fetchOneArtWork } from '../actions';

class ArtCard extends React.Component {
  fetchTheWork = async (id) => {
    await this.props.fetchOneArtWork(id);
  };

  render() {
    console.log(this.props.artWork);

    return (
      <ImageListItem
        style={{
          color: '#666666',
          width: '300px',
          minHeight: '200px',
          hover: 'none',
          textDecoration: 'none',
        }}
      >
        <Link
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          to={`/artworks/${this.props.artWork._id}`}
          onClick={async () => this.fetchTheWork(this.props.artWork._id)}
        />
        <img
          srcSet={`${this.props.artWork.image}?w=161&fit=crop&auto=format 1x,
                  ${this.props.artWork.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
          alt={this.props.artWork.name}
        />

        <ImageListItemBar
          title={this.props.artWork.title}
          position="bottom"
          style={{ background: 'transparent' }}
          actionIcon={
            <IconButton
              onClick={() => alert(<EnterForm />)}
              aria-label={`star ${this.props.artWork.title}`}
            >
              <FavoriteBorder style={{ color: 'white' }} />
            </IconButton>
          }
          actionPosition="right"
        />

        <Typography variant="subtitle1">{this.props.artWork.artist}</Typography>
        <Typography>${this.props.artWork.price}</Typography>
      </ImageListItem>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchedWork: state.artworks.one,
});

export default connect(mapStateToProps, {
  fetchOneArtWork,
})(ArtCard);
