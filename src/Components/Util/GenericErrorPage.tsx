import { Container, Typography } from "@mui/material";
import { commonClasses } from "./CommonClasses";

export default function NotFound(props: { text: string }) {

    const classes = commonClasses();

    return (
        <Container className={classes.CenteredBasicCard} >
            <Typography variant="h4" sx={{ letterSpacing: '4px' }}>{props.text}</Typography>
        </Container>
    );
}
