import { Box } from "@mui/system";
import GameBoard from "./GameBoard";
import GameSideInfo from "./GameSideInfo";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import GameService, { GameEvents } from "../../Services/GameService";


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

export default function MatchPage(props: {gameService: GameService}) {

  //const gameService: GameService = GameService.getInstance();
  const classes = useStyles();

  return (
    //<head className={classes.head}>
    <body className={classes.Body}>
      <Box className={classes.Container}>
        <GameBoard gameService={props.gameService}></GameBoard>
        <GameSideInfo gameService={props.gameService}></GameSideInfo>
      </Box>
    </body>
  );
}
