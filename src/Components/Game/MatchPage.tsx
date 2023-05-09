import GameBoard from "./GameBoard";
import GameSideInfo from "./GameSideInfo";
import { makeStyles } from '@material-ui/core/styles';
import GameService, { GameEvents, JoinResult, PromotionOptions } from "../../Services/GameService";
import { useLocation, useParams } from "react-router-dom";
import RedirectLogin from "../Util/RedirectLoginPage";
import { useEffect, useState } from "react";
import EndScreen from "./EndScreen";
import PromotionSelector from "./PromotionSelector";
import { Box } from "@mui/material";

export enum Result {
  ongoing = "Match is ongoing",
  win = "You won!",
  draw = "Draw",
  loss = "You lost!",
  winBySurrender = "Opponent resigned!",
  lossBySurrender = "You resigned!"
}
const useStyles = makeStyles(() => ({
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

  const [gameResult, setGameResult] = useState(Result.ongoing);
  const [promotionOptions, setPromotionOptions] = useState<PromotionOptions | null>(null);


  useEffect(() => {
    if (gameService.isDisconnected()) {
      return;
    }
    gameService.on(GameEvents.BlackWon, () => {
      if (location.state?.color === "black") {
        setGameResult(Result.win);
      }
      else {
        setGameResult(Result.loss);
      }
    })
    gameService.on(GameEvents.WhiteWon, () => {
      if (location.state?.color === "white") {
        setGameResult(Result.win);
      }
      else {
        setGameResult(Result.loss);
      }
    })
    gameService.on(GameEvents.Tie, () => {
      setGameResult(Result.draw);
    })

    gameService.on(GameEvents.PlayerLeftGame, (output: string) => {
      console.log(output)
      setGameResult(Result.winBySurrender);
    })

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

    gameService.on(GameEvents.Promotion, (promotionOptions: PromotionOptions) => {
      console.log(promotionOptions);
      setPromotionOptions(promotionOptions);
    })

    gameService.on(GameEvents.Promoted, () => {
      console.log('promtion done');
      setPromotionOptions(null);
    })
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
    <Box>
      {gameResult === Result.ongoing ? null : <EndScreen players={players} result={gameResult} />}
      <Box className={classes.Container}>
        <GameBoard gameID={gameID + ""} color={location.state?.color}></GameBoard>
        {promotionOptions ? <PromotionSelector options={promotionOptions} gameId={gameID!} /> : null}
        <GameSideInfo gameID={gameID + ""} setGameResult={setGameResult} />
      </Box>
    </Box>
  );
}
