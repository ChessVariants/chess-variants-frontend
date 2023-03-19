import LoginPage from './Components/Login/LoginPage';
import HomePage from './Components/Home/HomePage';
import MatchPage from './Components/Game/MatchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './Components/Login/RegisterPage';
import CreateGame from './Components/Lobby/CreateGame';
import NewGame from './Components/Lobby/NewGame';
import JoinGame from './Components/Lobby/JoinGame';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/play" element={<NewGame />} />
      <Route path="/play/:joinCode" element={<JoinGame />} />
    </Routes>
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



