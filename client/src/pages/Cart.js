/* eslint-disable react/button-has-type */
import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import CartShipForm from '../components/cart/CartShipForm';
import CartPaymentForm from '../components/cart/CartPaymentForm';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

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
        <TabPanel value="2">{/* <CartPaymentForm /> */}</TabPanel>
        <TabPanel value="3">{/* <div> hi </div> */}</TabPanel>
      </TabContext>
    </Box>
  );
}
