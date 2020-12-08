import { makeStyles } from '@material-ui/core';

export const dialogStyle = makeStyles((theme) => ({
    paper: {
        minWidth: '20rem',
        minHeight: '20rem',
        '& > form': {
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 100%',
        },
    },
}));
