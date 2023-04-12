import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { commonClasses } from "../Util/CommonClasses";



export default function CreateGame(props: { createGameFunction: any }) {

    const classes = commonClasses();

    const createLobby = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            variantID: data.get('variantID'),
        });

        props.createGameFunction(data.get('variantID'));
    };

    return (
        <Container maxWidth="xs" >
            <Paper className={classes.CenteredBasicCard}>
                <Box component="form" onSubmit={createLobby} noValidate sx={{ mt: 2 }}>
                    <Typography sx={{ letterSpacing: '2px', mb: 1 }}>ENTER VARIANT CODE</Typography>
                    <TextField
                        color={"createColor"}
                        margin="normal"
                        required
                        fullWidth
                        id="variantID"
                        name="variantID"
                        autoComplete="variantID"
                        autoFocus
                    />
                    <Button
                        color={"createColor"}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 1, p: 1 }}
                    >
                        CREATE LOBBY
                    </Button>
                </Box>
            </Paper>
        </Container>
    );

}

