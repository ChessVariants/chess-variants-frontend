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
export default function RegisterPage() {

  /**
   * useState used to print a label with error message if the registration service returned an error
   */
  const [registrationError, setRegistrationError] = useState("");
  /**
   * useStates used to update the textfields to show error if the input is invalid
   */
  const [isValidEmail, setIsValidEmail] = useState([false, true]);
  const [isValidUsername, setisValidUsername] = useState([false, true]);
  const [isValidPassword, setIsValidPassword] = useState([false, true]);

  /**
   * Checks if the email is valid, changes the useState based on results
   * @param email string of the email
   */
  const validateEmail = (email: string) => {
    const emailRegexValidator = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (emailRegexValidator.test(email)) {
      setIsValidEmail([true, true]);
    }
    else {
      setIsValidEmail([false, false]);
    }
  }
  /**
   * Checks if the username is valid, changes the useState based on results
   * @param username string of the username
   */
  const validateUsername = (username: string) => {
    if (username !== "") {
      setisValidUsername([true, true]);
    }
    else {
      setisValidUsername([false, false]);
    }
  }
  /**
   * Checks if the password is valid, changes the useState based on results
   * @param password string of the password
   */
  const validatePassword = (password: string) => {
    if (password !== "") {
      setIsValidPassword([true, true]);
    }
    else {
      setIsValidPassword([false, false]);
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
   * Handles submit on button click of the register button
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    });
    const dataValue = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    }
    //createUser(dataValue);
  };

  /**
   * Returns the HTML
   */
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={!isValidUsername[1]}
                  helperText={!isValidUsername[1] ? "Field can not be empty." : ""}
                  required
                  fullWidth
                 id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(event) => {
                    validateUsername(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!isValidEmail[1]}
                  helperText={!isValidEmail[1] ? "Please use a valid email format." : ""}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    validateEmail(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!isValidPassword[1]}
                  helperText={!isValidPassword[1] ? "Field can not be empty." : ""}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => {
                    validatePassword(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            {registrationError ? <Box sx=
              {{
                color: "red",
                fontSize: "12px",
              }}>{registrationError}</Box> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValidEmail[0] || !isValidPassword[0] || !isValidUsername[0]}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="" variant="body2" onClick={() => navigatePage("/login")}>
                  Already have an account? Sign in
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

