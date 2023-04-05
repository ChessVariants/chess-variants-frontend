import { createTheme } from "@mui/material";
import { cyan, deepOrange, green, orange } from "@mui/material/colors";
declare module "@mui/material/styles" {
    interface Palette {
        joinColor: Palette['primary'];
        createColor: Palette['primary'];
        browserColor: Palette['primary'];
        editorColor: Palette['primary'];
    }

    interface PaletteOptions {
        joinColor: PaletteOptions['primary'];
        createColor: PaletteOptions['primary'];
        browserColor: PaletteOptions['primary'];
        editorColor: PaletteOptions['primary'];
    }
}
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        joinColor: true;
        createColor: true;
        browserColor: true;
        editorColor: true;
    }
}
declare module "@mui/material/TextField" {
    interface TextFieldPropsColorOverrides {
        joinColor: true;
        createColor: true;
        browserColor: true;
        editorColor: true;
    }
}
const { palette } = createTheme();
const createColor = (mainColor: string) => palette.augmentColor({ color: { main: mainColor } });
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#29adef',
        },
        joinColor: createColor(cyan[500]),
        createColor: createColor(green[500]),
        browserColor: createColor(orange[400]),
        editorColor: createColor(deepOrange[400]),
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        // Name of the component
        MuiBackdrop: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    backgroundColor: "rgba(0,0,0,.2)"
                },
            },
        },
    },
}

);

export default darkTheme;