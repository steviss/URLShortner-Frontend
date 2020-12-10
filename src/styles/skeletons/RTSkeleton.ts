import { makeStyles } from '@material-ui/core';

export const rtSkeletonStyle = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        minHeight: '25rem',
        height: '25rem',
        maxHeight: '25rem',
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        padding: '1rem',
        width: '100%',
        flex: '1',
    },
    row: {
        display: 'flex',
        alignItems: 'space-evenly',
        justifyContent: 'space-evenly',
        '&:first-child': {
            marginBottom: '2rem',
        },
    },
}));
