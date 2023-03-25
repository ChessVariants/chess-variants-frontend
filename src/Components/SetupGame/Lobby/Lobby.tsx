import { Box, Button, CssBaseline, Divider, Grid, Paper, Typography } from "@mui/material";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@emotion/react";
import CustomDarkTheme from "../../Util/CustomDarkTheme";
import { commonClasses } from "../../Util/CommonClasses";
import GameService, { Colors, GameEvents } from "../../../Services/GameService";
import LobbyPlayers from "./LobbyPlayers";
import LobbyVariantInfo from "./LobbyVariantInfo";
import LobbyJoinInfo from "./LobbyJoinInfo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Lobby(props: { gameID: string, isAdmin: boolean }) {
    /**
     * Used to navigate to other pages
     */
    const navigate = useNavigate();
    const navigatePage = (link: string, color: string) => {
        navigate(link, {
            state: {
                color: color,
            }
        });
    }
    const username: string = new Cookies().get('username');

    const gameService = GameService.getInstance();
    const { gameID, isAdmin } = props;
    const classes = commonClasses();

    useEffect(() => {
        gameService.on(GameEvents.GameStarted, (colors: Colors) => {
            console.log(colors);
            let color = colors.white === username ? "white" : "black"
            console.log("Game Started");
            navigatePage("/match/" + gameID, color);
        })
    }, [])

    return (
        <ThemeProvider theme={CustomDarkTheme}>
            <CssBaseline />
            <Paper className={classes.CenteredBasicCard}>
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
                {isAdmin ? <Button
                    color={"createColor"}
                    onClick={() => {
                        gameService.startGame(gameID)
                    }}
                    type="submit"
                    variant="contained"
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
        </ThemeProvider>
    );

}

