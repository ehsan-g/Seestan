import React from 'react';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const CartReceipt = () => (
  <Paper sx={{ height: 150 }} square elevation={2}>
    پرداخت انجام شد
    <Link to="/">برگشت</Link>
  </Paper>
);
