import LoginPage from './Components/Login/LoginPage';
import HomePage from './Components/Home/HomePage';
import MatchPage from './Components/Game/MatchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/match" element={<MatchPage />} />
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



