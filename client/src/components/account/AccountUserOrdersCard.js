/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { Typography } from '@material-ui/core';
import Message from '../Message';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 500,
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '40%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
}));

export function AccountUserOrdersCard({ order }) {
  const styles = useStyles();

  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <img
        src={`static/media/${order.orderItems[0].image}`}
        alt={order.orderItems[0].name}
        loading="lazy"
        className={styles.media}
      />
      <CardContent>
        <TextInfoContent overline={order.orderItems[0].name} />
        <Typography variant="subtitle1">{`آدرس: ${order.shippingAddress.address}`}</Typography>
        <Typography variant="subtitle1">{`کد‌پستی: ${order.shippingAddress.postalcode}`}</Typography>
        <Typography variant="subtitle1">{` تلفن: ${order.shippingAddress.phone}`}</Typography>
        <Typography variant="subtitle1">{`ارسال: ${order.shippingAddress.deliverymethod}`}</Typography>
        <Typography variant="subtitle1">{`حمل و نقل: ${order.shippingPrice}`}</Typography>
        <Typography variant="subtitle1">{`مالیات: ${order.taxPrice}`}</Typography>
        <Typography variant="subtitle1">{`جمع: ${order.totalPrice}`}</Typography>
        <Typography variant="subtitle1">{`طریفه پرداخت: ${order.paymentMethod}`}</Typography>
        {order.isPaid ? (
          <>
            <Message variant="outlined" severity="success" sx={{ margin: 0 }}>
              پرداخت شده
            </Message>
            {order.isDelivered ? (
              <Message variant="outlined" severity="success">
                تحویل داده شد
              </Message>
            ) : (
              <Message variant="outlined" severity="error">
                منتظر ارسال
              </Message>
            )}
          </>
        ) : (
          <Message variant="outlined" severity="error">
            پرداخت نشده
          </Message>
        )}
      </CardContent>
    </Card>
  );
}

export default AccountUserOrdersCard;
