/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    width: '100%',
  },
  tabs: {
    borderBottom: '1px solid #666666',
    '& .MuiTabs-indicator': {
      backgroundColor: '#b77990',
    },
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  },
});

class TheTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'one' };
  }

  render() {
    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });
    };

    const { classes } = this.props;

    return (
      <Paper className={classes.paper} elevation={1}>
        <Box sx={{ width: '100%', direction: 'rtl' }}>
          <Tabs
            className={classes.tabs}
            value={this.state.value}
            onChange={handleChange}
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="Item One" />
            <Tab value="two" label="Item Two" />
          </Tabs>
        </Box>
      </Paper>
    );
  }
}

export default withStyles(styles)(TheTab);
