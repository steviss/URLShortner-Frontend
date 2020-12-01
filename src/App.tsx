import { Container, Drawer, Grid } from '@material-ui/core';
import Routes from '@routes';
import { StoreProvider } from '@stores';
import React from 'react';
import { drawerStyle, wrapperStyle } from '@styles';
import './App.css';

const App: React.FC = () => {
    var isIE11 = !!window.MSInputMethodContext;
    if (isIE11) alert('(This site is not optimized for IE. Please use Chrome or Firefox or Edge)');
    const wrapperCSS = wrapperStyle();
    const drawerCSS = drawerStyle();
    return (
        <StoreProvider>
            <Drawer anchor="right" classes={drawerCSS} />
            <main className={wrapperCSS.root}>
                <Container maxWidth="lg" className={wrapperCSS.container}>
                    <Grid container spacing={3}>
                        <Routes />
                    </Grid>
                </Container>
            </main>
        </StoreProvider>
    );
};

export default App;
