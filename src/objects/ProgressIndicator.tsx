import React from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';
import { progressIndicatorStyle } from '@styles';

export const ProgressIndicator: React.FC<CircularProgressProps & { topClass?: string; bottomClass?: string }> = ({ topClass, bottomClass, ...props }) => {
    const size = props.size || 32;
    const thickness = props.thickness || 4;
    const progressIndicatorCSS = progressIndicatorStyle();
    return (
        <div className={progressIndicatorCSS.root}>
            <CircularProgress variant="determinate" className={`${progressIndicatorCSS.bottom} ${bottomClass || ''}`} size={size} thickness={thickness} {...props} value={100} />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={`${progressIndicatorCSS.top} ${topClass || ''}`}
                classes={{
                    circle: progressIndicatorCSS.circle,
                }}
                size={size}
                thickness={thickness}
                {...props}
            />
        </div>
    );
};
