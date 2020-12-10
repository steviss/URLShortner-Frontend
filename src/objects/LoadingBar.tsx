import React from 'react';
import { loadingBarStyle } from '@styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

export const LoadingBar: React.FC = () => {
    const loadingBarCSS = loadingBarStyle();
    return (
        <Box className={loadingBarCSS.root}>
            <Box className={loadingBarCSS.logo}>
                <LinkIcon className={loadingBarCSS.svg} />
            </Box>
            <Box className={loadingBarCSS.message}>
                <CircularProgress size={32} className={loadingBarCSS.loader} />
                <Typography className={loadingBarCSS.text}>Please wait, loading.</Typography>
            </Box>
        </Box>
    );
};
