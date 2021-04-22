/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { BrowserRouter as useLocation, useHistory } from 'react-router-dom';
import RegisterForm from '../../pages/auth/RegisterForm';
import EnterForm from '../../pages/auth/LoginForm';
import { logout, fetchAllArtWorks } from '../../actions/index';

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
  const dispatch = useDispatch();
  const history = useHistory();
  const preventDefault = (event) => event.preventDefault();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  // Modal register
  const [rOpen, setRegOpen] = useState(false);
  const [eOpen, setEnterOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (history.location.pathname.includes('/register')) setEnterOpen(false);
  }, [history.location]);

  const headerStatus = useSelector((state) => state.headerStatus);
  const { IsHeader } = headerStatus;

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

  const logoutHandler = () => {
    dispatch(logout());
  };

  const menuId = 'primary-search-account-menu';

  const menuGotoUrl = (url) => () => {
    history.push(url);
    history.go(0);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const [theAnchorEl, setTheAnchorEl] = useState(null);
  const theOpen = Boolean(theAnchorEl);
  const [keyword, setKeyword] = useState('');
  const TheHandleClick = (event) => {
    setTheAnchorEl(event.currentTarget);
  };
  const TheHandleClose = () => {
    setTheAnchorEl(null);
  };

  const changeHandler = (event) => {
    if (event.target.value) {
      history.push(`/?keyword=${event.target.value}`);
      dispatch(fetchAllArtWorks(event.target.value));
      setKeyword(event.target.value);
    } else {
      history.push(history.push(history.location.pathname));
    }
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
        <PermIdentityIcon />
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
        <MenuItem onClick={menuGotoUrl('/profile')}>صفحه کاربری</MenuItem>
        {userInfo && userInfo.token !== undefined && userInfo.isAdmin && (
          <MenuItem onClick={menuGotoUrl('/admin/users')}>داشبورد</MenuItem>
        )}

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
          <Grid>{renderUserMenu}</Grid>
        ) : (
          <Grid>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MenuItem>ورود / ثبت‌نام</MenuItem>
              <PermIdentityIcon />
            </IconButton>
          </Grid>
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

  return (
    <Grid className={classes.grow}>
      {!IsHeader ? null : (
        <>
          <AppBar
            position="fixed"
            elevation={0}
            sx={{ borderBottom: '1px solid #e5e5e5' }}
          >
            {renderMobileMenu}
            <Toolbar>
              <Grid className={classes.grow} />
              <Grid>
                <Button href="/" color="inherit">
                  <Avatar alt="Logo" variant="square" src="/static/logo.png" />
                </Button>
              </Grid>
              <Grid className={classes.search}>
                <Grid className={classes.searchIcon}>
                  <SearchIcon style={{ margin: '10px' }} />
                </Grid>
                <InputBase
                  placeholder="جستجو نام هنرمند، گالری، اثر، استایل و غیره"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={(event) => changeHandler(event)}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Grid>

              <Grid className={classes.sectionDesktop}>
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
              </Grid>
              <Grid className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Grid>
            </Toolbar>
          </AppBar>
          {renderMenu}
        </>
      )}

      <Grid>
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
          <Grid className={classes.paper}>
            <RegisterForm />
          </Grid>
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
          <Grid className={classes.paper}>
            <EnterForm />
          </Grid>
        </Modal>
      </Grid>
    </Grid>
  );
}
