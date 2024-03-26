import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#b2dfdb',
            main: '#00bfa5',
            dark: '#00695c',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffe0b2',
            main: '#ffb74d',
            dark: '#e65100',
            contrastText: '#ffffff',
        },
        info: {
            light: '#d1c4e9',
            main: '#b39ddb',
            dark: '#673ab7',
            contrastText: '#ffffff'
        },
    },
    components: {
        // Name of the component
        MuiTooltip: {
          styleOverrides: {
            // Name of the slot
            tooltip: {
              // Some CSS
              backgroundColor: '#673ab7',
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '&:hover': {
                '& .MuiInput-underline:before': {
                  borderColor: '#673ab7 !important',
                },
                '& .MuiInput-underline:after': {
                  borderColor: '#673ab7 !important',
                },
              },
              '& label': {
                color: '#b39ddb', // Label color
              },
              '& label.Mui-focused': {
                color: '#673ab7',
              },
              '& .MuiInputBase-root': {
                color: '#673ab7', // Text color
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: '#b39ddb', // Underline color when not focused
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#673ab7', // Underline color when focused
              },
            },
          },
        },
        MuiCircularProgress: {
          styleOverrides: {
            root: {
              width: '60px !important',
              height: '60px !important'
            }
          }
        }
      },
});

export default theme;