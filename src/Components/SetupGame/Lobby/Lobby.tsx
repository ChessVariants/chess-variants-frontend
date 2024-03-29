import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { commonClasses } from "../../Util/CommonClasses";
import GameService, { Colors, GameEvents } from "../../../Services/GameService";
import LobbyPlayers from "./LobbyPlayers";
import LobbyVariantInfo from "./LobbyVariantInfo";
import LobbyJoinInfo from "./LobbyJoinInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CookieService, { Cookie } from "../../../Services/CookieService";

export default function Lobby(props: { gameID: string, isAdmin: boolean }) {
    /**
     * Used to navigate to other pages
     */
    const navigate = useNavigate();
    const navigatePage = (link: string, color: string, players: string[]) => {
        navigate(link, {
            state: {
                color: color,
                players: players,
            }
        });
    }
    const username: string = CookieService.getInstance().get(Cookie.Username);
    const [lobbyFull, setLobbyFull] = useState<boolean>(false);

    const gameService = GameService.getInstance();
    const { gameID, isAdmin } = props;
    const classes = commonClasses();
    console.log(gameID)
    useEffect(() => {
        gameService.on(GameEvents.GameStarted, (colors: Colors) => {
            console.log(colors);
            let color = colors.white === username ? "white" : "black"
            let opponent: string = colors.white === username ? colors.black + "" : colors.white + ""
            console.log("Game Started");
            navigatePage("/match/" + gameID, color, [username, opponent]);
        })

        gameService.on(GameEvents.PlayerJoinedGame, (_: string, name: string) => {
            if (name != username) {
                setLobbyFull(true)
            }
        })

        gameService.on(GameEvents.PlayerLeftGame, (name: string) => {
            if (name != username) {
                setLobbyFull(false)
            }
        })

    }, [])

    return (
        <Paper className={classes.CenteredBasicCard} sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ letterSpacing: '4px', mb: 2, mt: 1 }}>LOBBY</Typography>
            <Divider style={{ width: '100%' }}></Divider>
            <Grid container marginTop="12px" alignItems="center" justifyItems={"center"} justifyContent="center">
                <Grid item sm={12} md={isAdmin ? 6 : 12} marginTop="14px">
                    <LobbyVariantInfo gameID={gameID}></LobbyVariantInfo>
                </Grid>
                <Grid item sm={12} md={isAdmin ? 6 : 12} marginTop="14px">
                    <LobbyPlayers gameID={gameID} isAdmin={isAdmin}></LobbyPlayers>
                    {isAdmin ? <LobbyJoinInfo gameID={gameID}></LobbyJoinInfo> : null}
                </Grid>

            </Grid>
            <AddAIButton isAdmin={isAdmin} available={!lobbyFull} gameService={gameService} gameId={gameID}></AddAIButton>
            {isAdmin ? <Button
                color={"createColor"}
                onClick={() => {
                    gameService.sendStartGame(gameID)
                }}
                type="submit"
                variant="contained"
                disabled={!lobbyFull}
                sx={{ mt: 3, mb: 1, p: 2, width: "80%" }}
            >
                START MATCH
            </Button> : <Button
                type="submit"
                variant="contained"
                disabled
                sx={{ mt: 3, mb: 1, p: 2, width: "80%" }}
            >
                WAITING FOR PARTY LEADER
            </Button>}
        </Paper>
    );
}

function AddAIButton(props: { isAdmin: boolean, available: boolean, gameService: GameService, gameId: string }) {
    if (props.isAdmin && props.available) {
        return (
            <Button
                color={"browserColor"}
                onClick={() => props.gameService.sendAddAI(props.gameId)}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 1, p: 2, width: "80%" }}
            >
                ADD AI
            </Button>
        )
    }
    return <></>
}

