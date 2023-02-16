import { Box } from "@mui/system";
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from "@material-ui/core";
import Square from "./Square";

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
  }));
 
export default function GameBoard() {
    
    const yourTurn = 1; // 0,1 false, true
    const home = false; // true, false, white, black

    const row = 4;
    const col = 8;

    const columnCoordinate = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R","S", "T", "U", "V", "W", "X", "Y", "Z"];  

    // dummy data, to be replaced by info from backend
    let dummyPositions = "ab4,em4,em8,em2,ab,em,ab4,ab1,em7";

    let tempPositions = dummyPositions.split(",");
    let pieces : string[] = [];

    for (let index = 0; index < tempPositions.length; index++) {
        let amount = Number(tempPositions[index].replace(/\D/g, ""));
        if (amount >= 1) {
            for (let j = 0; j < amount; j++) {
                pieces.push(tempPositions[index][0] + tempPositions[index][1]);
            }
        }
        else {
            pieces.push(tempPositions[index]);
        }
    }
    if (!home) pieces.reverse();


    const style = {
        rows : "repeat("+ row + ", auto)", 
        cols : "repeat(" + col + ", auto)", 
        height: (row >= col ? "32vw" : (row/col)*32 + "vw"), 
        width: (row >= col ? (col/row)*32 + "vw" : "32vw"),
    };
    const classes = useStyles(style);

    const squareColor = (index : number) => {
        if (!home) index = pieces.length-1 - index;
        if (col % 2) {
            if ((index) % 2) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if ((index + (Math.trunc(index/col) % 2)) % 2) {
                return true;
            }
            else {
                return false;
            }
        }
    } 
    const squareCoordinate = (index : number) => {
        let index2 = index;
        if (!home) index = pieces.length-1 - index;
        if (home) index2 = pieces.length-1 - index;
        let coordinate = columnCoordinate[(index % col)] + (Math.trunc(index2/col)+1);
        
        return coordinate;
    }

    return (
        <Box className={classes.Container}>
            <Box className={classes.Board}>
                {
                    pieces.map((piece, i) => (
                        <Square isWhite={squareColor(i)} id={piece} coordinate={squareCoordinate(i)}/>
                    ))
                }
            </Box>
        </Box>
    );
}
  