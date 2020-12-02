import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const customDrawerStyle = makeStyles((theme) => ({
    header: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '4rem',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottom: `1px solid ${grey[300]}`,
    },
    h6: {
        fontSize: '1rem',
        color: grey[800],
    },
    footerMenu: {
        marginTop: 'auto',
        padding: 0,
        borderTop: `1px solid ${grey[300]}`,
        backgroundColor: grey[50],
    },
}));
