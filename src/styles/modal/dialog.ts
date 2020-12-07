import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const dialogStyle = makeStyles((theme) => ({
    paper: {
        minWidth: '20rem',
        minHeight: '20rem',
        '& > form': {
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 100%',
        },
    },
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
}));
