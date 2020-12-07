import { makeStyles } from '@material-ui/core';

export const notificationStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    message: {
        padding: '0.5rem 1rem',
    },
    icon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successIcon: {
        color: theme.palette.success.dark,
    },
    warningIcon: {
        color: theme.palette.warning.dark,
    },
    errorIcon: {
        color: theme.palette.error.dark,
    },
    infoIcon: {
        color: theme.palette.info.dark,
    },
    buttonClose: {
        color: theme.palette.primary.light,
    },
}));
