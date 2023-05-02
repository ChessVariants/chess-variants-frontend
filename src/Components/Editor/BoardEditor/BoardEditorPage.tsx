import { Box } from "@mui/system";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import EditorService from "../../../Services/EditorService";
import BoardEditorBoard from "./BoardEditorBoard";
import BoardEditorSidePage from "./BoardEditorSidePage";

const useStyles = makeStyles<Theme>(({
    Container: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "1vw",
        display: "flex",
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

        console.log("creating editor");
        const editorID = (Math.random() + 1).toString(36).substring(5);
        setEditorID(editorID);
        editorService.sendCreateEditor(editorID);
    }

    return (
        <Box className={classes.Container} style={{ paddingTop: 50, paddingLeft: 450 }} sx={{justifyContent: 'left'}} >
            <BoardEditorBoard editorID={editorID}></BoardEditorBoard>
            <BoardEditorSidePage editorID={editorID}></BoardEditorSidePage>
        </Box>
    );
}
