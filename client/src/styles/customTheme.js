import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  palette: {
    secondary: {
      main: '#b77990',
    },
    background: {
      default: 'white',
    },
  },

  components: {
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
  },
});

export default customTheme;
