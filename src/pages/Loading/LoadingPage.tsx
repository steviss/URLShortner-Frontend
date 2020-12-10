import React from 'react';
import { loadingPageStyle } from '@styles';
import { LoadingBar } from '@objects';
import { Container, Grid } from '@material-ui/core';

export const LoadingPage: React.FC = () => {
    const loadingPageCSS = loadingPageStyle();
    return (
        <>
            <Container maxWidth="lg" className={loadingPageCSS.container}>
                <Grid className={loadingPageCSS.grid}>
                    <LoadingBar />
                </Grid>
            </Container>
        </>
    );
};
