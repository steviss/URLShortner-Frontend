import { grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff893b',
            main: '#ff4b1f',
            dark: '#000',
            contrastText: grey[800],
        },
        secondary: {
            light: '#000',
            main: '#ff4b1f',
            dark: '#fff',
            contrastText: '#fff',
        },
    },
});
