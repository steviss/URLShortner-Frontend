import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const termsPageStyle = makeStyles((theme) => ({
    header: {
        position: 'relative',
        minHeight: '25vh',
        background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    },
    heading: {
        color: 'white',
        fontSize: '3rem',
        textTransform: 'uppercase',
        fontWeight: 400,
        marginBottom: '1.5rem',
        textShadow: '0 1px 1px rgba(0, 0, 0, 0.5)',
    },
    textHeadingOne: {
        fontSize: '2rem',
        padding: '1rem 0',
    },
    textHeadingTwo: {
        fontSize: '1.75rem',
        padding: '1rem 0',
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
    landingPaper: {
        position: 'relative',
        padding: '2rem',
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
}));
