// react 17.0.2

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CustomDarkTheme from './Components/Util/CustomDarkTheme';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={CustomDarkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);