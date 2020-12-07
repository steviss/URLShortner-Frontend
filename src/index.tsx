import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider, withStyles } from '@material-ui/core';
import { StoreProvider } from '@stores';
import { theme } from '@styles';
import { NotificationBar } from '@layout';
const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
        // You should target [class*="MuiButton-root"] instead if you nest themes.
        '.MuiCardHeader-action': {
            marginTop: 0,
        },
    },
})(() => null);
ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalCss />
                <App />
                <NotificationBar />
            </ThemeProvider>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
