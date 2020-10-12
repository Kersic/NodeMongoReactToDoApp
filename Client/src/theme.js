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

export const listIconsStyle = {
    iconButton: {
        cursor: "pointer",
        "&:hover": {
            color: "#a1a1a1",
        }
    },
    listItem: {
        cursor: "default",
    }
}

export default theme;