import { Box } from "@mui/system";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import EditorService, { Piece } from "../../../Services/EditorService";
import Grid from '@mui/material/Grid';
import PieceItem from "./PieceItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from "@mui/material";


const useStyles = makeStyles<Theme>(({
    Container: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        display: "inline-block",
        width: "60%",
        backgroundColor: "#adaca8",
        borderRadius: 10,
    },
}));

const initialState: Piece[] = []

export default function StandardPieceSelector(props: { editorID: string, color: string }) {

    const editorService: EditorService = EditorService.getInstance();

    const classes = useStyles();

    const [pieces, setPieces] = useState<Piece[]>(initialState);

    useEffect(() => {

        editorService.requestStandardPieces(color)
            .then((pieceList: Piece[]) => {
                setPieces(pieceList);
            })
            .catch(e => console.log(e));

    }, [])

    const { editorID: editorID, color: color } = props;

    return (
        <Box className={classes.Container}>
            <Grid container spacing={0} columns={16} alignItems={"center"}>
                {
                    pieces.map((piece) => (
                        <Grid item xs={2}>
                            <PieceItem editorID={editorID} pieceName={piece.name} image={piece.image} displayName={false}></PieceItem>
                        </Grid>
                    ))
                }

                <Grid item xs={4}>
                    <Container>
                        <IconButton size="large" onClick={() => { editorService.setActiveRemove(editorID) }}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Container>
                </Grid>

            </Grid>
        </Box>
    );
}
