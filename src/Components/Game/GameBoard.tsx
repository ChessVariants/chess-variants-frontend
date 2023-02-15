import { Box } from "@mui/system";
import React from "react";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

interface StyleProps {
    rows: string;
    cols: string;
    height: string;
    width: string;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    Container: {
        alignContent: "center",

    },
    Board: {
        borderStyle: "solid",
        borderColor: "red",
        borderWidth: "5px",
        margin: "0 auto",
        display: "grid",
        gridTemplateRows: (({rows}) => rows),
        gridTemplateColumns: (({cols}) => cols),
        height: (({height}) => height),
        width: (({width}) => width),
        backgroundColor: "blue",
    },
    SquareContainer: {
        width: "auto",
        height: "auto",
        position: "relative",
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
        position: "absolute",
        bottom: "-1vw",
    }
  }));
 
export default function GameBoard(props: {row : number, col : number}) {
    const {
        row,
        col,
    } = props;

    const style = {
        rows : "repeat("+ row + ", auto)", 
        cols : "repeat(" + col + ", auto)", 
        height: (row >= col ? "32vw" : (row/col)*32 + "vw"), 
        width: (row >= col ? (col/row)*32 + "vw" : "32vw"),
    };
    const classes = useStyles(style);

    const board = [];
    let key = 0;
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            if(col % 2) {
                if ((key) % 2) {
                    board.push(
                    <Box className={`${classes.SquareContainer} ${classes.Black}`} key={key}>
                        <Box className={classes.Square}>
                            <p>b</p>
                        </Box>
                    </Box>);
                }
                else {
                    board.push(
                    <Box className={`${classes.SquareContainer} ${classes.White}`} key={key}>
                        <Box className={classes.Square}>
                            <p>w</p>
                        </Box>
                    </Box>);
                }
            }
            else {
                if ((key+ r) % 2) {
                    board.push(
                    <Box className={`${classes.Black} ${classes.SquareContainer}`} key={key}>
                        <Box className={classes.Square}>
                            <p>b</p>
                        </Box>
                    </Box>);
                }
                else {
                    board.push(
                    <Box className={`${classes.SquareContainer} ${classes.White}`} key={key}>
                        <Box className={classes.Square}>
                            <p>w</p>
                        </Box>
                    </Box>);
                }
            }
            key++;
        }
    }

    return (
        <Box className={classes.Container}>
            <Box className={classes.Board}>{board}</Box>
        </Box>
    );
}
  