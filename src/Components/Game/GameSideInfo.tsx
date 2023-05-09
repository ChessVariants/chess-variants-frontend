import { Paper, Button, Typography, Divider, Box } from "@mui/material";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import GameService, { GameEvents, GameState } from "../../Services/GameService";
import { useEffect, useState } from "react";
import { Result } from "./MatchPage";
import AcceptDialog from "../Util/AcceptDialog";


const useStyles = makeStyles<Theme>(theme => ({
    Container: {
        display: "inline-block",
        marginLeft: "20px",
        width: "14vw",
        minWidth: "140px",
        height: "22vw",
        minHeight: "260px",
        [theme.breakpoints.down('xs')]: {
            display: "block",
            marginTop: 20,
            marginLeft: "auto",
            marginRight: "auto",
            minWidth: "200px",
            minHeight: "200px",
        },
    },

}));

export default function SideInfo(props: { gameID: string, setGameResult: any }) {
    const classes = useStyles();
    const gameService = GameService.getInstance();
    const [sideToMove, setSideToMove] = useState('White');
    const { gameID, setGameResult } = props;
    const [open, setOpen] = useState(false);

    /**
     * gameService subscriptions which only registers once via useEffect
     */
    useEffect(() => {
        gameService.on(GameEvents.UpdatedGameState, (gameState: GameState) => {
            setSideToMove(gameState.sideToMove);
        })
    }, [])

    const surrender = () => {
        setOpen(false);
        gameService.sendLeaveGame(gameID);
        setGameResult(Result.lossBySurrender);
    }
    return (
        <Paper className={classes.Container} sx={{ padding: 2, position: 'relative' }}>
            <Typography sx={{ mb: 1, mt: 1 }} variant="body1">{(sideToMove + " to move").toUpperCase()}</Typography>
            <Box sx={{ padding: 2, position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="joinColor"
                    onClick={() => setOpen(true)}
                >RESIGN</Button>
            </Box>
            <AcceptDialog
                open={open}
                setOpen={setOpen}
                title="Resign the game"
                body="You are about to resign the game. Are you sure that you want to continue with this action?"
                clickFunction={surrender} />
        </Paper>
    );

}

