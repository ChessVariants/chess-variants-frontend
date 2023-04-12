import { Box } from "@mui/system";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import EditorService from "../../Services/EditorService";
import EditorBoard from "../Editor/EditorBoard";
import EditorSidePage from "./EditorSidePage";
import PatternList from "./PatternList";

const useStyles = makeStyles<Theme>(theme => ({
  Container: {
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "1vw",
    display: "flex",
  },
}));

export default function EditorPage() {

  const editorService: EditorService = EditorService.getInstance();
  const classes = useStyles();

  // The Pattern thingy is for some reason dependent on some alignment of EditorSidePage which makes it jump around :(
  return (
    //<head className={classes.head}>
    <body className={classes.Body}>
      <Box className={classes.Container}>
        <PatternList editorService={editorService} ></PatternList>
        <EditorBoard editorService={editorService}></EditorBoard>
        <EditorSidePage editorService={editorService}></EditorSidePage>
      </Box>
    </body>
  );
}
