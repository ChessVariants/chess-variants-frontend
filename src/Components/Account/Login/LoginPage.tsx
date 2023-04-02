import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Paper } from "@mui/material";
import { commonClasses } from "../../Util/CommonClasses";
import CustomDarkTheme from "../../Util/CustomDarkTheme";
import LoginComponent from "./LoginComponent";

export default function LoginPage() {

    const classes = commonClasses();

    return (
        <ThemeProvider theme={CustomDarkTheme}>
            <CssBaseline />
            <Container maxWidth="xs">
                <Paper className={classes.BasicCard} sx={{
                    marginTop: '10vh',
                }}>
                    <LoginComponent></LoginComponent>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

