import { createTheme } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#29adef',
        },
    },
    shape: {
        borderRadius: 10,
    },
});

export default darkTheme;