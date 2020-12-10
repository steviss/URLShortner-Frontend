import { makeStyles } from '@material-ui/core';

export const loadingPageStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    grid: {
        flex: 1,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
}));
