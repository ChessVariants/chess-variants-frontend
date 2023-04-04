import { Box, Button, TextField } from "@mui/material";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from "../Util/CustomButton";
import EditorService from "../../Services/EditorService";


const useStyles = makeStyles<Theme>(theme => ({
    Container: {
        backgroundColor: "#2C2D2F",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display: "inline-block",
        marginLeft: "20px",
        width: "14vw",
        minWidth: "120px",
        height: "36vw",
        minHeight: "320px",
        margin: "0",
        [theme.breakpoints.down('xs')]: {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            minWidth: "200px",
            minHeight: "280px",
        },
    },

}));

export default function SideInfo(props: { editorService: EditorService }) {

    const { editorService } = props;
    const classes = useStyles();

    return (
        <Box className={classes.Container}>
            <p>Settings</p>
            <CustomButton text={"Leave"} color={"blue"} height={"32px"}></CustomButton>
            <Button onClick={() => { editorService.addMovementPattern(1, 0, 1, 8) }}>Add Pattern</Button>
            <Button onClick={() => { editorService.requestBoardState() }}>Request state</Button>
        </Box>
    );

}

