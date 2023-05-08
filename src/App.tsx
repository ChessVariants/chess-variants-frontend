import HomePage from './Components/Home/HomePage';
import MatchPage from './Components/Game/MatchPage';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from './Components/Account/Register';
import JoinGame from './Components/SetupGame/JoinGame';
import SetupGame from './Components/SetupGame/SetupGame';
import { useEffect, useState } from 'react';
import GameService from './Services/GameService';
import CookieService, { Cookie } from './Services/CookieService';
import GenericErrorPage from './Components/Util/GenericErrorPage';
import ConditionEditorPage from './Components/Editor/Ruleset/Pages/ConditionEditorPage';
import RuleSetEditorPage from './Components/Editor/Ruleset/Pages/RuleSetEditorPage';
import EventEditorPage from './Components/Editor/Ruleset/Pages/EventEditorPage';
import MoveEditorPage from './Components/Editor/Ruleset/Pages/MoveEditorPage';
import { Box, Dialog } from '@mui/material';
import VariantBrowser from './Components/VariantBrowser/VariantBrowser';
import NavBar from './Components/Util/NavBar';
import LoginDialog from './Components/Account/Login/LoginDialog';
import { Transition } from './Components/Util/SlideTransition'
import RegisteredNotification from './Components/Account/RegisteredNotification';
import EditorPage from './Components/Editor/EditorPage';
import PieceEditorPage from './Components/Editor/PieceEditor/PieceEditorPage';
import BoardEditorPage from './Components/Editor/BoardEditor/BoardEditorPage';

async function checkAuthentication(token: string): Promise<Response> {
  return fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'api/auth', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
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
  const [username, setUsername] = useState<string>("");
  const [displayLoginDialog, setDisplayLoginDialog] = useState<boolean>(true);
  const [displayRegisteredNotification, setDisplayRegisteredNotification] = useState<boolean>(false);
  const location = useLocation();

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
  useEffect(() => {
    if (username === "") {
      setDisplayLoginDialog(true)
    } else {
      setDisplayLoginDialog(false)
    }
  }, [username])

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
    return (<>Loading</>)
  }

  if (authenticationState === AuthenticationState.NotPossible) {
    return (<GenericErrorPage text={'Servers unavailable'}></GenericErrorPage>)
  }


  const closeDialog = () => {
    setDisplayLoginDialog(false)
  }

  const showRegisteredNotification = () => {
    setDisplayRegisteredNotification(true);
  }

  const hideRegisteredNotification = () => {
    setDisplayRegisteredNotification(false);
  }

  const shouldShowRegisteredNotification = () => {
    return displayRegisteredNotification && displayLoginDialog;
  }
  return (
    <Box>
      <RegisteredNotification
        displayCondition={shouldShowRegisteredNotification}
        hideRegisteredNotification={hideRegisteredNotification}
      ></RegisteredNotification>
      {displayLoginDialog && !location.pathname.startsWith('/register') ?
        <Dialog open={displayLoginDialog} TransitionComponent={Transition}>
          <LoginDialog clickFunction={closeDialog}></LoginDialog>
        </Dialog> : null
      }
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor/condition" element={<ConditionEditorPage />} />
          <Route path="/editor/event" element={<EventEditorPage />} />
          <Route path="/editor/move" element={<MoveEditorPage />} />
          <Route path="/editor/ruleset" element={<RuleSetEditorPage />} />
          <Route path="/register" element={<Register showRegisteredNotification={showRegisteredNotification} />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/pieceEditor" element={<PieceEditorPage />} />
          <Route path="/boardEditor" element={<BoardEditorPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/match/:gameID" element={<MatchPage />} />
          <Route path="/new" element={<SetupGame />} />
          <Route path="/join" element={<JoinGame />} />
          <Route path="/join/:joinCode" element={<JoinGame />} />
          <Route path="/browse" element={<VariantBrowser />} />
          <Route path="/unauthorized" element={<GenericErrorPage text={'Unauthorized'} />} />
          <Route path="/*" element={<GenericErrorPage text={'Page not found'} />} />
        </Routes>
      </Box>
    </Box>
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



