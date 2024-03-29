import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CustomDarkTheme from "../../Util/CustomDarkTheme";
import GameService, { GameEvents, Colors } from "../../../Services/GameService";
import { useEffect, useState } from "react";
import whiteCircle from '../../../IMG/whiteCircle.svg'
import blackCircle from '../../../IMG/blackCircle.svg'


const useStyles = makeStyles<Theme>(theme => ({
    SwitchButton: {
        cursor: 'pointer',
        color: CustomDarkTheme.palette.createColor.main,
        '&:hover': {
            color: CustomDarkTheme.palette.createColor.dark,
        },
        webkitUserSelect: 'none',
        mozUserSelect: 'none', /* Firefox */
        msUserSelect: 'none', /* IE10+/Edge */
        userSelect: 'none', /* Standard */
    },
    SwitchButtonDisabled: {
        cursor: 'pointer',
        color: CustomDarkTheme.palette.text.disabled,
        webkitUserSelect: 'none',
        mozUserSelect: 'none', /* Firefox */
        msUserSelect: 'none', /* IE10+/Edge */
        userSelect: 'none', /* Standard */
    },
    GridContainer: {
        marginLeft: "auto",
        marginRight: "auto",
    },
}));
export default function LobbyPlayers(props: { gameID: string, isAdmin: boolean }) {
    const gameService = GameService.getInstance();
    const { gameID, isAdmin } = props;

    const [whitePlayer, setWhitePlayer] = useState("");
    const [blackPlayer, setBlackPlayer] = useState("");

    useEffect(() => {
        gameService.requestColors(gameID)
            .then((colors: Colors) => {
                setWhitePlayer(colors.white ? colors.white : "Waiting...");
                setBlackPlayer(colors.black ? colors.black : "Waiting...");
            })

        gameService.on(GameEvents.PlayerJoinedGame, (color: string, name: string) => {
            if (color === "white") {
                setWhitePlayer(name);
            }
            else if (color === "black") {
                setBlackPlayer(name);
            }
        })

        gameService.on(GameEvents.Colors, (colors: Colors) => {
            setWhitePlayer(colors.white ? colors.white : "Waiting...");
            setBlackPlayer(colors.black ? colors.black : "Waiting...");
        })
    }, [])

    const switchColors = () => {
        gameService.sendSwapColors(gameID);
    }

    const classes = useStyles();
    return (
        <Grid container className={classes.GridContainer} maxWidth="200px">
            <Grid item width="80%">
                <Grid container style={{ textAlign: 'left' }}>
                    <Grid item xs={2}>
                        <img
                            src={whiteCircle}
                            alt={"white"}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        {whitePlayer === "Waiting..." ?
                            <Typography fontStyle={"italic"} color={CustomDarkTheme.palette.text.secondary}>{whitePlayer}</Typography> : <Typography>{whitePlayer}</Typography>
                        }

                    </Grid>
                    <Grid item xs={2}>
                        <img
                            src={blackCircle}
                            alt={"black"}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        {blackPlayer === "Waiting..." ?
                            <Typography fontStyle={"italic"} color={CustomDarkTheme.palette.text.secondary}>{blackPlayer}</Typography> : <Typography>{blackPlayer}</Typography>}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item width="20%" sx={{ margin: "auto" }}>
                <Tooltip title={isAdmin ? "" : "Only party leader can swap colors!"}>
                    <Box className={isAdmin ? classes.SwitchButton : classes.SwitchButtonDisabled} onClick={isAdmin ? () => {
                        switchColors();
                    } : () => { }}>
                        <p>&#11014;&#11015;</p>
                    </Box>
                </Tooltip>
            </Grid>
        </Grid>
    );
}

