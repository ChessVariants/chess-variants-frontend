import { Box } from "@mui/system";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import EditorService, { Piece } from "../../../Services/EditorService";
import Grid from '@mui/material/Grid';
import PieceItem from "./PieceItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles<Theme>(({
    Container: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        display: "inline-block",
        width: "60%",
        backgroundColor: "#adaca8",
    },
}));

const initialState: Piece[] = []

export default function FairyPieceSelector(props: { editorID: string, color: string }) {

    const editorService: EditorService = EditorService.getInstance();

    const classes = useStyles();

    const [pieces, setPieces] = useState<Piece[]>(initialState);

    useEffect(() => {

        editorService.requestPiecesByUser()
            .then((pieceList: Piece[]) => {
                setPieces(pieceList);
            })
            .catch(e => console.log(e));

    }, [])

    const { editorID: editorID, color: color } = props;

    return (
        <Box className={classes.Container}>
            <Grid container spacing={1} columns={7} >
                {
                    pieces.map((piece) => (
                        <Grid item xs={1}>
                            <PieceItem editorID={editorID} piece={piece.name} color={color} image={piece.image}></PieceItem>
                        </Grid>
                    ))
                }
                <Box >
                    <IconButton size="large" onClick={() => { editorService.setActiveRemove(editorID) }}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            </Grid>
        </Box>
    );
}
