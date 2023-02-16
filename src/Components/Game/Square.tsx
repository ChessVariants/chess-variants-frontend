import React from "react";
import { Box } from "@mui/system";
import { PieceImageAdapter } from "../../IMG/PieceImageAdapter";
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from "@material-ui/core";

interface StyleProps {
    image: string;
}

const useStyles = makeStyles<Theme>(theme => ({

    SquareContainer: {
        width: "auto",
        height: "auto",
        position: "relative",
        backgroundColor: "black",
    },
    Black: {
        backgroundColor: "black",
        color: "white",
    },
    White: {
        backgroundColor: "white",
    },
    Square: {
        fontSize: "1vw",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "absolute",
        bottom: "0",
    },
    Icon: {
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        padding: "1vw",
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
 
export default function Square(props: {isWhite : boolean, id : string, coordinate : string}) {
 
    const classes = useStyles();
    
    const {
        isWhite,
        id,
        coordinate,
    } = props;

    const labelVisibility = (coordinate : string) => {
        if (coordinate[0] === "A") return coordinate;
        if (coordinate[1] === "1" && coordinate.length === 2) return coordinate;
        return "";
    }

    return (
        <Box className={`${classes.SquareContainer} ${isWhite ? classes.White : classes.Black}`}>
            <Box className={classes.Square}>
            {id!=="em" ? <img src={PieceImageAdapter.getImageRef(id)} alt={id} className={classes.Icon}/> : null}
                <p className={classes.Label}>{labelVisibility(coordinate)}</p>
            </Box>
        </Box>
    );
}

  