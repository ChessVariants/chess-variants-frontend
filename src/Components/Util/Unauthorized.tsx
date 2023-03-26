import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Typography } from "@mui/material";
import { commonClasses } from "./CommonClasses";
import CustomDarkTheme from "./CustomDarkTheme";

export default function Unauthorized() {

    const classes = commonClasses();

    return (
        <ThemeProvider theme={CustomDarkTheme}>
            <CssBaseline />
            <Container className={classes.CenteredBasicCard} >
                <Typography variant="h4" sx={{ letterSpacing: '4px' }}>UNAUTHORIZED</Typography>
            </Container>
        </ThemeProvider>
    );
}

