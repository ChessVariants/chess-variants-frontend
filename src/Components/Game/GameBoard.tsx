import { Box } from "@mui/system";
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from "@material-ui/core";
import Square from "./Square";
import { useState } from "react";
import GameService, { GameEvents } from "../../Services/GameService";

/**
 * Interface of properties that the userStyles requires to dynamically set different css properties
 */
interface StyleProps {
    rows: string;
    cols: string;
    height: string;
    heightSmall: string
    width: string;
    widthSmall: string;
}

/**
 * MUI styles
 */
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
        gridTemplateRows: (({ rows }) => rows),
        gridTemplateColumns: (({ cols }) => cols),
        height: (({ height }) => height),
        width: (({ width }) => width),
        backgroundColor: "blue",
        [theme.breakpoints.down('xs')]: {
            height: (({ heightSmall }) => heightSmall),
            width: (({ widthSmall }) => widthSmall),
        },
    },
}));
type State = {
    boardSize: { row: number, col: number };
    board: string[];
    sideToMove: string;
    moves: { from: string; to: string }[];
};
const initialState: State = {
    boardSize: { row: 8, col: 8 },
    board: [],
    sideToMove: "",
    moves: [],
};
/**
 * The GameBoard componenet
 * 
 * @returns HTML
 */
export default function GameBoard(props: { gameService: GameService }) {


    /**
     * An array of active squares (highlighted by green color)
     * The first element is the active square that the user clicks on
     * The second is an array of active squares that the user can afterwards click on
     */
    const [active, setActive] = useState(["", [""]]);

    const [gameState, setGameState] = useState<State>(initialState);

    /**
     * Various variables, this part will see an overhaul with the intergration of the service and router
     */
    let isWhite = true;
    const columnCoordinate = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "Y", "Z"];


    /**
     * gameservice
     */
    const { gameService } = props;

    gameService.on(GameEvents.UpdatedGameState, (json: string) => {
        setGameState(JSON.parse(json));
    })

    gameService.on(GameEvents.GameJoined, (color: string) => {
        if (color === "white") {
            isWhite = true;
        }
        else {
            isWhite = false;
        }
    })
    /**
     * Changes the positions data (string) to an array to be able to iterate over the positions
     * Will reverse if the other player is black
     */
    let tempPositions = gameState.board;
    let pieces: string[] = [];

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
    if (!isWhite) pieces.reverse();

    /**
     * CSS properties that should be set on dynamically in shape of StyleProps interface
     */
    const style = {
        rows: "repeat(" + gameState.boardSize.row + ", auto)",
        cols: "repeat(" + gameState.boardSize.col + ", auto)",
        height: (gameState.boardSize.row >= gameState.boardSize.col ? "38vw" : (gameState.boardSize.row / gameState.boardSize.col) * 38 + "vw"),
        heightSmall: (gameState.boardSize.row >= gameState.boardSize.col ? "56vw" : (gameState.boardSize.row / gameState.boardSize.col) * 56 + "vw"),
        width: (gameState.boardSize.row >= gameState.boardSize.col ? (gameState.boardSize.col / gameState.boardSize.row) * 38 + "vw" : "38vw"),
        widthSmall: (gameState.boardSize.row >= gameState.boardSize.col ? (gameState.boardSize.col / gameState.boardSize.row) * 56 + "vw" : "56vw"),
    };
    const classes = useStyles(style);

    /**
     * Calculates which color the square should be based on the position, first white, then black, etc.
     * 
     * @param index of the position list
     * @returns a boolean where represents true white
     */
    const squareColor = (index: number) => {
        if (!isWhite) index = pieces.length - 1 - index;
        if (gameState.boardSize.col % 2) {
            if ((index + 1) % 2) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if ((index + 1 + (Math.trunc(index / gameState.boardSize.col) % 2)) % 2) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    /**
     * Takes a square and returns the corresponding coordinate
     * The first square would return "a1"
     * 
     * @param index of the position list
     * @returns coordinate
     */
    const squareCoordinate = (index: number) => {
        let index2 = index;
        if (!isWhite) index = pieces.length - 1 - index;
        if (isWhite) index2 = pieces.length - 1 - index;
        let coordinate = columnCoordinate[(index % gameState.boardSize.col)] + (Math.trunc(index2 / gameState.boardSize.col) + 1);

        return coordinate;
    }

    /**
     * Gets all the valid moves for the selected square
     * 
     * @param coordinate 
     * @returns an array of valid positions that can be clicked
     */
    const getValidMoves = (coordinate: string) => {
        // hitta from === coordinate i JSON
        const moves = gameState.moves.filter((item) => item.from === coordinate);
        return moves[0] ? moves[0].to : [];
    }

    /**
     * ClickFunction is called when a square is clicked
     * 
     * @param coordinate 
     */
    const clickFunction = (coordinate: string) => {
        if (isWhite === (gameState.sideToMove === "white" ? true : false)) {
            if (active[0] !== "" && active[1].includes(coordinate)) {
                console.log(active[0] + " -> " + coordinate);
                setActive(["", []]);
                gameService.sendMove(active[0] + coordinate, "GAMEID");
            }
            else {
                if (coordinate === active[0]) {
                    setActive(["", []]);
                }
                else {
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
                            clickFunction(squareCoordinate(i))} />
                    ))
                }
            </Box>
        </Box>
    );
}
