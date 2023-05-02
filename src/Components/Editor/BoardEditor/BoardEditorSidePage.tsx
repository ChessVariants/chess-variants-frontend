import {  Container, Paper} from "@mui/material";
import {  Button, Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SizeInput from "../SizeInput";
import EditorService from "../../../Services/EditorService";

const useStyles = makeStyles<Theme>(({
    Container: {
        backgroundColor: "#2C2D2F",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display: "inline-block",
        color: "white",
    },
}));

export default function BoardSideInfo(props: { editorID: string }) {

    const editorService = EditorService.getInstance();

    const { editorID } = props;
    const classes = useStyles();

    return (
        <Container>
            <Paper className={classes.CenteredBasicCard} sx={{ maxWidth: '360px', width: "80%" }}>
                <SizeInput editorID={editorID} context="BoardEditor"></SizeInput>
            </Paper>
        </Container>
    );

}

