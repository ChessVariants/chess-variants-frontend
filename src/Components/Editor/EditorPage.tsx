import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { commonClasses } from "../Util/CommonClasses";
import { useNavigate } from "react-router-dom";
import EditorService from "../../Services/EditorService";
import { useEffect } from "react";

export default function EditorPage() {

    const connectEditorHub = () => {
        if (!EditorService.getInstance().isDisconnected()) {
            return;
        }

        EditorService.connect()
            .then(() => {
                console.log("connected");
            })
            .catch(e => {
                console.log(e);
                console.log("Not connected");
            })
    }

    useEffect(() => {
        connectEditorHub();
      }, [])

    /**
       * Used to navigate to other pages
       */
    const navigate = useNavigate();

    const classes = commonClasses();
    return (
        <Container>
            <Paper className={classes.CenteredBasicCard} sx={{ maxWidth: '360px', width: "80%" }}>
                <Typography variant="h5" sx={{ letterSpacing: '4px', mb: 2, mt: 1 }}>EDITOR MENU</Typography>
                <Divider style={{ width: '100%' }}></Divider>
                <Button color={"joinColor"} onClick={() => {
                    navigate("/pieceEditor");
                }}
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, mb: 1, p: 2 }}>
                    CREATE NEW PIECE
                </Button>
                <Button color={"createColor"} onClick={() => {
                    navigate("/boardEditor");
                }}
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, mb: 1, p: 2 }}>
                    CREATE NEW BOARD
                </Button>
            </Paper>
        </Container>
    );
}

