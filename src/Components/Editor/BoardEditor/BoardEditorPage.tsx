import { Box } from "@mui/system";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react"
import EditorService from "../../../Services/EditorService";
import BoardEditorBoard from "./BoardEditorBoard";
import BoardEditorSidePage from "./BoardEditorSidePage";
import { MenuItem, Select, Stack } from "@mui/material";
import FairyPieceSelector from "./FairyPieceSelector";

const useStyles = makeStyles<Theme>(({
    Container: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "1vw",
        display: "flex",
        alignItems: "center",
    },
}));

export default function BoardEditorPage() {

    const editorService: EditorService = EditorService.getInstance();

    useEffect(() => {
        createEditorFunction();
    }, [])

    const classes = useStyles();

    const [editorID, setEditorID] = useState("initial_editorid");

    const createEditorFunction = () => {

        console.log("creating board editor");
        const editorID = (Math.random() + 1).toString(36).substring(5);
        setEditorID(editorID);
        editorService.sendCreateBoardEditor(editorID);
    }

    return (
        <Box className={classes.Container} style={{ paddingLeft: 450 }} >
            <BoardEditorBoard editorID={editorID}></BoardEditorBoard>
            <Stack>
                <BoardEditorSidePage editorID={editorID}></BoardEditorSidePage>
                <FairyPieceSelector editorID={editorID} ></FairyPieceSelector>
            </Stack>
        </Box>
    );
}


/* This is just an example of how board configurations can be selected in the variant editor.

const [boards, setBoards] = useState([""]);

useEffect(() => 
    editorService.requestBoardsByUser()
    .then((boards: string[]) => {
        setBoards(boards);
    })
    .catch(e => console.log(e));
)

<Select >
    {
        boards.map((board) => (
            <MenuItem value={board}>{board} </MenuItem>
        ))
    }
</Select>

*/