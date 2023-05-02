import { Box } from "@mui/system";
import { Paper, Theme, styled } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import EditorService from "../../../Services/EditorService";
import Grid from '@mui/material/Grid';
import Square from "../../Game/Square";
import PieceItem from "./PieceItem";

const useStyles = makeStyles<Theme>(({
    Container: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        display: "inline-block",
        height: "auto",
        width: "60%",
        backgroundColor: "#FFFFFF",
    },
}));

export default function PieceSelector(props: { color: string } ) {

    const editorService: EditorService = EditorService.getInstance();

    const classes = useStyles();

    const clickFunction = () => {
        //        setActive(["", []]);
        //        editorService.setActiveSquare(editorID, coordinate);
    }

    return (
        <Box className={classes.Container}>
            <Grid container spacing={1} columns={6}>
                <Grid item xs={1}>
                    <PieceItem piece={"ro"} color={props.color} ></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <PieceItem piece={"kn"}  color={props.color}></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <PieceItem piece={"bi"}  color={props.color}></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <PieceItem piece={"ki"} color={props.color}></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <PieceItem piece={"qu"} color={props.color}></PieceItem>
                </Grid>
                <Grid item xs={1}>
                    <PieceItem piece={"pa"} color={props.color}></PieceItem>
                </Grid>
            </Grid>
        </Box>
    );
}
