import Login from './Components/Login/Login';
import HomePage from './Components/Home/HomePage';
import MatchPage from './Components/Game/MatchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Login/Register';
import JoinGame from './Components/SetupGame/JoinGame';
import SetupGame from './Components/SetupGame/SetupGame';
import PageNotFound from './Components/Util/PageNotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/new" element={<SetupGame />} />
      <Route path="/join" element={<JoinGame />} />
      <Route path="/join/:joinCode" element={<JoinGame />} />
      <Route path="/*" element={<PageNotFound />} />
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



