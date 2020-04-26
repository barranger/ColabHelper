import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00A349',
    },
    secondary: {
      main: '#0040A3',
    },
    background: '#bccbde',
    cardBackground: '#bccbde',
    // text: {
    //   primary: '#fff'
    // }
  },

  typography: {
    fontFamily: 'Lato, sans-serif',
    button: {
      textTransform: 'none'
    }
  },

  overrides: {
    MuiTextField: {
      root: {
        border: '1px solid black',
      } 
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
