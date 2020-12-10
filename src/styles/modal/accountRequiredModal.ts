import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const accountRequiredModalStyle = makeStyles((theme) => ({
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
    bodyText: {
        color: grey[600],
        fontSize: '1rem',
        fontWeight: 200,
    },
    buttonBox: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '1rem',
    },
}));
