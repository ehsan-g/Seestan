import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, Typography, Avatar } from '@material-ui/core';
import { BrowserRouter as Link } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
    minHeight: 850,
  },
}));

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        className={classes.appBar}
        elevation={0}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}
          style={{ minHeight: 200, width: '100%' }}
        >
          <Grid
            item
            xs
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
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
            <Link to="#">
              <InstagramIcon />
            </Link>
            <Link to="#">
              <FacebookIcon />{' '}
            </Link>
            <Link to="#">
              <LinkedInIcon />{' '}
            </Link>
            <Link to="#">
              <GitHubIcon />
            </Link>
            <Link to="#">
              <TwitterIcon />
            </Link>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
}
