import { makeStyles } from '@material-ui/core';

export const registerPageStyle = makeStyles((theme) => ({
    root: {
        background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    },
}));
