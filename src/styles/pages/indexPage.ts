import { makeStyles } from '@material-ui/core';

export const indexPageStyle = makeStyles((theme) => ({
    particles: {
        height: '60vh',
        background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    },
    header: {
        position: 'relative',
    },
    cover: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    coverContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
    },
    grid: {
        flex: 1,
        minHeight: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    formPaper: {
        display: 'flex',
        flexDirection: 'row',
    },
}));
