import { makeStyles } from '@material-ui/core';

export const wrapperStyle = makeStyles((theme) => ({
    root: { minHeight: '100%', minWidth: '100%', position: 'relative' },
    container: { paddingHorizontal: theme.spacing(20) },
}));
