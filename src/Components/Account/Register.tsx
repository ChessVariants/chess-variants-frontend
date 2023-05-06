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
import CustomDarkTheme from '../Util/CustomDarkTheme';
import { CssBaseline, Paper } from '@mui/material';
import { commonClasses } from '../Util/CommonClasses';

type RegisterUserResponse = {
  username: string,
  email: string,
}

async function registerUser(username: string, email: string, password: string): Promise<RegisterUserResponse> {
  return fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/users", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, email: email, password: password })
  })
  .then(data => data.json())
  .catch(() => console.log("Could not register user"));
}

/**
 * RegisterPage component
 * @returns HTML
 */
export default function RegisterPage(props: { showRegisteredNotification: any}) {
  const classes = commonClasses();
  /**
   * useState used to print a label with error message if the registration service returned an error
   */
  const [registrationError, setRegistrationError] = useState("");
  /**
   * useStates used to update the textfields to show error if the input is invalid, the useStates with FirstCheck is only
   * used the first before the user have typed any input in order to now show error message before input
   */
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidEmailFirstCheck, setIsValidEmailFirstCheck] = useState(true);

  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidUsernameFirstCheck, setIsValidUsernameFirstCheck] = useState(true);

  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPasswordFirstCheck, setIsValidPasswordFirstCheck] = useState(true);

  /**
   * Checks if the email is valid, changes the useState based on results
   * @param email string of the email
   */
  const validateEmail = (email: string) => {
    const emailRegexValidator = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (emailRegexValidator.test(email)) {
      setIsValidEmail(true);
      setIsValidEmailFirstCheck(true);
    }
    else {
      setIsValidEmail(false);
      setIsValidEmailFirstCheck(false);
    }
  }
  /**
   * Checks if the username is valid, changes the useState based on results
   * @param username string of the username
   */
  const validateUsername = (username: string) => {
    if (username !== "") {
      setIsValidUsername(true);
      setIsValidUsernameFirstCheck(true);
    }
    else {
      setIsValidUsername(false);
      setIsValidUsernameFirstCheck(false);
    }
  }
  /**
   * Checks if the password is valid, changes the useState based on results
   * @param password string of the password
   */
  const validatePassword = (password: string) => {
    if (password !== "") {
      setIsValidPassword(true);
      setIsValidPasswordFirstCheck(true);
    }
    else {
      setIsValidPassword(false);
      setIsValidPasswordFirstCheck(false);
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    });

    const response: RegisterUserResponse = await registerUser(
      data.get('username') as string,
      data.get('email') as string,
      data.get('password') as string
    );
    if (response) {
      navigatePage("/");
      props.showRegisteredNotification();
    } else {
      setRegistrationError("Registration failed, please try again.");
    }
  };

  /**
   * Returns the HTML
   */
  return (
    <ThemeProvider theme={CustomDarkTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper className={classes.BasicCard}
          sx={{
            marginTop: '10vh',
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
                  error={!isValidUsername && !isValidUsernameFirstCheck}
                  helperText={!isValidUsername && !isValidUsernameFirstCheck ? "Field can not be empty." : ""}
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
                  error={!isValidEmail && !isValidEmailFirstCheck}
                  helperText={!isValidEmail && !isValidEmailFirstCheck ? "Please use a valid email format." : ""}
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
                  error={!isValidPassword && !isValidPasswordFirstCheck}
                  helperText={!isValidPassword && !isValidPasswordFirstCheck ? "Field can not be empty." : ""}
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
              disabled={!isValidEmail || !isValidPassword || !isValidUsername}
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
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

