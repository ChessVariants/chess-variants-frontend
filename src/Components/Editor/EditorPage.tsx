import { Box } from "@mui/system";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import EditorService, { EditorEvents } from "../../Services/EditorService";
import EditorBoard from "../Editor/EditorBoard";
import EditorSidePage from "./EditorSidePage";
import Pattern from "./Pattern";

const useStyles = makeStyles<Theme>(theme => ({
  Container: {
    alignContent: "center",
    textAlign: "center",
    marginTop: "100px",
    width: "100%",
    height: "100vh",
    display: "inline-block",
  }
}));

export default function EditorPage() {

  const editorService: EditorService = EditorService.getInstance();
  const classes = useStyles();

  return (
    //<head className={classes.head}>
    <body className={classes.Body}>
      <Box className={classes.Container}>
        <Pattern editorService={editorService} ></Pattern>
        <EditorBoard editorService={editorService}></EditorBoard>
        <EditorSidePage editorService={editorService}></EditorSidePage>
      </Box>
    </body>
  );
}
