import React, { useEffect, useState } from "react";
import { Box, Button, Color } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';


const CustomButton = (props: { text: string, maxWidth?: string, height: string, color: string }) => {
    const {
        text,
        maxWidth,
        height,
        color,
    } = props;

    const useStyles: any = makeStyles((theme) => ({
        Container: {
            display: "inline-block",
            backgroundColor: "#555CB4",
            height: height,
            width: "80%",
            overflow: "hidden",
            textAlign: "left",
            cursor: "pointer",
            boxShadow: "inset 0 0 0 0 #42478E",
            webkitTransition: "ease-out 0.4s",
            mozTransition: "ease-out 0.4s",
            transition: "ease-out 0.4s",
            "&:hover": {
                boxShadow: "inset 200px 0 0 0 #42478E",
            }
        },
        Icon: {
            display: "inline-block",
            backgroundColor: "#42478E",
            bottom: "0",
            left: "0",
            height: "100%",
            width: height,
        },
    }));
    const classes = useStyles();

    return (
        <Box className={classes.Container}>
            <Box className={classes.Icon}>
                <p>A</p>
            </Box>
        </Box>
    );
}

export default CustomButton;