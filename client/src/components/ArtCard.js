/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

class Card extends React.Component {
  render() {
    console.log(this.props.product);
    return (
      <ImageListItem>
        <img
          srcSet={`${this.props.product.image}?w=161&fit=crop&auto=format 1x,
                  ${this.props.product.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
          alt={this.props.product.name}
        />
        <ImageListItemBar
          title={this.props.product.title}
          position="bottom"
          actionIcon={
            <IconButton aria-label={`star ${this.props.product.title}`}>
              <StarBorderIcon />
            </IconButton>
          }
          actionPosition="right"
        />
        <Typography>{this.props.product.name}</Typography>
      </ImageListItem>
    );
  }
}

export default Card;
