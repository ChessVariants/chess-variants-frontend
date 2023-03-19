import { CssBaseline, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import GameService from "../../Services/GameService";


export default function Lobby(props: { gameService: GameService, gameID: string }) {

    return (
        <ThemeProvider theme={CustomDarkTheme}>
            <CssBaseline />
            <Typography sx={{ letterSpacing: '2px', mb: 1 }}>Variant Informatio Informatio</Typography>
            <Typography sx={{ letterSpacing: '2px', mb: 1 }}>Variant Informatio Informatio</Typography>
            <Typography sx={{ letterSpacing: '2px', mb: 1 }}>Variant Informatio Informatio</Typography>
            <Typography sx={{ letterSpacing: '2px', mb: 1 }}>Variant Informatio Informatio</Typography>
        </ThemeProvider>
    );

}

