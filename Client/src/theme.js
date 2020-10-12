import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#e53935',
        },
        secondary: {
            main: '#cccccc',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#303030',
        },
    },
});

export default theme;