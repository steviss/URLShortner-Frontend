import { makeStyles } from '@material-ui/core';

export const shortenFormStyle = makeStyles((theme) => ({
    formPaper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        padding: '1rem',
    },
    textFieldContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    textField: {
        flex: 1,
    },
    button: {
        marginLeft: '1rem',
    },
    progressLoader: {
        position: 'absolute',
        width: '2rem',
        height: '2rem',
        right: '1rem',
        bottom: 0,
        top: 0,
        margin: 'auto 0',
        zIndex: 5,
        cursor: 'wait',
    },
    tos: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
    },
    tosLinks: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));
