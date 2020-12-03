import { makeStyles } from '@material-ui/core';

export const registerPageStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
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
