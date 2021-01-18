import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const dashboardPageStyle = makeStyles((theme) => ({
    root: {
        background: grey[100],
    },
    header: {
        position: 'relative',
    },
    welcomeMessage: {
        color: grey[600],
        fontSize: '2rem',
        fontFamily: `'Titillium Web', sans-serif`,
        fontWeight: 400,
        padding: '1rem 0',
    },
    headerGrid: {
        padding: '1rem 1.25rem',
    },
    collectionButton: {
        backgroundColor: 'white',
        willChange: 'color',
        boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 4px 0px rgba(0,0,0,0.12)`,
        color: grey[800],
        padding: '0.25rem 0.5rem 0.25rem 0.75rem',
        transition: 'background-color 0.4s ease-in-out',
        marginLeft: '1rem',
        '&:hover': {
            backgroundColor: grey[300],
        },
    },
    addButton: {
        backgroundColor: 'white',
        willChange: 'color',
        boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 4px 0px rgba(0,0,0,0.12)`,
        color: grey[800],
        padding: '0.25rem 0.5rem',
        transition: 'background-color 0.4s ease-in-out',
        marginLeft: '1rem',
        '&:hover': {
            backgroundColor: grey[300],
        },
    },
    headerActionButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '0 0.5rem',
    },
    grid: {},
    container: {},
}));
