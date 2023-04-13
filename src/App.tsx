import HomePage from './Components/Home/HomePage';
import MatchPage from './Components/Game/MatchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Account/Register';
import JoinGame from './Components/SetupGame/JoinGame';
import SetupGame from './Components/SetupGame/SetupGame';
import LoginPage from './Components/Account/Login/LoginPage';
import { useEffect, useState } from 'react';
import GameService from './Services/GameService';
import CookieService, { Cookie } from './Services/CookieService';
import GenericErrorPage from './Components/Util/GenericErrorPage';
import ConditionEditorPage from './Components/Editor/ConditionEditorPage';
import RuleSetEditorPage from './Components/Editor/RuleSetEditorPage';
import EventEditorPage from './Components/Editor/EventEditorPage';
import MoveEditorPage from './Components/Editor/MoveEditorPage';

async function checkAuthentication(token: string): Promise<Response> {
  return fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'api/auth', {
    method: 'GET',
    headers: {'Authorization': `Bearer ${token}`},
  })
}

enum AuthenticationState {
  Uninitialized = 'uninitialized',
  InProgress = 'in progress',
  AuthenticationFailed = 'authentication failed',
  Authenticated = 'authenticated',
  NotPossible = 'not possible',
}

function App() {
  const cookieService = CookieService.getInstance()
  const [authenticationState, setAuthenticationState] = useState<AuthenticationState>(AuthenticationState.InProgress);
  const [username, setUsername] = useState<string>("Not logged in");

  useEffect(() => {
    cookieService.addChangeListener((cookie) => {
      if (cookie.value === undefined || cookie.value === null) {
        return
      }

      if (cookie.name === Cookie.JwtToken && cookie.value !== "") {
        GameService.create();
        authenticate();
      }

      if (cookie.name === Cookie.Username && cookie.value !== "") {
        setUsername(cookie.value)
      }
    })
  }, [])

  const authenticate = () => {
    setAuthenticationState(AuthenticationState.InProgress)
    checkAuthentication(cookieService.get(Cookie.JwtToken))
    .then(res => {
      console.log(res.status);
      if (res.status === 401) {        
        cookieService.remove(Cookie.Username);
        cookieService.remove(Cookie.JwtToken);
      }
      else if (res.status === 200) {
        setUsername(cookieService.get(Cookie.Username))
        connectHub();
      }
    })
    .catch(e => {
      console.log("Authentication check not possible");
      console.log(e);
    })
  }

  const connectHub = () => {
    if (!GameService.getInstance().isDisconnected()) {
      return;
    }

    GameService.connect()
    .then(() => {
      setAuthenticationState(AuthenticationState.Authenticated);
    })
    .catch(e => {
      setAuthenticationState(AuthenticationState.AuthenticationFailed);
      console.log(GameService.getInstance().hubConnection.state);
      
      console.log(e);
    })
  }

  useEffect(() => {
    authenticate();
    connectHub();
  }, [])

  if (authenticationState === AuthenticationState.InProgress
     || authenticationState === AuthenticationState.Uninitialized
     || GameService.getInstance().isConnecting()) {
    return (<></>)
  }

  if (authenticationState === AuthenticationState.NotPossible) {
    return (<GenericErrorPage text={'Servers unavailable'}></GenericErrorPage>)
  }

  return (
    <>
      <h1>{username}</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor/condition" element={<ConditionEditorPage/>} />
        <Route path="/editor/event" element={<EventEditorPage/>} />
        <Route path="/editor/move" element={<MoveEditorPage/>} />
        <Route path="/editor/ruleset" element={<RuleSetEditorPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/match/:gameID" element={<MatchPage />} />
        <Route path="/new" element={<SetupGame />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/join/:joinCode" element={<JoinGame />} />
        <Route path="/unauthorized" element={<GenericErrorPage text={'Unauthorized'} />} />
        <Route path="/*" element={<GenericErrorPage text={'Page not found'}/>} />
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



