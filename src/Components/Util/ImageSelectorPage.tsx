import { Box } from "@mui/system";
import { Button, ImageList, ImageListItem, Typography } from "@mui/material";
import { useState } from "react";
import { PieceImageAdapter } from "../../IMG/PieceImageAdapter";
import { Theme } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from "@material-ui/core";
import { Transition } from "../Util/SlideTransition";
import { transform } from "typescript";
import { title } from "process";



const useStyles = makeStyles<Theme>(theme => ({
    Container: {
        backgroundColor: "#2C2D2F",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display: "inline-block",
        color: "white",
    },
    scrollbar: {
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#000000',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '20px',
        },
    },
    modal: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "auto",
        backgroundColor: '#2C2D2F',
        border: '1px solid #1c1c1b',
        boxShadow: "24",
        borderRadius: "25px",
        alignItems: "center",
    }

}));

export default function ImageSelectorPage(props: { updateFunction: any }) {

    const { updateFunction: updateFunction } = props;

    const classes = useStyles();

    return (
        <div>
            <Container className={classes.modal} >
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textDecoration: 'underline', textUnderlineOffset: 5, fontSize: 34 }}>
                    Select an icon
                </Typography>
                <ImageList className={classes.scrollbar} sx={{ width: "20vw", height: "20vw" }} cols={3} rowHeight={75}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.title}>
                            <Button onClick={() => {
                                updateFunction(item.title);
                            }}>
                                <img
                                    src={item.img}
                                    srcSet={item.img}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </Button>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>
        </div>
    );
}


const itemData = [
    {
        title: "ro",
        img: PieceImageAdapter.getImageRef('ro'),
    },
    {
        title: "bi",
        img: PieceImageAdapter.getImageRef('bi'),
    },
    {
        title: "kn",
        img: PieceImageAdapter.getImageRef('kn'),
    },
    {
        title: "qu",
        img: PieceImageAdapter.getImageRef('qu'),
    },
    {
        title: "ki",
        img: PieceImageAdapter.getImageRef('ki'),
    },
    {
        title: "pa",
        img: PieceImageAdapter.getImageRef('pa'),
    },
    {
        title: "jo",
        img: PieceImageAdapter.getImageRef('jo'),
    },
];