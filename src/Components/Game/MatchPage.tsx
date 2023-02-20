import { Box } from "@mui/system";
import GameBoard from "./GameBoard";
import GameSideInfo from "./GameSideInfo";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles<Theme>(theme => ({
  Body: {
        background: "#505358",
  },
  Container: {
    alignContent: "center",
    textAlign: "center",
    marginTop: "100px",
    width: "100%",
    height: "100vh",
    display: "inline-block",
  }
}));

export default function MatchPage() {  

  const classes = useStyles();

  return (
    //<head className={classes.head}>
    <body className={classes.Body}>
      <Box className={classes.Container}>
      <GameBoard></GameBoard>
      <GameSideInfo></GameSideInfo>
      </Box>
    </body>
  );
}
  