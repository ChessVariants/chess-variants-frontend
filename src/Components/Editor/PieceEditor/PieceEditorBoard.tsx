import { Box } from "@mui/system";
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from "@material-ui/core";
import Square from "../../Game/Square";
import { useEffect, useState } from "react";
import EditorService, { EditorEvents, PieceEditorState } from "../../../Services/EditorService";
import { Move } from "../../../Services/GameService";
import { Modal } from "@mui/material";
import ImageSelectorPage from "../../Util/ImageSelectorPage";

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

const initialState: PieceEditorState = {
    board: [],
    boardSize: { rows: 8, cols: 8 },
    moves: [],
    square: "",
    belongsTo: "",
};

export default function PieceEditorBoard(props: { editorID: string }) {

    const editorService: EditorService = EditorService.getInstance();

    const [editorState, setEditorState] = useState<PieceEditorState>(initialState);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [active, setActive] = useState(["", [""]]);

    const { editorID: editorID } = props;

    useEffect(() => {

        editorService.on(EditorEvents.UpdatedPieceEditorState, (newEditorState: PieceEditorState) => {
            console.log("updatestate");
            setEditorState(newEditorState);
            setActive([newEditorState.square, getValidMoves(newEditorState.moves, newEditorState.square)]);
        })

        editorService.on(EditorEvents.Error, (errorMessage: string) => {
            alert(errorMessage);
        })

        editorService.on(EditorEvents.BuildFailed, (errorMessage: string) => {
            alert(errorMessage);
        })
    }, [])

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

    const squareColor = (index: number) => {
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

    const squareCoordinate = (index: number) => {
        let index2 = pieces.length - 1 - index;
        let coordinate = columnCoordinate[(index % editorState.boardSize.cols)] + (Math.trunc(index2 / editorState.boardSize.cols) + 1);
        return coordinate;
    }

    const getValidMoves = (moves: Move[], coordinate: string) => {
        const moveTo = moves.filter((item) => item.from === coordinate);
        return moveTo[0] ? moveTo[0].to : [];
    }

    const clickFunction = (coordinate: string) => {
        if (coordinate === active[0]) {
            handleOpen();
        }
        else {
            setActive(["", []]);
            editorService.setActiveSquare(editorID, coordinate);
        }
    }

    const updateImage = (img: string) => {
        editorService.setImagePath(editorID, img);
        handleClose();
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ImageSelectorPage updateFunction={updateImage}></ImageSelectorPage>
            </Modal>
        </Box>
    );
}

