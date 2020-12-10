import { createMuiTheme } from '@material-ui/core/styles';

const NhTheme = createMuiTheme({
    palette: {
        secondary: {
            main: '#0080ff',
            light: '#69afff',
            dark: '#0055cb',
            contrastText: '#ffffff',
        },
        primary: {
            main: '#6f38ff',
            light: '#8b5fff',
            dark: '#4d27b2',
            contrastText: '#ffffff',
        },
    },
});

export default NhTheme;
