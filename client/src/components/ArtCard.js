/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Link } from 'react-router-dom';
import EnterForm from '../pages/auth/EnterFrom';

class Card extends React.Component {
  render() {
    return (
      <ImageListItem component={Link} to={`/product/${this.props.product._id}`}>
        <img
          srcSet={`${this.props.product.image}?w=161&fit=crop&auto=format 1x,
                  ${this.props.product.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
          alt={this.props.product.name}
        />
        <div>
          <ImageListItemBar
            title={this.props.product.title}
            position="bottom"
            style={{ background: 'transparent' }}
            actionIcon={
              <IconButton
                onClick={() => alert(<EnterForm />)}
                aria-label={`star ${this.props.product.title}`}
              >
                <FavoriteBorder style={{ color: 'white' }} />
              </IconButton>
            }
            actionPosition="right"
          />
        </div>

        <Typography variant="subtitle1">{this.props.product.name}</Typography>
        <Typography>${this.props.product.price}</Typography>
      </ImageListItem>
    );
  }
}

export default Card;
