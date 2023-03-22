import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import { commonClasses } from "../../Util/CommonClasses";
import CustomDarkTheme from "../../Util/CustomDarkTheme";
import LoginComponent from "./LoginComponent";

export default function LoginDialog(props: { clickFunction: any }) {

    const classes = commonClasses();

    return (
        <ThemeProvider theme={CustomDarkTheme}>
            <CssBaseline />
            <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
                <LoginComponent clickFunction={props.clickFunction()}></LoginComponent>
            </Container>
        </ThemeProvider>
    );
}

