import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import Stack from '@material-ui/core/Stack';
import { Typography } from '@material-ui/core';

export default function AdminBreadcrumbs() {
  const breadcrumbs = [
    <Link
      key="1"
      color="inherit"
      to="/admin-panel/users"
      style={{ textDecoration: 'none', color: '#5f5f5f' }}
    >
      کاربران
    </Link>,

    <Link
      key="2"
      color="inherit"
      to="/admin-panel/artworks"
      style={{ textDecoration: 'none', color: '#5f5f5f' }}
    >
      آثار
    </Link>,
    <Link
      key="3"
      color="inherit"
      to="/admin-panel/orders"
      style={{ textDecoration: 'none', color: '#5f5f5f' }}
    >
      فروش آثار
    </Link>,
    <Typography
      key="1"
      color="inherit"
      to="/admin-panel/artists"
      style={{ textDecoration: 'none', color: '#d0d0d0' }}
    >
      هنرمندان
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
