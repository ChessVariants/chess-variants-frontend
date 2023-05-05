import { Box } from "@mui/system";
import { Paper, Theme, styled } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import EditorService from "../../../Services/EditorService";
import Grid from '@mui/material/Grid';
import PieceItem from "./PieceItem";
import Button from "@mui/material/Button";
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

export default function PieceSelector(props: { editorID: string, color: string }) {

    const editorService: EditorService = EditorService.getInstance();

    const classes = useStyles();

    const { editorID: editorID, color: color } = props;

    return (
        <Box className={classes.Container}>
            <Grid container spacing={1} columns={7} >
                <Grid item xs={1}>
                    <PieceItem editorID={editorID} piece={"645505ae1f54af758a0c0186"} color={color} ></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <PieceItem editorID={editorID} piece={"64550be86809d4e498575fcc"} color={color}></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <PieceItem editorID={editorID} piece={"64550b9d6809d4e498575fcb"} color={color}></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <PieceItem editorID={editorID} piece={"64550c6a6809d4e498575fce"} color={color}></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <PieceItem editorID={editorID} piece={"64550c306809d4e498575fcd"} color={color}></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <PieceItem editorID={editorID} piece={"64550cc66809d4e498575fcf"} color={color}></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <Box >
                        <IconButton size="large" onClick={() => { editorService.setActiveRemove(editorID)}}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
