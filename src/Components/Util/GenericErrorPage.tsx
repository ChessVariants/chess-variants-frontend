import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Typography } from "@mui/material";
import { commonClasses } from "./CommonClasses";
import CustomDarkTheme from "./CustomDarkTheme";

export default function NotFound(props: {text: string}) {

    const classes = commonClasses();

    return (
        <ThemeProvider theme={CustomDarkTheme}>
            <CssBaseline />
            <Container className={classes.CenteredBasicCard} >
                <Typography variant="h4" sx={{ letterSpacing: '4px' }}>{props.text}</Typography>
            </Container>
        </ThemeProvider>
    );
}
