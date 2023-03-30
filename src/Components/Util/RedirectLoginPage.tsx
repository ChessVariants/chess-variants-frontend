import { ThemeProvider } from "@emotion/react";
import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { commonClasses } from "./CommonClasses";
import CustomDarkTheme from "./CustomDarkTheme";

export default function RedirectLogin() {

    const classes = commonClasses();
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={CustomDarkTheme}>
            <CssBaseline />
            <Container className={classes.CenteredBasicCard} >
                <Typography variant="h4" sx={{ letterSpacing: '4px' }}>Your session has expired</Typography>
                <Button color={"createColor"} onClick={() => {
                    navigate("/login")
                }}
                    variant="contained"
                    sx={{ mt: 3, mb: 1, p: 2 }}>
                    Continue to home
                </Button>
            </Container>
        </ThemeProvider>
    );
}

