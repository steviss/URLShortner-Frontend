import { makeStyles } from '@material-ui/core';

export const perRedirectChartStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        padding: '1rem',
        order: 2,
        [theme.breakpoints.up('md')]: { order: 1 },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: '25rem',
        height: '25rem',
        maxHeight: '25rem',
    },
}));
