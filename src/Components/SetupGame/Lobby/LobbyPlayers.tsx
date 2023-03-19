import { Box, Button, Container, CssBaseline, Divider, Grid, Icon, Paper, Typography } from "@mui/material";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { ClassNames, ThemeProvider } from "@emotion/react";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import GameService from "../../Services/GameService";
import { classicNameResolver } from "typescript";


const useStyles = makeStyles<Theme>(theme => ({
    SwitchButton: {
        cursor: 'pointer',
        color: CustomDarkTheme.palette.primary.main,
        '&:hover': {
            color: CustomDarkTheme.palette.primary.dark,
        },
        webkitUserSelect: 'none',
        mozUserSelect: 'none', /* Firefox */
        msUserSelect: 'none', /* IE10+/Edge */
        userSelect: 'none', /* Standard */
    },
    GridContainer: {
        marginLeft: "auto",
        marginRight: "auto",
    }

}));
export default function LobbyPlayers(props: { gameService: GameService, gameID: string }) {
    const { gameService, gameID } = props;

    const switchColors = () => {
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
                            <Typography>O</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography>You</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>O</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography>Opponent</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item width="20%">
                    <Box className={classes.SwitchButton} onClick={() => {
                        switchColors();
                    }}>
                        <p>&#11014;&#11015;</p>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}

