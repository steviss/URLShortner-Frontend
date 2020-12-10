import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const loadingBarStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        padding: '2rem 1rem',
        color: grey[700],
    },
    logo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '2.5rem',
        height: '2.5rem',
    },
    svg: {
        display: 'block',
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
    },
    loader: {},
}));
