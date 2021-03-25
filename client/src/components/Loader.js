import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    width: '100%',
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress style={{ color: '#b77990' }} />
    </div>
  );
}
