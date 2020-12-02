import { makeStyles } from '@material-ui/core';

export const topHeaderStyle = makeStyles((theme) => ({
    topBar: {
        backgroundColor: '#fff',
    },
    root: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    userButton: {
        marginLeft: theme.spacing(2),
    },
    logo: {
        position: 'relative',
        textTransform: 'uppercase',
        fontSize: '1.5rem',
        fontWeight: 600,
    },
}));
