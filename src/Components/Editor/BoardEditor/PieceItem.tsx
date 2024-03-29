import { makeStyles } from '@material-ui/core/styles';
import { Container, FormControl, Theme } from "@material-ui/core";
import EditorService from "../../../Services/EditorService";
import { PieceImageAdapter } from "../../../IMG/PieceImageAdapter";
import { Button, Typography } from "@mui/material";

const useStyles = makeStyles<Theme>(({
    WhitePiece: {
        filter: "contrast(.7) brightness(1.2)",
    },
    BlackPiece: {
        filter: "sepia(2) saturate(1) hue-rotate(200deg) brightness(.2)",
    },
    CommonPiece: {
        filter: "invert(19%) sepia(40%) saturate(590%) hue-rotate(5deg) brightness(100%) contrast(84%)"
    },
}));

export default function PieceItem(props: { editorID: string, pieceName: string, image: string, displayName: boolean }) {

    const editorService: EditorService = EditorService.getInstance();

    const { editorID: editorID, pieceName: piece, image: image, displayName: displayName } = props;

    const classes = useStyles();

    const checkColor = (): string => {
        if (image === image.toLowerCase())
            return classes.BlackPiece;
        else if (image === image.toUpperCase())
            return classes.WhitePiece;
        else
            return classes.CommonPiece;
    };

    return (
        <Container>
            <FormControl>
                <Button onClick={() => {
                    editorService.setActivePiece(editorID, piece);
                }}>
                    <img src={PieceImageAdapter.getImageRef(image)}
                        className={`${classes.Icon} ${checkColor()}`}
                    />
                </Button>
                {displayName ? <Typography > {piece} </Typography> : <></>}
            </FormControl>
        </Container>
    );
}
