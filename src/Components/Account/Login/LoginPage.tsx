import { Container, Paper } from "@mui/material";
import { commonClasses } from "../../Util/CommonClasses";
import LoginComponent from "./LoginComponent";

export default function LoginPage() {

    const classes = commonClasses();

    return (
        <Container maxWidth="xs">
            <Paper className={classes.BasicCard} sx={{
                marginTop: '10vh',
            }}>
                <LoginComponent></LoginComponent>
            </Paper>
        </Container>
    );
}

