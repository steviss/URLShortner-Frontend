import { makeStyles } from '@material-ui/core';

export const notificationStyle = makeStyles((theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    message: {
        flex: 1,
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
        marginLeft: 'auto',
        color: theme.palette.primary.light,
    },
}));
