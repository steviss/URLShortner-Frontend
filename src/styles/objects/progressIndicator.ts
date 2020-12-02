import { makeStyles } from '@material-ui/core';

export const progressIndicatorStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: theme.palette.grey[200],
    },
    top: {
        color: theme.palette.primary.main,
        animationDuration: '600ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));
