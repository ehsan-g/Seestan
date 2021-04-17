import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import Stack from '@material-ui/core/Stack';

export default function AdminBreadcrumbs() {
  const breadcrumbs = [
    <Link key="1" color="inherit" to="/admin/users">
      کاربران
    </Link>,
    <Link key="1" color="inherit" to="/admin/artists">
      هنرمندان
    </Link>,
    <Link key="2" color="inherit" to="/admin/artworks">
      آثار
    </Link>,
    <Link key="3" color="inherit" to="/admin/orders">
      فروش آثار
    </Link>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
