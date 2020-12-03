import { makeStyles } from '@material-ui/core';

export const registerFormStyle = makeStyles((theme) => ({
    formPaper: {
        display: 'flex',
        width: '24rem',
        maxWidth: 'calc(100vw - 1rem)',
        padding: '1rem',
    },
    heading: {
        color: theme.palette.primary.main,
        fontSize: '1.5rem',
        fontWeight: 200,
        marginBottom: '2rem',
        fontFamily: `'Titillium Web', sans-serif`,
    },
    form: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '1rem',
    },
    links: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        textTransform: 'uppercase',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    submitButton: {
        margin: '1rem 0',
        alignSelf: 'center',
    },
    registerInfo: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 0',
    },
    forgotPassword: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    textFields: {
        padding: '0.5rem',
        marginBottom: '1rem',
    },
}));
