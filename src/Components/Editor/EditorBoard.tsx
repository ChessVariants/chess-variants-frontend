import { Box } from "@mui/system";
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from "@material-ui/core";
import Square from "../Game/Square";
import { useEffect, useState } from "react";
import EditorService, { EditorEvents, EditorState } from "../../Services/EditorService";

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
const columnCoordinate = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "Y", "Z"];

//type State = {
//    boardSize: { row: number, col: number };
//    board: string[];
//    sideToMove: string;
//    moves: { from: string; to: string[] }[];
//    //captures: { from: string; to: string[] }[];
//    square: string;
//};

const initialState: EditorState = {
    boardSize: { rows: 8, cols: 8 },
    board: [],
    sideToMove: "",
    moves: [],
    //captures: [],
    square: "",
};

/**
 * The GameBoard componenet
 * 
 * @returns HTML
 */
export default function EditorBoard(props: { editorService: EditorService }) {

    /**
     * Color of the user, either "white" or "black"
     */
    const [color, setColor] = useState("white");
    /**
     * GameState which includes boardsize, positions, side to move and valid moves.
     */
    const [editorState, setEditorState] = useState<EditorState>(initialState);

    /**
     * An array of active squares (highlighted by green color)
     * The first element is the active square that the user clicks on
     * The second is an array of active squares that the user can afterwards click on
     */
    const [active, setActive] = useState(["", [""]]);

    /**
     * The GameBoard requires the GameService object as a prop
     */
    const { editorService } = props;

    /**
     * gameService subscriptions which only registers once via useEffect
     */
    useEffect(() => {

        editorService.requestBoardState()
        .then((newEditorState?: EditorState) => {
            if (newEditorState === null) {
                console.log(newEditorState);
                console.log("Request failed");
            }
            console.log("updating state");
            setEditorState(newEditorState!);
        })

        editorService.on("PatternAdded", (msg: string) => {
            console.log(msg);
        })

        editorService.on(EditorEvents.UpdatedGameState, (json: string) => {
            console.log("updatestate");
            setEditorState(JSON.parse(json));
            //setActive([editorState.square, getValidMoves(editorState.square)])
        })

        editorService.on(EditorEvents.Error, (errorMessage: string) => {
            alert(errorMessage);
        })
    }, [])


    /**
     * Changes the positions data (string) to an array to be able to iterate over the positions
     * Will reverse if the other player is black
     */
    let tempPositions = editorState.board;
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
        rows: "repeat(" + editorState.boardSize.rows + ", auto)",
        cols: "repeat(" + editorState.boardSize.cols + ", auto)",
        height: (editorState.boardSize.rows >= editorState.boardSize.cols ? "38vw" : (editorState.boardSize.rows / editorState.boardSize.cols) * 38 + "vw"),
        heightSmall: (editorState.boardSize.rows >= editorState.boardSize.cols ? "56vw" : (editorState.boardSize.rows / editorState.boardSize.cols) * 56 + "vw"),
        width: (editorState.boardSize.rows >= editorState.boardSize.cols ? (editorState.boardSize.cols / editorState.boardSize.rows) * 38 + "vw" : "38vw"),
        widthSmall: (editorState.boardSize.rows >= editorState.boardSize.cols ? (editorState.boardSize.cols / editorState.boardSize.rows) * 56 + "vw" : "56vw"),
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
        if (editorState.boardSize.cols % 2) {
            if ((index + 1) % 2) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if ((index + 1 + (Math.trunc(index / editorState.boardSize.cols) % 2)) % 2) {
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
        let coordinate = columnCoordinate[(index % editorState.boardSize.cols)] + (Math.trunc(index2 / editorState.boardSize.cols) + 1);

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
        const moves = editorState.moves.filter((item) => item.from === coordinate);
        return moves[0] ? moves[0].to : [];
    }

    /**
     * ClickFunction is called when a square is clicked
     * 
     * @param coordinate 
     */
    const clickFunction = (coordinate: string) => {
        if (active[0] !== "" && active[1].includes(coordinate)) {
            console.log(active[0] + coordinate);
            setActive(["", []]);
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
