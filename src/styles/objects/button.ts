import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const buttonObjectStyle = makeStyles((theme) => ({
    root: {
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
        border: 0,
        borderRadius: '2px',
        boxShadow: '0 2px 4px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: '3rem',
        padding: '0 1.5rem',
        willChange: 'color, background, boxShadow',
        transition: 'color 0.4s ease-in-out, background 0.4s ease-in-out, boxShadow 0.4s ease-in-out',
        '&:disabled': {
            background: `linear-gradient(45deg, ${grey[500]} 30%, ${grey[400]} 90%)`,
            boxShadow: `0 1px 1px 1px ${grey[600]}`,
            color: grey[800],
        },
    },
}));
