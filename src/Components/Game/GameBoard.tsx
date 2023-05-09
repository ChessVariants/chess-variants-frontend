import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Square from "./Square";
import { useEffect, useState } from "react";
import GameService, { GameEvents, GameState } from "../../Services/GameService";
import { useNavigate } from "react-router-dom";
import { Paper, Box } from "@mui/material";

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
        display: "inline-block"
    },
    Board: {
        padding: "20px",
        margin: "0",
        display: "grid",
        gridTemplateRows: (({ rows }) => rows),
        gridTemplateColumns: (({ cols }) => cols),
        height: (({ height }) => height),
        width: (({ width }) => width),
        [theme.breakpoints.down('xs')]: {
            height: (({ heightSmall }) => heightSmall),
            width: (({ widthSmall }) => widthSmall),
        },
    },
}));
const columnCoordinate = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "Y", "Z"];


const initialState: GameState = {
    boardSize: { rows: 8, cols: 8 },
    board: [],
    sideToMove: "",
    moves: [],
};
/**
 * The GameBoard componenet
 * 
 * @returns HTML
 */
export default function GameBoard(props: { gameID: string, color: string }) {

    const gameService: GameService = GameService.getInstance()
    /**
     * An array of active squares (highlighted by green color)
     * The first element is the active square that the user clicks on
     * The second is an array of active squares that the user can afterwards click on
     */
    const [active, setActive] = useState(["", [""]]);
    /**
     * Color of the user, either "white" or "black"
     */
    const [color, setColor] = useState(props.color ? props.color : "white");
    /**
     * GameState which includes boardsize, positions, side to move and valid moves.
     */
    const [gameState, setGameState] = useState<GameState>(initialState);

    /**
     * The GameBoard requires the GameService object as a prop
     */
    const { gameID } = props;
    const navigate = useNavigate();


    /**
     * gameService subscriptions which only registers once via useEffect
     */
    useEffect(() => {
        gameService.requestBoardState(gameID)
            .then((newGameState?: GameState) => {
                if (newGameState === null) {
                    console.log(newGameState);

                    console.log("navigate to unauthorized from gameboard");

                    navigate("/unauthorized")
                }
                setGameState(newGameState!);
            })

        gameService.on(GameEvents.UpdatedGameState, (newGameState: GameState) => {
            setGameState(newGameState);
        })

        gameService.on(GameEvents.Error, (errorMessage: string) => {
            alert(errorMessage);
        })
    }, [])


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
    if (!(color === "white")) pieces.reverse();

    /**
     * CSS properties that should be set on dynamically in shape of StyleProps interface
     */
    const style = {
        rows: "repeat(" + gameState.boardSize.rows + ", auto)",
        cols: "repeat(" + gameState.boardSize.cols + ", auto)",
        height: (gameState.boardSize.rows >= gameState.boardSize.cols ? "38vw" : (gameState.boardSize.rows / gameState.boardSize.cols) * 38 + "vw"),
        heightSmall: (gameState.boardSize.rows >= gameState.boardSize.cols ? "56vw" : (gameState.boardSize.rows / gameState.boardSize.cols) * 56 + "vw"),
        width: (gameState.boardSize.rows >= gameState.boardSize.cols ? (gameState.boardSize.cols / gameState.boardSize.rows) * 38 + "vw" : "38vw"),
        widthSmall: (gameState.boardSize.rows >= gameState.boardSize.cols ? (gameState.boardSize.cols / gameState.boardSize.rows) * 56 + "vw" : "56vw"),
    };
    const classes = useStyles(style);

    /**
     * Calculates which color the square should be based on the position, first white, then black, etc.
     * 
     * @param index of the position list
     * @returns a boolean where represents true white
     */
    const squareColor = (index: number) => {
        if (!(color === "white")) index = pieces.length - 1 - index;
        if (gameState.boardSize.cols % 2) {
            if ((index + 1) % 2) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if ((index + 1 + (Math.trunc(index / gameState.boardSize.cols) % 2)) % 2) {
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
        if (!(color === "white")) index = pieces.length - 1 - index;
        if (color === "white") index2 = pieces.length - 1 - index;
        let coordinate = columnCoordinate[(index % gameState.boardSize.cols)] + (Math.trunc(index2 / gameState.boardSize.cols) + 1);

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
        if (color === gameState.sideToMove) {
            if (active[0] !== "" && active[1].includes(coordinate)) {
                console.log(active[0] + coordinate);
                setActive(["", []]);
                gameService.sendMove(active[0] + coordinate, gameID);
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

    const shouldHighlight = (index: number) => {
        if (color === "black" && gameState.latestMoveFromIndex && gameState.latestMoveToIndex) {
            let boardSize = gameState.boardSize.rows * gameState.boardSize.cols
            let newFromIndex = boardSize - gameState.latestMoveFromIndex - 1;
            let newToIndex = boardSize - gameState.latestMoveToIndex - 1;
            return index === newFromIndex || index === newToIndex;
        }
        return index === gameState.latestMoveFromIndex || index === gameState.latestMoveToIndex;
    }

    return (
        <Box className={classes.Container}>
            <Paper className={classes.Board}>
                {
                    pieces.map((piece, i) => (
                        <Square
                            isWhite={squareColor(i)}
                            id={piece} active={active}
                            coordinate={squareCoordinate(i)}
                            key={squareCoordinate(i)}
                            clickFunction={() => clickFunction(squareCoordinate(i))}
                            highlight={shouldHighlight(i)}
                            labelRow={!(color === "white") ? columnCoordinate[(Number(gameState.boardSize.cols) - 1)] : undefined}
                            labelCol={!(color === "white") ? (Number(gameState.boardSize.rows)).toString() : undefined}
                        />
                    ))
                }
            </Paper>
        </Box>
    );
}
