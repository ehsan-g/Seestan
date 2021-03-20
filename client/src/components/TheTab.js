/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { fetchOneArtWork } from '../actions/index.js';

const styles = (theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    width: '100%',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class TheTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  render() {
    const handleChange = (event, newValue) => {
      console.log(newValue);
      this.setState({ value: newValue });
    };
    const { classes } = this.props;

    return (
      <Box sx={{ width: '100%', direction: 'rtl' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={this.state.value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="در مورد اثر" {...a11yProps(0)} />
            <Tab label="پیشنه" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={this.state.value} index={0}>
          {this.props.fetchedWork.aboutWork}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          پیشنه
        </TabPanel>
      </Box>
    );
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  fetchedWork: state.artworks.one,
});

export default connect(mapStateToProps, {
  fetchOneArtWork,
})(withStyles(styles)(TheTab));
