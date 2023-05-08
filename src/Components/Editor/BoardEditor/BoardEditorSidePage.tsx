import { Container, Modal, Paper, TextField, Typography } from "@mui/material";
import { Theme } from "@material-ui/core";
import { Button, Stack } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import SizeInput from "../SizeInput";
import EditorService from "../../../Services/EditorService";
import { ChangeEvent, useState } from "react";

const useStyles = makeStyles<Theme>(({
    Container: {
        backgroundColor: "#2C2D2F",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display: "inline-block",
        color: "white",
    },
    modal: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "auto",
        backgroundColor: '#2C2D2F',
        border: '1px solid #1c1c1b',
        boxShadow: "24",
        borderRadius: "25px",
        alignItems: "center",
    }
}));

export default function BoardSideInfo(props: { editorID: string }) {

    const editorService = EditorService.getInstance();

    const { editorID } = props;
    const classes = useStyles();

    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const buildBoard = () => {
        editorService.buildBoard(editorID, name);
        handleClose();
    };

    const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const isValidName = name.trim() !== "" && name.length < 15; // Max length 15 characters

    return (
        <Container>
            <Paper className={classes.CenteredBasicCard} sx={{ maxWidth: '360px', width: "80%" }}>
                <SizeInput editorID={editorID} context="BoardEditor"></SizeInput>
                <Stack sx={{alignItems: "center"}}>
                    <Button onClick={() => {
                        editorService.clearBoardEditorBoard(editorID);
                    }}>Clear Board</Button>
                    <Button onClick={() => {
                        editorService.resetStartingPosition(editorID);
                    }}>Reset starting position</Button>

                    <Button
                        color={"createColor"}
                        onClick={() => { handleOpen() }}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, mb: 2, p: 2, width: "80%" }}
                    >
                        Build Board
                    </Button>

                </Stack>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div>
                        <Container className={classes.modal} >
                            <Stack>
                                <Typography id="pieceNameModal" sx={{ textDecoration: 'underline', textUnderlineOffset: 5, fontSize: 34 }}>
                                    Enter the name
                                </Typography>
                                <TextField
                                    id="name" type="text" value={name} onChange={handleTextFieldChange} style={{ position: "relative", marginLeft: "10px" }}
                                >
                                </TextField>
                                <Button disabled={!isValidName} sx={{ height: 40 }} onClick={() => { buildBoard() }}>
                                    Build Board
                                </Button>
                            </Stack>
                        </Container>
                    </div>
                </Modal>
            </Paper>
        </Container>
    );

}

