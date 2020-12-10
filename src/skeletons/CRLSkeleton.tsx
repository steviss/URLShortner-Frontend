import { Box, Paper, Skeleton } from '@material-ui/core';
import { crlSkeletonStyle } from '@styles';
import { observer } from 'mobx-react';
import React from 'react';

export const CRLSkeleton = observer(() => {
    const crlSkeletonCSS = crlSkeletonStyle();
    return (
        <Paper square className={crlSkeletonCSS.paper}>
            <Box className={crlSkeletonCSS.legendLeft}>
                <Box className={crlSkeletonCSS.clicks}>
                    <Skeleton variant="text" width="1rem" height="4rem" />
                </Box>
                <Box className={crlSkeletonCSS.numbering}>
                    {Array.from(new Array(10)).map((_, index) => {
                        return <Skeleton key={index} variant="text" width="1rem" height="1rem" />;
                    })}
                </Box>
            </Box>
            <Box className={crlSkeletonCSS.dataTable}>
                {Array.from(new Array(5)).map((_, index) => {
                    return <Skeleton key={index} variant="rectangular" width="5rem" height={`${Math.floor(Math.random() * 100) + 1}%`} />;
                })}
            </Box>
        </Paper>
    );
});
