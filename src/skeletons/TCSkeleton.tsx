import { Box, Skeleton } from '@material-ui/core';
import { tcSkeletonStyle } from '@styles';
import { observer } from 'mobx-react';
import React from 'react';

export const TCSkeleton = observer(() => {
    const tcSkeletonCSS = tcSkeletonStyle();
    return (
        <Box className={tcSkeletonCSS.pieContainer}>
            <Box className={tcSkeletonCSS.pie}>
                <Skeleton variant="circular" width="15rem" height="15rem" />
            </Box>
        </Box>
    );
});
