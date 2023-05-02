import { Box } from "@mui/system";
import { Paper, Theme, styled } from "@material-ui/core";
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

export default function PieceItem(props: { piece: string, color: string }) {

    const editorService: EditorService = EditorService.getInstance();

    const { piece: piece, color: color } = props;

    const classes = useStyles();

    return (
        <Box >
            <Box >
                <img src={PieceImageAdapter.getImageRef(piece)}
                    className={`${classes.Icon} ${ color === "white" ? classes.WhitePiece: classes.BlackPiece}`}
                />
            </Box>
        </Box>
    );
}
