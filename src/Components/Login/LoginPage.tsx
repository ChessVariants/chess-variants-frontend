import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Copyright } from '../Util/Copyright';
import { CssBaseline, Divider, Paper } from '@mui/material';
import CustomDarkTheme from '../Util/CustomDarkTheme';
import { commonClasses } from '../Util/CommonClasses';
import GameService from '../../Services/GameService';
import Cookies from 'universal-cookie'


async function loginUser(url: string, email?: string, password?: string) {
  if (email == null || password == null) {
    console.log("email or password was null");
    return;
  }
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
    .then(data => data.json())
}

async function loginGuest(url: string) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}

/**
 * RegisterPage component
 * @returns HTML
 */
export default function LoginPage() {
  const classes = commonClasses();
  /**
  * useState used to print a label with error message if the login service returned an error
  */
  const [loginError, setLoginError] = useState("");
  /**
  * useStates used to update the textfields to show error if the input is invalid
  */
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  /**
   * Checks if the email is valid, changes the useState based on results
   * @param email string of the email
   */
  const validateEmail = (email: string) => {
    const emailRegexValidator = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (emailRegexValidator.test(email)) {
      setIsValidEmail(true);
    }
    else {
      setIsValidEmail(false);
    }
  }

  /**
   * Checks if the password is valid, changes the useState based on results
   * @param password string of the password
   */
  const validatePassword = (password: string) => {
    if (password !== "") {
      setIsValidPassword(true);
    }
    else {
      setIsValidPassword(false);
    }
  }

  /**
   * Used to navigate to other pages
   */
  const navigate = useNavigate();
  const navigatePage = (link: string) => {
    navigate(link);
  }

  /**
   * Handles submit on button click of the login button
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = await loginUser(
      process.env.REACT_APP_BACKEND_BASE_URL + 'api/login',
      formData.get('email')?.toString(),
      formData.get('password')?.toString()
    );
    console.log(data);
    const token = data.token;
    saveTokenAsCookie(token)
  };

  const loginAsGuest = async () => {
    const data = await loginGuest(process.env.REACT_APP_BACKEND_BASE_URL + 'api/login');
    console.log(data)
    const token = data.token;
    saveTokenAsCookie(token)
  }

  const saveTokenAsCookie = (token: string) => {
    if (typeof (token) === "string") {
      const cookies = new Cookies();
      cookies.set('jwtToken', token)
    }
    else {
      console.log(`Could not save cookie: ${token}`);
    }
  }

  /**
   * Returns the HTML
   */
  return (
    <ThemeProvider theme={CustomDarkTheme}>
      <CssBaseline />
      <Container maxWidth="xs" >
        <Paper className={classes.BasicCard}
          sx={{
            marginTop: '10vh',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white' }}>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "white" }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{
            mt: 1,
          }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                validateEmail(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                validatePassword(event.target.value);
              }}
            />
            {loginError ? <Box sx=
              {{
                color: "red",
                fontSize: "12px",
              }}>{loginError}</Box> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValidEmail || !isValidPassword}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={false}
              onClick={loginAsGuest}
            >
              Sign In As Guest
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="" variant="body2" onClick={() => navigatePage("/register")}>
                  Click here to register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
