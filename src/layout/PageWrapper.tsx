import React from 'react';
import { Container, Paper } from '@material-ui/core';
import { wrapperStyle } from '@styles';

export const PageWrapper: React.FC = ({ children }) => {
    const wrapperCSS = wrapperStyle();
    return (
        <Container maxWidth="lg" className={wrapperCSS.container}>
            <Paper>{children}</Paper>
        </Container>
    );
};
