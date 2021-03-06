import { Grid, Typography, Avatar, Link } from '@material-ui/core';
import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => (
  <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    spacing={10}
    style={{ top: 0 }}
  >
    <Grid item xs container direction="row" justify="flex-end">
      <Avatar
        alt="Logo"
        variant="square"
        src="/static/logo.png"
        // className={classes.large}
      />
      <Typography variant="caption" display="inline">
        نوکرم
      </Typography>
    </Grid>
    <Grid item xs container direction="row" justify="center">
      <Typography variant="subtitle1" display="inline">
        <Link href="#">تماس با ما</Link>
      </Typography>
      <Typography variant="subtitle1" display="inline">
        <Link href="#"> قوانین‌ و مقررات</Link>
      </Typography>
    </Grid>
    <Grid item xs container direction="row" justify="flex-start">
      <Link href="#">
        <InstagramIcon />
      </Link>
      <Link href="#">
        <FacebookIcon />{' '}
      </Link>
      <Link href="#">
        <LinkedInIcon />{' '}
      </Link>
      <Link href="#">
        <GitHubIcon />
      </Link>
      <Link href="#">
        <TwitterIcon />
      </Link>
    </Grid>
  </Grid>
);
export default Footer;
