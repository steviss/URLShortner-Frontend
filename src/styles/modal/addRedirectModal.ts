import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const addRedirectModalStyle = makeStyles((theme) => ({
    dialogHeader: {
        padding: '0.75rem 1rem',
        backgroundColor: grey[50],
        borderBottom: `1px solid ${grey[200]}`,
        '& > h2': {
            display: 'flex',
            flexDirection: 'row',
        },
    },
    dialogHeaderClose: {
        width: '2rem',
        height: '2rem',
        marginLeft: 'auto',
    },
    dialogFooter: {
        padding: '0.75rem 1rem',
        backgroundColor: grey[50],
        borderTop: `1px solid ${grey[200]}`,
    },
    dialogCancel: {
        backgroundColor: grey[300],
        color: grey[800],
        willChange: 'backgroundColor',
        transition: 'background-color 0.4s ease-in-out',
        '&:hover': {
            backgroundColor: grey[400],
        },
    },
    dialogSave: {
        backgroundColor: theme.palette.primary.light,
        color: 'white',
        willChange: 'backgroundColor',
        transition: 'background-color 0.4s ease-in-out',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    textFields: {
        padding: '0.5rem',
        marginBottom: '1rem',
    },
    heading: {
        color: theme.palette.primary.main,
        fontSize: '1.5rem',
        fontWeight: 200,
        fontFamily: `'Titillium Web', sans-serif`,
    },
}));
