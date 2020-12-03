import { makeStyles } from '@material-ui/core';

export const textFieldStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 0',
        '& > .MuiTextField-root > .MuiFormHelperText-root': {
            top: '100%',
            position: 'absolute',
            left: 0,
        },
    },
    icon: {
        position: 'absolute',
        width: '1.5rem',
        height: '1.5rem',
        top: 0,
        right: '1rem',
        bottom: 0,
        margin: 'auto 0',
        color: 'red',
        cursor: 'help',
    },
}));
