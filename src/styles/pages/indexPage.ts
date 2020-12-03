import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

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
    landingPaper: {
        position: 'relative',
    },
    landingMessage: {
        display: 'flex',
        flexDirection: 'column',
        padding: '4rem 0',
    },
    landingHeading: {
        color: grey[800],
        fontSize: '2rem',
        fontWeight: 400,
        marginBottom: '1.5rem',
    },
    landingBody: {
        color: grey[700],
        marginBottom: '1.5rem',
    },
    featureGrid: {
        padding: '1rem',
        flexDirection: 'row',
    },
    featureItemContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    featureItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        padding: '1rem 0',
    },
    featureItemIcon: {
        width: '4rem',
        height: '4rem',
        marginBottom: '2rem',
    },
    featureItemHeading: {
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
    },
    featureItemContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        flex: 1,
    },
    featureItemActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0.5rem',
    },
}));
