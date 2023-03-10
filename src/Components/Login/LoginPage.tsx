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

/**
 * This page uses the standard darktheme from MUI
 */
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const theme = createTheme(darkTheme);

/**
 * RegisterPage component
 * @returns HTML
 */
export default function LoginPage() {

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  /**
   * Returns the HTML
   */
  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white' }}>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "white" }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
