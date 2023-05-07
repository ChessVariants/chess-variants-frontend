import { Box } from "@mui/system";
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from "@material-ui/core";
import EditorService from "../../../Services/EditorService";
import { PieceImageAdapter } from "../../../IMG/PieceImageAdapter";
import { Button } from "@mui/material";

const useStyles = makeStyles<Theme>(({
    WhitePiece: {
        filter: "contrast(.7) brightness(1.2)",
    },
    BlackPiece: {
        filter: "sepia(2) saturate(1) hue-rotate(200deg) brightness(.2)",
    },
}));

export default function PieceItem(props: { editorID: string, piece: string, image: string }) {

    const editorService: EditorService = EditorService.getInstance();

    const { editorID: editorID, piece: piece, image: image } = props;

    const classes = useStyles();

    const checkColor = (): string => {
        if(image == image.toLowerCase()) {
            console.log("black pieces");
            return classes.BlackPiece;
        }

        if(image == image.toUpperCase()) {
            console.log("White pieces");
            return classes.WhitePiece;
        }

        console.log("no color");
        return classes.WhitePiece;
    };

    return (
        <Box >
            <Button onClick={() => {
                editorService.setActivePiece(editorID, piece);
            }}>
                <img src={PieceImageAdapter.getImageRef(image)}
                    className={`${classes.Icon} ${checkColor()}`}
                />
            </Button>
        </Box>
    );
}
