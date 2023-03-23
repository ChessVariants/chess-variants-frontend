import { Box, Button, Container, createTheme, CssBaseline, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import { commonClasses } from "../Util/CommonClasses";
import GameService from "../../Services/GameService";
import { useParams } from "react-router-dom";
import Lobby from "./Lobby/Lobby";

export default function JoinGame() {

    const gameService = GameService.getInstance();
    const classes = commonClasses();
    const { joinCode } = useParams();

    const joinLobby = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            variantID: data.get('joinID'),
        });
    };

    if (joinCode) {
        console.log(joinCode + "")
        gameService.joinGame(joinCode + "");
        // check if success, then join, otherwise error:

        return (<Lobby gameID={joinCode + ""} isAdmin={false}></Lobby>)
    }

    else {
        return (
            <ThemeProvider theme={CustomDarkTheme}>
                <CssBaseline />
                <Container maxWidth="xs" >
                    <Paper className={classes.CenteredBasicCard}>
                        <Box component="form" onSubmit={joinLobby} noValidate sx={{ mt: 2 }}>
                            <Typography sx={{ letterSpacing: '2px', mb: 1 }}>ENTER JOIN CODE</Typography>
                            <TextField
                                color={"joinColor"}
                                margin="normal"
                                required
                                fullWidth
                                id="joinID"
                                name="Enter join code"
                                autoComplete="joinID"
                                autoFocus
                            />
                            <Button
                                color={"joinColor"}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 1, p: 1 }}
                            >
                                JOIN GAME
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
        );
    }
}

