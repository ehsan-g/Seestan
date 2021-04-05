/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import { Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import SearchIcon from '@material-ui/icons/Search';
import { BrowserRouter as Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RegisterForm from '../../pages/auth/RegisterForm';
import EnterForm from '../../pages/auth/LoginForm';
import history from '../../history';
import { logout } from '../../actions/index';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  myButton: {
    marginRight: '20px',
    marginLeft: '10px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: '0',
    border: '1px solid rgb(229, 229, 229)',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      borderColor: '#6c757d',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: '40px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '100%',
      fontSize: 1,
    },
  },
  searchIcon: {
    width: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
  },

  inputRoot: {
    color: 'inherit',
    width: '100%',
    '& input::placeholder': {
      fontSize: '10px',
    },
    [theme.breakpoints.up('sm')]: {
      '& input::placeholder': {
        fontSize: '14px',
      },
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    margin: '5px !important',
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    // transition: theme.transitions.create('width'),
    width: '80% !important',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    fontSize: '0.8rem',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Header() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const menuGotoUrl = (url) => (e) => {
    console.log(url, e);
    history.push(url);
    history.go(0);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const [theAnchorEl, setTheAnchorEl] = React.useState(null);
  const theOpen = Boolean(theAnchorEl);
  const TheHandleClick = (event) => {
    setTheAnchorEl(event.currentTarget);
  };
  const TheHandleClose = () => {
    setTheAnchorEl(null);
  };

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const renderUserMenu = (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={theOpen ? 'true' : undefined}
        onClick={TheHandleClick}
      >
        <AccountCircle />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={theAnchorEl}
        open={theOpen}
        onClose={TheHandleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={TheHandleClose}>
          <Link to="/profile">صفحه کاربری</Link>
        </MenuItem>
        <MenuItem onClick={logoutHandler}>خروج</MenuItem>
      </Menu>
    </>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button href="/sell" color="inherit">
          فروش
        </Button>
      </MenuItem>
      <MenuItem>
        <Button href="/" color="inherit">
          خرید
        </Button>
      </MenuItem>

      <MenuItem>
        {userInfo && userInfo.token !== undefined ? (
          <div>{renderUserMenu}</div>
        ) : (
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Typography variant="subtitle1">حساب کاربری</Typography>

              <AccountCircle />
            </IconButton>
          </div>
        )}
      </MenuItem>
    </Menu>
  );
  // the inside menu in mobile view
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={menuGotoUrl('/login')}>ورود</MenuItem>
      <MenuItem onClick={menuGotoUrl('/register')}>ثبت‌نام</MenuItem>
    </Menu>
  );

  // Modal register
  const [rOpen, setRegOpen] = React.useState(false);
  const [eOpen, setEnterOpen] = React.useState(false);
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
    if (location.pathname.includes('/register')) setEnterOpen(false);
  }, [location]);

  useEffect(() => {
    if (userInfo) {
      console.log('hide the log in / register buttons');
    }
  }, [userInfo]);

  const headerStatus = useSelector((state) => state.headerStatus);
  const { IsHeader } = headerStatus;
  console.log(IsHeader);

  return (
    <div className={classes.grow}>
      {!IsHeader ? null : (
        <>
          <AppBar
            position="fixed"
            elevation={0}
            sx={{ borderBottom: '1px solid #e5e5e5' }}
          >
            {renderMobileMenu}
            <Toolbar>
              <div className={classes.grow} />
              <div>
                <Button href="/" color="inherit">
                  <Avatar alt="Logo" variant="square" src="/static/logo.png" />
                </Button>
              </div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon style={{ margin: '10px' }} />
                </div>
                <InputBase
                  placeholder="جستجو نام هنرمند، گالری، اثر، استایل و غیره"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>

              <div className={classes.sectionDesktop}>
                {userInfo && userInfo.token !== undefined ? (
                  <>{renderUserMenu}</>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      className={classes.myButton}
                      onClick={() => setRegOpen(true)}
                    >
                      ثبت‌نام
                    </Button>
                    <Button
                      variant="outlined"
                      className={classes.myButton}
                      onClick={() => setEnterOpen(true)}
                      hidden="True"
                    >
                      ورود
                    </Button>
                  </>
                )}

                <Button href="/sell" color="inherit">
                  فروش
                </Button>
                <Button href="/" color="inherit">
                  خرید
                </Button>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
        </>
      )}

      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={rOpen}
          onClose={() => setRegOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={classes.paper}>
            <RegisterForm />
          </div>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={eOpen}
          onClose={() => setEnterOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={classes.paper}>
            <EnterForm />
          </div>
        </Modal>
      </div>
    </div>
  );
}
