import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const drawerStyle = makeStyles((theme) => ({
    root: {},
    paper: {
        minWidth: '14rem',
        maxWidth: '18rem',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '4rem',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    footerMenu: {
        marginTop: 'auto',
        padding: 0,
        borderTop: `1px solid ${grey[300]}`,
        backgroundColor: grey[100],
    },
}));
