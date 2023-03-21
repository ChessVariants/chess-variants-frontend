import { createTheme } from "@mui/material";
import { amber, cyan, deepOrange, deepPurple, green, lightGreen, orange, purple, red } from "@mui/material/colors";
declare module "@mui/material/styles" {
    interface Palette {
        joinColor: Palette['primary'];
        createColor: Palette['primary'];
        editorColor: Palette['primary'];
    }

    interface PaletteOptions {
        joinColor: PaletteOptions['primary'];
        createColor: PaletteOptions['primary'];
        editorColor: PaletteOptions['primary'];
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        joinColor: true;
        createColor: true;
        editorColor: true;
    }
}
declare module "@mui/material/TextField" {
    interface TextFieldPropsColorOverrides {
        joinColor: true;
        createColor: true;
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
        createColor: createColor(lightGreen[500]),
        editorColor: createColor(deepOrange[400]),
    },
    shape: {
        borderRadius: 10,
    },
});

export default darkTheme;