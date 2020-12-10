import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const qrCodeRedirectModalStyle = makeStyles((theme) => ({
    dialogHeader: {
        padding: '0.75rem 1rem',
        backgroundColor: grey[50],
        borderBottom: `1px solid ${grey[200]}`,
        '& > h2': {
            display: 'flex',
            flexDirection: 'row',
        },
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    dialogContentButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 0.5rem',
    },
    dialogButtonContainer: {
        flex: '1 0 50%',
        padding: '0.5rem',
    },
    dialogHeaderClose: {
        width: '2rem',
        height: '2rem',
        marginLeft: 'auto',
    },
    dialogFooter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 1rem',
        backgroundColor: grey[50],
        borderTop: `1px solid ${grey[200]}`,
    },
    dialogClose: {
        backgroundColor: grey[300],
        color: grey[800],
        willChange: 'backgroundColor',
        transition: 'background-color 0.4s ease-in-out',
        '&:hover': {
            backgroundColor: grey[400],
        },
    },
    heading: {
        color: theme.palette.primary.main,
        fontSize: '1.5rem',
        fontWeight: 200,
        fontFamily: `'Titillium Web', sans-serif`,
    },
    urlInfo: {
        position: 'relative',
        display: 'flex',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '0.25rem',
        fontSize: '0.75rem',
        border: `1px solid ${grey[300]}`,
    },
    urlAddress: {
        display: 'flex',
        flex: '1',
    },
    urlCopyButton: {
        position: 'absolute',
        width: '2rem',
        height: '2rem',
        top: 0,
        bottom: 0,
        right: '0.5rem',
        margin: 'auto 0',
        zIndex: 5,
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: grey[100],
        },
    },
}));
