import { lighten, makeStyles } from '@material-ui/core';

export const betterTableToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.mode === 'light'
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: '1 1 100%',
    },
}));

export const betterRedirectTableStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '1rem',
        order: 3,
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    sortSpan: { display: 'none' },
}));
