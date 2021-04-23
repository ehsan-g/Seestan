/* eslint-disable no-nested-ternary */
import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminBreadcrumbs from '../../components/adminPanel/Breadcrumbs';
import OrderList from '../../components/adminPanel/OrderList';
import ArtworkList from '../../components/adminPanel/ArtworkList';
import UserList from '../../components/adminPanel/UserList';
import ArtistList from '../../components/adminPanel/ArtistList';

function AdminPanel() {
  const { route } = useParams();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }
  }, [history, userInfo]);

  return (
    <Grid
      container
      direction="column"
      // justifyContent="center"
      alignItems="center"
      sx={{ marginTop: 15, minHeight: '100vh' }}
    >
      <AdminBreadcrumbs />
      {route === 'users' ? (
        <UserList />
      ) : route === 'artworks' ? (
        <ArtworkList />
      ) : route === 'artists' ? (
        <ArtistList />
      ) : route === 'orders' ? (
        <OrderList />
      ) : null}
    </Grid>
  );
}

export default AdminPanel;
