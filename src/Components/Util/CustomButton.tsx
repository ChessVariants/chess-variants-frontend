import React, {useEffect, useState} from "react";
import { Box, Button, Color } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';


  const CustomButton = (props: {text: string, width: string, height: string, color: string}) => {
    const {
        text,
        width,
        height,
        color,
    } = props;

    const [clicked, setClicked] = useState(text === "hej" ? true : false);
    
    const useStyles : any = makeStyles((theme) => ({
        CustomButton: {
            height: height,
            width: width,
            backgroundColor: color,
        },
      }));
    const classes = useStyles();
    


    useEffect(()=>{
       console.log("hej") 
    },[clicked]);

    return (
        <Box>
            <Box className = {classes.CustomButton}>
             <Button onClick={() => {
              setClicked(!clicked);
              }}>
             {text}
            </Button>
            </Box>
        </Box>
        
    );
}

export default CustomButton;