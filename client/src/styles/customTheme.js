import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  direction: 'rtl',

  palette: {
    primary: {
      main: '#b77990',
    },
    secondary: {
      main: '#b77990',
    },
    background: {
      default: '#ffffff',
    },
  },

  components: {
    direction: 'rtl',
    // Style sheet name => example Link component ⚛️
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          alignContent: 'center',
          padding: '2px',
          color: 'secondary',
        },
        underlineNone: {
          // Some CSS
          color: 'black',
          '&:hover': {
            color: 'black',
            textDecoration: 'none',
          },
        },

        subtitle1: {
          fontSize: '12px',
          margin: '2px',
        },
        subtitle2: {
          margin: '10px',
        },
        colorPrimary: {
          color: 'white',
        },

        body1: {
          fontSize: '11px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: 'black',
          padding: '5px 15px 5px 15px',
          margin: 2,
          color: 'white',
          minWidth: '41px',
          '&:hover': {
            color: 'white',
            backgroundColor: '#b77990',
            textDecoration: 'none',
          },
        },
        outlined: {
          margin: 2,
          padding: '0px 15px 0px 15px',
          minWidth: '41px',
          '&:hover': {
            borderColor: 'black',
            textDecoration: 'none',
          },
        },
      },
    },
    MuiImageList: {
      styleOverrides: {
        root: {
          overflowY: '-moz-hidden-unscrollable',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#b77990',
          right: 30,
          transformOrigin: 'top right',
          // transition: 'transform 0.6s cubic-bezier(0.61, 1, 0.88, 1)',
          // transform: 'translate(1px, 9px) scale(0.75)',
        },
      },
    },
  },
});

export default customTheme;
