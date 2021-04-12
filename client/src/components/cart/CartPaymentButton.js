/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod, cartStep, createOrder } from '../../actions';
import Message from '../Message';
import Loader from '../Loader';

const options = ['پرداخت با شاپرک', 'PayPal Payment', 'Mint NFT'];

export default function CartPaymentButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  const theCart = useSelector((state) => state.theCart);
  const {
    cartItems,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalCartPrice,
  } = theCart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, loading, error, success } = orderCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const placeOrder = () => {
    if (options[selectedIndex] === 'پرداخت با شاپرک') {
      dispatch(savePaymentMethod(options[selectedIndex]));
      dispatch(
        createOrder({
          userInfo,
          cartItems,
          shippingAddress,
          shippingPrice,
          taxPrice,
          totalCartPrice,
          paymentMethod: options[selectedIndex],
        })
      );
    }
  };

  // go to receipt page if payment successful
  useEffect(() => {
    if (success) {
      history.push(`/cart/order/${order._id}`);
      dispatch(cartStep('3'));
    }
  }, [history, success]);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="outlined"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
        sx={{ direction: 'ltr' }}
      >
        <Button onClick={placeOrder}>{options[selectedIndex]}</Button>
        <Button
          color="primary"
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="outlined" severity="error">
          {error}
        </Message>
      ) : null}

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 1 || index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
