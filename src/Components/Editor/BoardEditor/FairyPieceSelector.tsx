import { Box } from "@mui/system";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import EditorService, { Piece } from "../../../Services/EditorService";
import Grid from '@mui/material/Grid';
import PieceItem from "./PieceItem";

const useStyles = makeStyles<Theme>(({
    Container: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        display: "inline-block",
        width: "60%",
        backgroundColor: "#adaca8",
        borderRadius: 10
    },
}));

const initialState: Piece[] = []

export default function FairyPieceSelector(props: { editorID: string }) {

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

    const { editorID: editorID } = props;

    return (
        <Box className={classes.Container} >
            <Grid container spacing={2} rowSpacing={2}>
                {
                    pieces.map((piece) => (
                        <Grid item>
                            <PieceItem editorID={editorID} piece={piece.name} image={piece.image} displayName={true}></PieceItem>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}
