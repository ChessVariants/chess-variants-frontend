import LoginPage from './Components/Login/LoginPage';
import HomePage from './Components/Home/HomePage';
import MatchPage from './Components/Game/MatchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './Components/Login/RegisterPage';
import JoinGame from './Components/SetupGame/JoinGame';
import SetupGame from './Components/SetupGame/SetupGame';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/new" element={<SetupGame />} />
      <Route path="/join" element={<JoinGame />} />
      <Route path="/join/:joinCode" element={<JoinGame />} />
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



