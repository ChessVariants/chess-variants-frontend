import { Box } from "@mui/material";
import GameService, { PromotionOptions } from "../../Services/GameService";
import Square, { useStyles } from "./Square";
import { PieceImageAdapter } from "../../IMG/PieceImageAdapter";
import { makeStyles, Theme } from "@material-ui/core";

export const usePromotionStyle = makeStyles<Theme>(theme => ({
    BlackSquare: {
        width: "40px",
        height: "40px",
        position: "relative",
        backgroundColor: "black",
        '&:hover': {
            background: "#4d4d4d",
            cursor: "pointer",
        },
    },
    WhiteSquare: {
        width: "40px",
        height: "40px",
        position: "relative",
        backgroundColor: "white",
        '&:hover': {
            background: "#bfbfbf",
            cursor: "pointer",
        },
    },
    Container: {
        display: "inline-block",
        marginLeft: "20px",
        width: "14vw",
        minWidth: "120px",
        height: "36vw",
        minHeight: "320px",
        margin: "0",
        [theme.breakpoints.down('xs')]: {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            minWidth: "200px",
            minHeight: "280px",
        },
    },

}));

export default function PromotionSelector(props: { options: PromotionOptions, gameId: string }) {
    const { options, gameId } = props;
    const squareClasses = usePromotionStyle();


    const choosePromotion = (pieceIdentifier: string) => {
        GameService.getInstance().sendPromotionChoice(gameId, pieceIdentifier);
    }

    return (
        <Box className={squareClasses.Container}>
            {
                options.promotablePieces.map((piece, i) => (<PromotionSquare id={piece.imagePath} key={i} clickFunction={() => choosePromotion(piece.identifier)} />))
            }
        </Box>
    );
}
function PromotionSquare(props: { id: string, clickFunction: any }) {
    const { id, clickFunction } = props;
    const classes = useStyles();
    const squareClasses = usePromotionStyle();

    return (
        <Box className={id === id.toLowerCase() ? squareClasses.WhiteSquare : squareClasses.BlackSquare} onClick={() => clickFunction()}>
            <Box className={classes.Square}>
                <img src={PieceImageAdapter.getImageRef(id)}
                    alt={id}
                    className={`${classes.Icon} ${id == id.toLowerCase() ? classes.BlackPiece : classes.WhitePiece}`}
                />
            </Box>
        </Box>
    );
}