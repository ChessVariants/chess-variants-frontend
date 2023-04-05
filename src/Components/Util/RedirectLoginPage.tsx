import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { commonClasses } from "./CommonClasses";

export default function RedirectLogin() {

    const classes = commonClasses();
    const navigate = useNavigate();

    return (
        <Container className={classes.CenteredBasicCard} >
            <Typography variant="h4" sx={{ letterSpacing: '4px' }}>Your session has expired</Typography>
            <Button onClick={() => {
                navigate("/login")
            }}
                variant="contained"
                sx={{ mt: 3, mb: 1, p: 2 }}>
                Continue to home
            </Button>
        </Container>
    );
}

