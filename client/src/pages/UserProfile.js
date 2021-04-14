/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import { Grid, Typography, Button, Paper } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import ShareLocationIcon from '@material-ui/icons/ShareLocation';
import AccountUserTab from '../components/account/AccountUserForm';
import { headerStatus } from '../actions/index';
import AccountUserOrders from '../components/account/AccountUserOrders';

export default function FullWidthTabs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(headerStatus(false));
    return function cleanup() {
      dispatch(headerStatus(true));
    };
  }, [dispatch]);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Button href="/" color="inherit">
          <Avatar alt="Logo" variant="square" src="/static/logo.png" />
        </Button>
      </Grid>
      <Grid item xs={8}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab icon={<SettingsIcon />} label="تنظیمات" value="1" />
                <Tab
                  icon={<FavoriteIcon />}
                  label="مورد علاقه"
                  disabled
                  value="2"
                />
                <Tab icon={<ShoppingBasketIcon />} label="خریدها" value="4" />
              </TabList>
            </Box>

            <Box>
              <TabPanel value="1">
                <AccountUserTab />
              </TabPanel>
              <TabPanel value="2">ki</TabPanel>
              <TabPanel value="4">
                <AccountUserOrders />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
}
