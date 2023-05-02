import { Box } from "@mui/system";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import EditorBoard from "../EditorBoard";
import EditorSidePage from "./PieceEditorSidePage";
import PatternList from "./PatternList";
import { useEffect, useState } from "react";
import EditorService from "../../../Services/EditorService";

const useStyles = makeStyles<Theme>(({
  Container: {
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "1vw",
    display: "flex",
  },
}));

export default function PieceEditorPage() {

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
    <Box className={classes.Container} style={{ paddingTop: 50 }} >
      <PatternList editorID={editorID} ></PatternList>
      <EditorBoard editorID={editorID}></EditorBoard>
      <EditorSidePage editorID={editorID}></EditorSidePage>
    </Box>
  );
}
