import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const unclaimedRedirectsStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        padding: '0 1rem',
        order: 1,
        borderBottom: `1px solid ${grey[300]}`,
    },
    header: {
        padding: '2rem 0.5rem 2rem 0.5rem',
        borderBottom: `1px solid ${grey[300]}`,
    },
    heading: {
        fontSize: '1.75rem',
        color: grey[800],
        fontFamily: `'Titillium Web', sans-serif`,
    },
    body: {
        padding: '1rem 0 0 0',
    },
    pagination: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 0',
    },
}));
