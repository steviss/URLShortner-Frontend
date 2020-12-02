import React from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';
import { progressIndicatorStyle } from '@styles';

export const ProgressIndicator: React.FC<CircularProgressProps> = (props) => {
    const progressIndicatorCSS = progressIndicatorStyle();
    return (
        <div className={progressIndicatorCSS.root}>
            <CircularProgress variant="determinate" className={progressIndicatorCSS.bottom} size={32} thickness={4} {...props} value={100} />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={progressIndicatorCSS.top}
                classes={{
                    circle: progressIndicatorCSS.circle,
                }}
                size={32}
                thickness={4}
                {...props}
            />
        </div>
    );
};
