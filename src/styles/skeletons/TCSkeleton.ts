import { makeStyles } from '@material-ui/core';

export const tcSkeletonStyle = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    pieContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    pie: {
        position: 'relative',
        display: 'flex',
        width: '15rem',
        height: '15rem',
        '&::before': {
            content: `''`,
            position: 'absolute',
            width: '55%',
            height: '55%',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: '50%',
            backgroundColor: 'white',
            margin: 'auto',
            zIndex: 5,
        },
    },
}));
