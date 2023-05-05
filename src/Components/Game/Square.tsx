import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { PieceImageAdapter } from "../../IMG/PieceImageAdapter";
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from "@material-ui/core";

/**
 * MUI styles provider
 */
export const useStyles = makeStyles<Theme>(theme => ({
    SquareContainer: {
        width: "auto",
        height: "auto",
        position: "relative",
        backgroundColor: "black",
    },
    Black: {
        backgroundColor: "#717A90",
        color: "white",
    },
    BlackActive: {
        backgroundColor: "#6FAF82"
    },
    White: {
        backgroundColor: "white",
        color: "black",
    },
    WhiteActive: {
        backgroundColor: "#C4FEC4",
    },

    Square: {
        fontSize: "calc(4px + 0.7vw)",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "absolute",
        bottom: "0",
    },
    Icon: {
        userDrag: "none",
        webkitUserDrag: "none",
        userSelect: "none",
        mozUserSelect: "none",
        webkitUserSelect: "none",
        msUserSelect: "none",
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        padding: ".5vw",
    },
    WhitePiece: {
        filter: "contrast(.7) brightness(1.2)",
    },
    BlackPiece: {
        filter: "sepia(2) saturate(1) hue-rotate(200deg) brightness(.2)",
    },
    CommonPiece: {
        filter: "invert(19%) sepia(40%) saturate(590%) hue-rotate(5deg) brightness(100%) contrast(84%)"
    },
    Label: {
        position: "absolute",
        bottom: "0",
        left: "0",
        boxSizing: "border-box",
        margin: "0",
        marginBlockStart: "0",
        marginBlockEnd: "0",
    },
}));

/**
 * 
 * @param props includes boolean for color, id of the piece, coordinate (position, i.e. e4), clickfunction and reference to list of active squares
 * @returns 
 */
export default function Square(props: { isWhite: boolean, id: string, coordinate: string, clickFunction: any, active: any }) {

    const classes = useStyles();
    /**
     * useState to activate square
     */
    const [activated, setActivated] = useState(false);

    /**
     * sets props to corresponding constant
     */
    const {
        isWhite,
        id,
        coordinate,
        clickFunction,
        active,
    } = props;

    /**
     * Checks if the label of position should be visible, only bottom and left squares have active label (from whites perspective)
     * 
     * @param coordinate 
     * @returns label string
     */
    const labelVisibility = (coordinate: string) => {
        if (coordinate[0] === "a") return coordinate;
        if (coordinate[1] === "1" && coordinate.length === 2) return coordinate;
        return "";
    }

    /**
     * Changes state of the square if active is changed in the gameboard
     */
    useEffect(() => {
        if (active[0] === coordinate) {
            setActivated(true);
        }
        else if (active[1].includes(coordinate)) {
            setActivated(true);
        }
        else {
            setActivated(false);
        }

    }, [active]);


    /**
     * Returns HTML
     */
    if (isWhite) {
        return (
            <Box className={`${classes.SquareContainer} ${activated ? classes.WhiteActive : classes.White}`} onClick={() => clickFunction("")}>
                <Box className={classes.Square}>
                    {id !== "--" ? <img src={PieceImageAdapter.getImageRef(id)}
                        alt={id}
                        className={`${classes.Icon} ${id == id.toLowerCase() ? classes.BlackPiece : classes.WhitePiece}`}
                    /> : null}
                    <p className={classes.Label}>{labelVisibility(coordinate)}</p>
                </Box>
            </Box>
        );
    }
    else {
        return (
            <Box className={`${classes.SquareContainer} ${activated ? classes.BlackActive : classes.Black}`} onClick={() => clickFunction("")}>
                <Box className={classes.Square}>
                    {id !== "--" ? <img
                        src={PieceImageAdapter.getImageRef(id)}
                        alt={id}
                        className={`${classes.Icon} ${id == id.toLowerCase() ? classes.BlackPiece : classes.WhitePiece}`}
                    /> : null}
                    <p className={classes.Label}>{labelVisibility(coordinate)}</p>
                </Box>
            </Box>
        );
    }

}

