import { Box } from "@mui/system";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles : any = makeStyles(() => ({
    Board: {
        display: "grid",
        gridTemplateRows: "repeat(8, 50px)",
        gridTemplateColumns: "repeat(8, 50px)",
        width: "40%",
        height: "",
        backgroundColor: "blue",
    },
    SquareBlack: {
        width: "50px",
        height: "50px",
        backgroundColor: "black",
    },
    SquareWhite: {
        width: "50px",
        height: "50px",
        backgroundColor: "white",
    }
  }));

export default function GameBoard(props: {row : number, col : number}) {
    const {
        row,
        col
    } = props;
    const classes = useStyles();

    const board = [];

    let key = 0;
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            if ((key+r) % 2) {
                board.push(<Box className={classes.SquareBlack} key={key}></Box>);
            }
            else {
                board.push(<Box className={classes.SquareWhite} key={key}></Box>);
            }
            key++;
        }
    }
    return (
        <Box className={classes.Board}>{board}</Box>
    );
}
  