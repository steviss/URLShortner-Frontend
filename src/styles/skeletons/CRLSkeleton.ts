import { makeStyles } from '@material-ui/core';

export const crlSkeletonStyle = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        minHeight: '25rem',
        height: '25rem',
        maxHeight: '25rem',
    },
    legendLeft: {
        display: 'flex',
        flex: '1 1 4rem',
        padding: '0 1rem',
    },
    clicks: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numbering: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: '0 1rem',
    },
    dataTable: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        flex: '1 1 100%',
        padding: '1rem',
    },
}));
