import { Box } from "@mui/system";
import GameBoard from "./GameBoard";
import GameSideInfo from "./GameSideInfo";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import GameService, { GameEvents } from "../../Services/GameService";
import Cookies from 'universal-cookie'


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

export default function MatchPage() {

  const cookies = new Cookies();
  const gameService: GameService = new GameService(process.env.REACT_APP_BACKEND_BASE_URL!, cookies.get('jwtToken'))
  const classes = useStyles();

  return (
    //<head className={classes.head}>
    <body className={classes.Body}>
      <Box className={classes.Container}>
        <GameBoard gameService={gameService}></GameBoard>
        <GameSideInfo gameService={gameService}></GameSideInfo>
      </Box>
    </body>
  );
}
