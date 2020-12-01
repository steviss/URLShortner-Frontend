import React from 'react';
import { Container, Drawer, Grid, ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Routes from '@routes';
import { StoreProvider } from '@stores';
import { drawerStyle, wrapperStyle } from '@styles';
import './App.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const App: React.FC = () => {
    var isIE11 = !!window.MSInputMethodContext;
    if (isIE11) alert('(This site is not optimized for IE. Please use Chrome or Firefox or Edge)');
    const wrapperCSS = wrapperStyle();
    const drawerCSS = drawerStyle();
    return (
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <Drawer anchor="right" classes={drawerCSS} />
                <main className={wrapperCSS.root}>
                    <Container maxWidth="lg" className={wrapperCSS.container}>
                        <Grid container spacing={3}>
                            <Routes />
                        </Grid>
                    </Container>
                </main>
            </ThemeProvider>
        </StoreProvider>
    );
};

export default App;
