import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import Routes from '@routes';
import { wrapperStyle } from '@styles';
import './App.css';
import { TopHeader } from '@headers/TopHeader';
import { UserDrawer, MenuDrawer } from '@drawers';

const App: React.FC = () => {
    var isIE11 = !!window.MSInputMethodContext;
    if (isIE11) alert('(This site is not optimized for IE. Please use Chrome or Firefox or Edge)');
    const wrapperCSS = wrapperStyle();
    return (
        <main className={wrapperCSS.root}>
            <TopHeader />
            <MenuDrawer />
            <Container maxWidth="lg" className={wrapperCSS.container}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Paper>
                        <Routes />
                    </Paper>
                </Grid>
            </Container>
            <UserDrawer />
        </main>
    );
};

export default App;
