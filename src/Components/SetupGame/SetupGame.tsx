import { useState } from "react";
import GameService from "../../Services/GameService";
import CreateGame from "./CreateGame";
import Lobby from "./Lobby";

enum pageStates {
    CreateGame = 1,
    Lobby,
    Join,
};

export default function NewGame(props: { pageState?: pageStates }) {

    const gameService: GameService = GameService.getInstance();

    const [pageState, setPageState] = useState(props.pageState ? props.pageState : pageStates.CreateGame);
    const [gameID, setGameID] = useState("initial_gameid");
    const [variantID, setVariantID] = useState("");

    // 

    const createGameFunction = (variantID: string) => {
        const gameID = (Math.random() + 1).toString(36).substring(5);
        setGameID(gameID);
        setVariantID(variantID);
        setPageState(pageStates.Lobby);
        gameService.createGame(gameID, variantID);
    }

    if (pageState === pageStates.CreateGame) {
        return (<CreateGame createGameFunction={createGameFunction}></CreateGame>);
    }
    else {
        return (<Lobby gameService={gameService} gameID={gameID}></Lobby>);
    }

}

