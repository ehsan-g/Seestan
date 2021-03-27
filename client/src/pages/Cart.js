/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { useSelector, useDispatch } from 'react-redux';
import CartShipForm from '../components/cart/CartShipForm';
import CartReview from '../components/cart/CartReview';
import history from '../history';

export default function LabTabs() {
  const cartStatus = useSelector((state) => state.theCart);
  const { error, loading, cart } = cartStatus;

  let value;
  const x = Object.keys(cart);
  console.log(x);

  switch (x[0]) {
    case 'name':
      value = '2';
      console.log(cart);
      break;
    case 'shipping':
      value = '2';
      break;
    default:
      value = '1';
    // code block
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList aria-label="lab API tabs example">
            <Tab disabled label="Item One" value="1" />
            <Tab disabled label="Item Two" value="2" />
            <Tab disabled label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CartShipForm />
        </TabPanel>
        <TabPanel value="2">
          <CartReview />
        </TabPanel>
        <TabPanel value="3">
          <div> hi </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
