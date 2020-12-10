import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const totalClickPieStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '25rem',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        padding: '1rem',
        order: 1,
        [theme.breakpoints.up('md')]: { order: 2 },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(25rem - 2.5rem)',
        maxHeight: 'calc(25rem - 2.5rem)',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: '25rem',
        height: '25rem',
        maxHeight: '25rem',
    },
    header: {
        padding: '0.5rem',
    },
    heading: {
        fontSize: '1.25rem',
        color: grey[800],
        fontFamily: `'Titillium Web', sans-serif`,
    },
}));
