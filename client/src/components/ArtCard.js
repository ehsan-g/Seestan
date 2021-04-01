/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import { fetchOneArtWork } from '../actions';

class ArtCard extends React.Component {
  fetchTheWork = async (id) => {
    await this.props.fetchOneArtWork(id);
  };

  render() {
    return (
      <ImageListItem
        style={{
          color: '#666666',
          width: '300px',
          hover: 'none',
          textDecoration: 'none',
        }}
      >
        <Link
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          onClick={async () => this.fetchTheWork(this.props.artWork._id)}
          href={`/artworks/${this.props.artWork._id}`}
        />
        <img
          srcSet={`${this.props.artWork.image}?w=161&fit=crop&auto=format 1x,
                  ${this.props.artWork.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
          alt={this.props.artWork.name}
          loading="lazy"
        />

        <ImageListItemBar
          style={{ background: 'transparent' }}
          position="bottom"
          actionPosition="right"
          actionIcon={
            <IconButton
              onClick={() => alert('در حال حاضر راه اندازی نشده است')}
              aria-label={`star ${this.props.artWork.title}`}
            >
              <FavoriteBorder style={{ color: 'white' }} />
            </IconButton>
          }
        />
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <ImageListItemBar
            title={this.props.artWork.title}
            sx={{ width: '100%' }}
            subtitle={
              <span
                style={{
                  lineHeight: 2,
                  display: 'flex',
                  position: 'absolute',
                }}
              >
                {this.props.artWork.price} تومان
              </span>
            }
            position="below"
            style={{ background: 'transparent' }}
          />
        </Grid>
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
