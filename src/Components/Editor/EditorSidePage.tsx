import { Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { FormControl, Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from "../Util/CustomButton";
import EditorService from "../../Services/EditorService";
import { useState } from "react";


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

    const [xDir, setXDir] = useState('');
    const handleXDirChange = (event: SelectChangeEvent) => {
        setXDir(event.target.value);
    };

    const [yDir, setYDir] = useState('');
    const handleYDirChange = (event: SelectChangeEvent) => {
        setYDir(event.target.value);
    };
    
    const [minLength, setMinLength] = useState('');
    const handleMinLengthChange = (event: SelectChangeEvent) => {
        setMinLength(event.target.value);
    };

    const [maxLength, setMaxLength] = useState('');
    const handleMaxLengthChange = (event: SelectChangeEvent) => {
        setMaxLength(event.target.value);
    };

    return (
        <Box className={classes.Container}>
            <p>Settings</p>
            <CustomButton text={"Leave"} color={"blue"} height={"32px"}></CustomButton>
            <Button onClick={() => { editorService.addMovementPattern(Number(xDir), Number(yDir), Number(minLength), Number(maxLength)) }}>Add Pattern</Button>
            <Button onClick={() => { editorService.requestBoardState() }}>Request state</Button>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">X-direction</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={xDir}
                    label="xDir"
                    onChange={handleXDirChange}
                >
                    <MenuItem value={-1}>-1</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Y-direction</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={yDir}
                    label="xDir"
                    onChange={handleYDirChange}
                >
                    <MenuItem value={-1}>-1</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Minimum length</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={minLength}
                    label="minLength"
                    onChange={handleMinLengthChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>

                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Maximum length</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={maxLength}
                    label="maxLength"
                    onChange={handleMaxLengthChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );

}

