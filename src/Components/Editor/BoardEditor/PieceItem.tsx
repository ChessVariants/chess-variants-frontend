import { Box } from "@mui/system";
import { Button, Paper, Theme, styled } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import EditorService from "../../../Services/EditorService";
import { PieceImageAdapter } from "../../../IMG/PieceImageAdapter";

const useStyles = makeStyles<Theme>(theme => ({
    WhitePiece: {
        filter: "contrast(.7) brightness(1.2)",
    },
    BlackPiece: {
        filter: "sepia(2) saturate(1) hue-rotate(200deg) brightness(.2)",
    },
}));

export default function PieceItem(props: { editorID: string, piece: string, color: string, image: string }) {

    const editorService: EditorService = EditorService.getInstance();

    const { editorID: editorID, piece: piece, color: color, image: image } = props;

    const classes = useStyles();

    return (
        <Box >
            <Button onClick={() => {
                editorService.setActivePiece(editorID, piece, color);
            }}>
                <img src={PieceImageAdapter.getImageRef(image)}
                    className={`${classes.Icon} ${ color === "white" ? classes.WhitePiece: classes.BlackPiece}`}
                />
            </Button>
        </Box>
    );
}
