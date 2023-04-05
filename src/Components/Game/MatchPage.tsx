import { Box } from "@mui/system";
import GameBoard from "./GameBoard";
import GameSideInfo from "./GameSideInfo";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import GameService, { JoinResult } from "../../Services/GameService";
import { useLocation, useParams } from "react-router-dom";
import RedirectLogin from "../Util/RedirectLoginPage";
import { useEffect, useState } from "react";
import EndScreen from "./EndScreen";

export enum Result {
  win = "You won!",
  draw = "Draw",
  loss = "You lost!"
}
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

enum JoinState {
  Ongoing = 'ongoing',
  Success = 'success',
  Fail = 'fail',
}

export default function MatchPage() {
  const { gameID } = useParams();
  const gameService: GameService = GameService.getInstance()
  const classes = useStyles();
  const location = useLocation();
  const [joinState, setJoinState] = useState<JoinState>(JoinState.Ongoing);
  const [failReason, setFailReason] = useState<string>("");
  let color = location.state?.color;
  let players = location.state?.players;

  useEffect(() => {
    if (gameService.isDisconnected()) {
      return;
    }

    gameService.requestJoinGame(gameID ? gameID : "")
      .then((res: JoinResult) => {
        console.log(res);

        if (res.success) {
          color = res.color ? res.color : color;
          setJoinState(JoinState.Success);
        }
        else {
          setJoinState(JoinState.Fail)
          if (res.failReason) {
            setFailReason(res.failReason);
          }
        }
      })
      .catch(e => {
        console.log(e);
        setJoinState(JoinState.Fail)
      })
    // TODO: Add listener for game ended
  }, [])

  if (gameService.isDisconnected()) {
    return (
      <RedirectLogin></RedirectLogin>
    );
  }

  if (joinState === JoinState.Ongoing) {
    return (<p>Joining game ...</p>)
  }

  if (joinState === JoinState.Fail) {
    return (<p>{failReason !== "" ? failReason : "Unable to join game"}</p>)
  }

  return (
    <div className={classes.Body}>
      <EndScreen players={players} result={Result.draw} />
      <Box className={classes.Container}>
        <GameBoard gameID={gameID + ""} color={location.state?.color}></GameBoard>
        <GameSideInfo gameService={gameService}></GameSideInfo>
      </Box>
    </div>
  );
}
