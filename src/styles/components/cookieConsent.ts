import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const cookieConsentStyle = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'white',
    },
    headline: {
        color: theme.palette.primary.main,
        fontSize: '1.5rem',
        fontWeight: 200,
        marginBottom: '2rem',
        fontFamily: `'Titillium Web', sans-serif`,
    },
    message: {
        color: grey[700],
        marginBottom: '1.5rem',
    },
    buttonClose: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
    },
}));
