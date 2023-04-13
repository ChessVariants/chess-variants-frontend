import { useState } from "react";
import GameService from "../../Services/GameService";
import CreateGame from "./CreateLobby";
import Lobby from "./Lobby/Lobby";

enum pageStates {
    CreateGame = 1,
    Lobby,
};

export default function NewGame(props: { pageState?: pageStates }) {
    let gameService: GameService = GameService.getInstance();

    const [pageState, setPageState] = useState(props.pageState ? props.pageState : pageStates.CreateGame);
    const [gameID, setGameID] = useState("initial_gameid");

    const createGameFunction = (gameID: string) => {
        setGameID(gameID);
        setPageState(pageStates.Lobby);
    }

    if (pageState === pageStates.CreateGame) {
        return (<CreateGame createGameFunction={createGameFunction}></CreateGame>);
    }
    else {
        return (<Lobby gameID={gameID} isAdmin={true}></Lobby>);
    }

}

