import { Button, CssBaseline, InputAdornment, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import GameService from "../../Services/GameService";


export default function Lobby(props: { gameService: GameService, gameID: string }) {
    const { gameService, gameID } = props;
    return (
        <ThemeProvider theme={CustomDarkTheme}>
            <CssBaseline />
            <TextField
                sx={{
                    width: "100%", maxWidth: '200px', marginTop: '10px',
                    webkitUserSelect: 'all',
                    mozUserSelect: 'all', /* Firefox */
                    msUserSelect: 'all', /* IE10+/Edge */
                    userSelect: 'all', /* Standard */
                    color: CustomDarkTheme.palette.primary.light,
                }}
                defaultValue={gameID}
                required
                id="outlined-required"
                InputProps={{
                    disabled: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button onClick={() => {
                                console.log(gameID);
                                navigator.clipboard.writeText(gameID);
                            }}>COPY URL</Button>
                        </InputAdornment>
                    ),
                }}
            />
        </ThemeProvider>
    );

}

