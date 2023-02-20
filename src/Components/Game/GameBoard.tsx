import { Box } from "@mui/system";
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from "@material-ui/core";
import Square from "./Square";
import { useState } from "react";

interface StyleProps {
    rows: string;
    cols: string;
    height: string;
    heightSmall: string
    width: string;
    widthSmall: string;
}
const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    Container: {
        verticalAlign: "top",
        display: "inline-block",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    Board: {
        borderStyle: "solid",
        borderColor: "#2C2D2F",
        borderWidth: "15px",
        margin: "0",
        display: "grid",
        gridTemplateRows: (({rows}) => rows),
        gridTemplateColumns: (({cols}) => cols),
        height: (({height}) => height),
        width: (({width}) => width),
        backgroundColor: "blue",
        [theme.breakpoints.down('xs')]: {
            height: (({heightSmall}) => heightSmall),
            width: (({widthSmall}) => widthSmall),
          },
    },
  }));

export default function GameBoard() {

    const [active, setActive] = useState(["", [""]]);
    
    const yourTurn = true; 
    const home = true; // true, false, white, black

    const row = 5;
    const col = 8;

    const columnCoordinate = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R","S", "T", "U", "V", "W", "X", "Y", "Z"];  
    //const validMoves;

    // dummy data, to be replaced by info from backend
    let dummyPositions = "ab8,em8,ab8,em8,ab8";
    let dummyValidMoves : ({from: string; to: string[];}[]) =
    [
        {
         from: "E4",
         to: ["E1","E2"]
        }, 
        {
         from: "F1",
         to: ["F5","H3"]
        },
     ];

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
        height: (row >= col ? "38vw" : (row/col)*38 + "vw"), 
        heightSmall: (row >= col ? "56vw" : (row/col)*56 + "vw"), 
        width: (row >= col ? (col/row)*38 + "vw" : "38vw"),
        widthSmall: (row >= col ? (col/row)*56 + "vw" : "56vw"),
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
    const getValidMoves = (coordinate : string) => {
        // hitta from === coordinate i JSON
        const moves = dummyValidMoves.filter((item) => item.from === coordinate);
        return moves[0] ? moves[0].to : [];
    }

    const clickFunction = (coordinate : string) => {
        if (yourTurn === true) {
            if (active[0] !== "" && active[1].includes(coordinate)) {
                console.log(active[0] + " -> " + coordinate);
                setActive(["", []]);
                // Skicka drag till server
            }
            else {
                if (coordinate === active[0]) {
                    setActive(["", []]);
                }
                else {
                    //if (getValidMoves(coordinate)) 
                    if (getValidMoves(coordinate).length > 0) {
                        setActive([coordinate, getValidMoves(coordinate)]);
                    }
                    else {
                        setActive(["", []]);
                    }
                }
            }
        }
        else {
            // visa att man inte få dra på något vis
        }
        
    }

    return (
        <Box className={classes.Container}>
            <Box className={classes.Board}>
                {
                    pieces.map((piece, i) => (
                        <Square isWhite={squareColor(i)} id={piece} active={active} coordinate={squareCoordinate(i)} key={squareCoordinate(i)} clickFunction={() => 
                        clickFunction(squareCoordinate(i))}/>
                    ))
                }
            </Box>
        </Box>
    );
}
  