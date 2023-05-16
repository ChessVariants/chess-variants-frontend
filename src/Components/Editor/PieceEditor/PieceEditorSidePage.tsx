import { Box, Button, Container, Modal, Paper, Stack, Typography } from "@mui/material";
import { TextField, Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PatternInputs from "./PatternInputs";
import PieceSettings from "./PieceSettings";
import { ChangeEvent, useState } from "react";
import EditorService from "../../../Services/EditorService";
import ImageSelectorPage from "../../Util/ImageSelectorPage";

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

export default function SideInfo(props: { editorID: string }) {

    const editorService: EditorService = EditorService.getInstance();

    const { editorID } = props;
    const classes = useStyles();

    const [name, setName] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const buildPiece = () => {
        editorService.buildPiece(editorID, name);
        handleClose();
    };

    const isValidName = name.trim() !== "" && name.length < 15; // Max length 15 characters

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    return (
        <Container>
            <Paper className={classes.CenteredBasicCard} sx={{ maxWidth: '360px', width: "80%" }}>
                <PatternInputs editorID={editorID}></PatternInputs>
                <PieceSettings buildPieceFunction={handleOpen} editorID={editorID}></PieceSettings>
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
                                    Choose a name
                                </Typography>
                                <TextField
                                    id="name" type="text" value={name} onChange={handleChange} style={{ position: "relative", marginLeft: "10px" }}
                                >
                                </TextField>
                                <Button disabled={!isValidName} sx={{ height: 40 }} onClick={() => { buildPiece() }}>
                                    Build piece
                                </Button>
                            </Stack>
                        </Container>
                    </div>
                </Modal>
            </Paper>
        </Container>
    );

}

