/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod, createOrder } from '../../actions';
import Message from '../Message';
import Loader from '../Loader';

const options = ['PayPal Payment', 'Mint NFT'];

export default function PlaceOrderButton() {
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
  const { loading, error } = orderCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const placeOrder = () => {
    dispatch(savePaymentMethod(options[selectedIndex]));
    dispatch(
      createOrder({
        user: userInfo,
        cartItems,
        shippingAddress,
        shippingPrice,
        taxPrice,
        totalCartPrice,
        paymentMethod: options[selectedIndex],
      })
    );
  };

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

  // const successPaymentHandler = (paymentResult) => {
  //   dispatch(payOrder(order.orderId, paymentResult));
  // };
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
                      disabled={index === 1}
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
