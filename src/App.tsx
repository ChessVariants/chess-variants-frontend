import LoginPage from './Components/Login/LoginPage';
import HomePage from './Components/Home/HomePage';
import GameService from './Components/Services/GameService'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

let gameService: GameService = new GameService();

function App() {

  const [playerId, setPlayerId] = useState<string>("...");
  const [gameId, setGameId] = useState<number>(0)

  function inc() {
    setGameId(gameId + 1);
  }

  function joinGame()
  {
    gameService.joinGame(`${gameId}`);
  }

  gameService.hubConnection.on('playerJoinedGame', (value) => {
      setPlayerId(value);
  });
  

  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <button onClick={joinGame}>Join Game</button>
      <button onClick={inc}>{gameId}</button>
      <span> {playerId} </span>
    </>
  );
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;



