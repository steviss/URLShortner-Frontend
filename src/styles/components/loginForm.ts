import { makeStyles } from '@material-ui/core';

export const loginFormStyle = makeStyles((theme) => ({
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
}));
