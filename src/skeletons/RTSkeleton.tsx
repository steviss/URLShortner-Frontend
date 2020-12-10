import { Box, Paper, Skeleton } from '@material-ui/core';
import { rtSkeletonStyle } from '@styles';
import { observer } from 'mobx-react';
import React from 'react';

export const RTSkeleton = observer(() => {
    const rtSkeletonCSS = rtSkeletonStyle();
    return (
        <Paper square className={rtSkeletonCSS.paper}>
            <Box className={rtSkeletonCSS.table}>
                {Array.from(new Array(10)).map((_, index) => {
                    return (
                        <Box key={index} className={rtSkeletonCSS.row}>
                            {Array.from(new Array(10)).map((_, tdc) => {
                                return <Skeleton key={tdc} variant="text" width="2rem" height="1rem" />;
                            })}
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
});
