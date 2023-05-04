import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GameService, { CreateGameResult } from "../../Services/GameService";
import CreateGame from "./CreateLobby";
import Lobby from "./Lobby/Lobby";

enum pageStates {
    CreateGame = 1,
    Lobby,
};

export default function NewGame(props: { pageState?: pageStates }) {

    const [pageState, setPageState] = useState(props.pageState ? props.pageState : pageStates.CreateGame);
    const [gameID, setGameID] = useState("initial_gameid");
    const location = useLocation();
    const variantId = location.state?.variantId;
    const gameService = GameService.getInstance();

    const createGameFunction = (gameID: string) => {
        setGameID(gameID);
        setPageState(pageStates.Lobby);
    }
    useEffect(() => {
        if (variantId !== undefined && gameID === "initial_gameid") {
            const game = (Math.random() + 1).toString(36).substring(5);
            gameService.sendCreateGame(game, variantId).then((result: CreateGameResult) => {
                if (result.success) {
                    console.log("Lobby created successfully");
                    setGameID(game);
                    setPageState(pageStates.Lobby);
                    console.log(game)
                }
                else {
                    console.log(result.failReason);
                }
            })
                .catch(e => console.log(e));
        }
    }, [])

    if (pageState === pageStates.CreateGame) {
        return (<CreateGame createGameFunction={createGameFunction}></CreateGame>);
    }
    else {
        return (<Lobby gameID={gameID} isAdmin={true}></Lobby>);
    }

}

