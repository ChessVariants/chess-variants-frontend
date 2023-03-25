import { Box, Button, Container, createTheme, CssBaseline, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import { commonClasses } from "../Util/CommonClasses";
import GameService, { GameEvents } from "../../Services/GameService";
import { useNavigate, useParams } from "react-router-dom";
import Lobby from "./Lobby/Lobby";
import { useEffect, useState } from "react";

export default function JoinGame() {
    const [gameJoined, setGameJoined] = useState<Boolean>(false);
    const [joinGameLoading, setJoinGameLoading] = useState<Boolean>(false);
    const [gameId, setGameId] = useState<string>("");
    
    const gameService = GameService.getInstance();
    const classes = commonClasses();
    const { joinCode } = useParams();

    if (gameJoined) {
        return (<Lobby gameID={gameId} isAdmin={false}></Lobby>)
    }

    const joinLobby = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let code: string = data.get('joinID') ? data.get('joinID')?.toString()! : "";
        console.log({codeValue: code});
        setJoinGameLoading(true);

        gameService.joinGameAsync(code)
        .then((result) => {
            if (result) {
                console.log("Joined game successfully");
                setGameId(code);
                setGameJoined(true);
                setJoinGameLoading(false);
            }
            else {
                console.log("Error joining game");
                setJoinGameLoading(false);
            }
        });
    };

    if (joinCode && !joinGameLoading) {
        setJoinGameLoading(true)
        gameService.joinGameAsync(joinCode)
        .then((result) => {
            if (result) {
                console.log("Joined game successfully");
                setGameId(joinCode);
                setGameJoined(true);
                setJoinGameLoading(false);
            }
            else {
                console.log("Error joining game");
                setJoinGameLoading(false);
            }
        })
        .catch(e => console.log(e)
        );
    }

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
                            name="joinID"
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

