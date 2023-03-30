import { Box, Button, Container, createTheme, CssBaseline, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import { commonClasses } from "../Util/CommonClasses";
import GameService, { GameEvents, JoinResult } from "../../Services/GameService";
import { useNavigate, useParams } from "react-router-dom";
import Lobby from "./Lobby/Lobby";
import { useEffect, useState } from "react";

export default function JoinGame() {
    const [gameJoined, setGameJoined] = useState<Boolean>(false);
    const [joinGameLoading, setJoinGameLoading] = useState<Boolean>(false);
    const [gameId, setGameId] = useState<string>("");
    const [joinFailed, setJoinFailed] = useState<Boolean>(false);
    
    const gameService = GameService.getInstance();
    const classes = commonClasses();
    const { joinCode } = useParams();

    if (joinFailed) {
        return (<h2>Failed to join game: {gameId}</h2>)
    }

    if (gameJoined) {
        return (<Lobby gameID={gameId} isAdmin={false}></Lobby>)
    }

    const tryToJoinGame = (joinGameId: string) => {
        setJoinGameLoading(true);
        setGameId(joinGameId);
        gameService.requestJoinGame(joinGameId)
            .then((result: JoinResult) => {
                if (result.success) {
                    console.log("Joined game successfully");
                    setGameJoined(true);
                    setJoinGameLoading(false);
                }
                else {
                    console.log(result.failReason);
                    setJoinFailed(true);
                }
            })
            .catch(e => console.log(e));
    }

    const joinLobby = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let joinGameId: string = data.get('joinID') ? data.get('joinID')?.toString()! : "";
        tryToJoinGame(joinGameId);
    };

    if (joinCode && !joinGameLoading) {
        tryToJoinGame(joinCode);
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

