import HomePage from './Components/Home/HomePage';
import MatchPage from './Components/Game/MatchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Account/Register';
import JoinGame from './Components/SetupGame/JoinGame';
import SetupGame from './Components/SetupGame/SetupGame';
import PageNotFound from './Components/Util/PageNotFound';
import LoginPage from './Components/Account/Login/LoginPage';
import { useEffect, useState } from 'react';
import GameService from './Services/GameService';
import Cookies from 'universal-cookie';

function App() {
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    GameService.createAndConnect().then((res) => {
      setConnected(true);
    })
  }, [])

  if (!connected) {
    console.log("Not connected to hub ...");

    return (<></>)
  }

  const cookies = new Cookies()


  return (
    <>
      <h1>{cookies.get('username') ? cookies.get('username') : "Not logged in"}</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/match/:gameID" element={<MatchPage />} />
        <Route path="/new" element={<SetupGame />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/join/:joinCode" element={<JoinGame />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
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



