import React, {useEffect, useState} from "react";
import { Box, Button } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        height: "100px",
        width: "100px",
        backgroundColor: 'red',
    },
    button2: {
        height: "100px",
        width: "100px",
        backgroundColor: 'green',
    }
  }));

const Home = (props: {text: string}) => {
    const classes = useStyles();
    const {
        text
    } = props;
    const [clicked, setClicked] = useState(text === "hej" ? true : false);


    useEffect(()=>{
       console.log("hej") 
    },[clicked]);

    return (
        <Box>
            <Box className = {clicked ? classes.button : classes.button2}>
             <Button onClick={() => {
              setClicked(!clicked);
              }}>
             {text}
            </Button>
            {clicked ? (
                <Box className = {classes.button}></Box>
            ):null}
            </Box>
        </Box>
        
    );
}

export default Home;