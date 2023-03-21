import { Box, CssBaseline, Grid, Tooltip, Typography } from "@mui/material";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@emotion/react";
import CustomDarkTheme from "../../Util/CustomDarkTheme";
import GameService from "../../../Services/GameService";
import { useState } from "react";


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

    const [whitePlayer, setWhitePlayer] = useState("You");
    const [blackPlayer, setBlackPlayer] = useState("Waiting...");

    const switchColors = () => {
        // Maybe create a get for service?
        setWhitePlayer("");
        setBlackPlayer("");
        gameService.swapColors(gameID);
    }

    const classes = useStyles();
    return (
        <ThemeProvider theme={CustomDarkTheme}>
            <CssBaseline />
            <Grid container className={classes.GridContainer} maxWidth="200px">
                <Grid item width="80%">
                    <Grid container style={{ textAlign: 'left' }}>
                        <Grid item xs={2}>
                            <Typography>W</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography>{whitePlayer}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>B</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            {blackPlayer === "Waiting..." ?
                                <Typography fontStyle={"italic"} color={CustomDarkTheme.palette.text.secondary}>{blackPlayer}</Typography> : <Typography>{blackPlayer}</Typography>}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item width="20%">
                    <Tooltip title={isAdmin ? "" : "Only party leader can swap colors!"}>
                        <Box className={isAdmin ? classes.SwitchButton : classes.SwitchButtonDisabled} onClick={isAdmin ? () => {
                            switchColors();
                        } : () => { }}>
                            <p>&#11014;&#11015;</p>
                        </Box>
                    </Tooltip>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}

