import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const submitButtonStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
        border: 0,
        borderRadius: '2px',
        boxShadow: '0 2px 4px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: '2.5rem',
        padding: '0 1rem',
        willChange: 'color, background, box-shadow',
        transition: 'color 0.4s ease-in-out, background 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
        '&:disabled': {
            background: `linear-gradient(45deg, ${grey[500]} 30%, ${grey[400]} 90%)`,
            boxShadow: `0 1px 1px 1px ${grey[600]}`,
            color: grey[800],
            '&::before': { opacity: 0 },
        },
        '&:hover': {
            boxShadow: '0 2px 4px 3px rgba(255, 105, 135, .3)',
            '&::before': { opacity: 1 },
        },
        '&::before': {
            position: 'absolute',
            content: `""`,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 60%, ${theme.palette.primary.light} 90%)`,
            willChange: 'opacity',
            transition: 'opacity 0.4s ease-in-out',
            zIndex: 5,
        },
        '& .MuiButton-label': {
            position: 'relative',
            zIndex: 10,
        },
    },
    progressContainer: {
        width: '1.5rem',
        height: '1.5rem',
        marginRight: '1rem',
    },
    label: {},
    loaderTop: {
        color: 'white',
    },
    loaderBottom: {
        color: 'rgba(255, 255, 255, 0.25)',
    },
}));
