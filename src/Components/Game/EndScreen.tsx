import { Container, Dialog, Grid, hexToRgb, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from "@mui/icons-material/Close";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import { Result } from "./MatchPage";
import { Transition } from "../Util/SlideTransition";

export default function EndScreen(props: { players: string[], result: Result }) {

    const { players, result } = props;
    /**
     * MUI styles provider
    */
    const useStyles = makeStyles(() => ({
        winBackground: {
            '& .MuiDialog-paper': {
                background: "linear-gradient(45deg, " + hexToRgb(CustomDarkTheme.palette.primary.main) + "50%, " + CustomDarkTheme.palette.primary.dark + "50%)",
            },
        },
        lossBackground: {
            '& .MuiDialog-paper': {
                background: "linear-gradient(45deg, " + hexToRgb(CustomDarkTheme.palette.secondary.main) + "50%, " + CustomDarkTheme.palette.secondary.dark + "50%)",
            },
        },
        drawBackground: {
            '& .MuiDialog-paper': {
                background: "linear-gradient(45deg, " + hexToRgb(CustomDarkTheme.palette.primary.main) + "50%, " + hexToRgb(CustomDarkTheme.palette.secondary.main) + "50%)",
            },
        }
    }));

    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <Dialog TransitionComponent={Transition} open={true} className={result === Result.win ? classes.winBackground : result === Result.loss ? classes.lossBackground : result === Result.winBySurrender ? classes.winBackground : result === Result.lossBySurrender ? classes.lossBackground : classes.drawBackground}>
            <IconButton
                aria-label="close"
                onClick={() => { navigate("/") }}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: CustomDarkTheme.palette.text.primary
                }}
            >
                <CloseIcon />
            </IconButton>

            <Container sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight='bold' sx={{ mb: 2 }}>{result}</Typography>
                <Grid container sx={{ mb: 4 }}>
                    <Grid item xs={5}>
                        <Typography>{players[0]}</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ margin: "auto" }}>
                        <Typography sx={{ margin: "auto" }}>vs</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>{players[1]}</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    );
}

