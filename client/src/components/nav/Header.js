import React from 'react';
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
import { BrowserRouter as Link } from 'react-router-dom';
import RegisterForm from '../../pages/auth/RegisterForm';
import EnterForm from '../../pages/auth/EnterFrom';

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
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
    width: '100%',
    '& input::placeholder': {
      fontSize: '10px',
    },
    direction: 'rtl',
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

//  MOdal fade transition
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function Header() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login" component="a" underline="none" target="_self">
          ورود
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/register" component="a" underline="none" target="_self">
          ثبت‌نام
        </Link>
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
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
        <Typography variant="subtitle1">
          <Link to="#" component="a" onClick={preventDefault} underline="none">
            گزینش‌شده
          </Link>
        </Typography>
      </MenuItem>
      <MenuItem>
        <Typography variant="subtitle1">
          <Link to="#" component="a" onClick={preventDefault} underline="none">
            فروش
          </Link>
        </Typography>
      </MenuItem>
      <MenuItem>
        <Typography variant="subtitle1">
          <Link to="#" component="a" onClick={preventDefault} underline="none">
            خرید
          </Link>
        </Typography>
      </MenuItem>
      <MenuItem>
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
      </MenuItem>
    </Menu>
  );

  // Modal register
  const [rOpen, setRegOpen] = React.useState(false);
  const [eOpen, setEnterOpen] = React.useState(false);

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        {renderMobileMenu}
        <Toolbar>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
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
            >
              ورود
            </Button>
            <Typography variant="subtitle1">
              <Link
                to="#"
                component="a"
                onClick={preventDefault}
                underline="none"
              >
                گزینش‌شده
              </Link>
            </Typography>
            <Typography variant="subtitle1">
              <Link
                to="#"
                component="a"
                onClick={preventDefault}
                underline="none"
              >
                فروش
              </Link>
            </Typography>
            <Typography variant="subtitle1">
              <Link
                to="#"
                component="a"
                onClick={preventDefault}
                underline="none"
              >
                خرید
              </Link>
            </Typography>
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
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
          <div>
            <Avatar
              alt="Logo"
              variant="square"
              src="/static/logo.png"
              className={classes.large}
            />
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
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
          <Fade in={rOpen}>
            <div className={classes.paper}>
              <RegisterForm />
            </div>
          </Fade>
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
          <Fade in={eOpen}>
            <div className={classes.paper}>
              <EnterForm />
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
