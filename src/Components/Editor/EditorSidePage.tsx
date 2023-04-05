import { Accordion, AccordionSummary, Box, Button, Stack, Typography } from "@mui/material";
import { AccordionDetails, FormControl, Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import EditorService from "../../Services/EditorService";
import { ChangeEvent, useState } from "react";


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
    const handleXDirChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (newValue === "" || newValue === "-" || /^-?([01])$/.test(newValue)) {
            setXDir(newValue);
        }
    };

    const [yDir, setYDir] = useState('');
    const handleYDirChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (newValue === "" || newValue === "-" || /^-?([01])$/.test(newValue)) {
            setYDir(newValue);
        }
    };

    const [minLength, setMinLength] = useState('');
    const handleMinLengthChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (newValue === "" || /^(1?[1-9]|20)$/.test(newValue) && parseInt(newValue) <= 20) {
            setMinLength(newValue);
        }
    };

    const [maxLength, setMaxLength] = useState('');
    const handleMaxLengthChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (newValue === "" || /^(1?[1-9]|20)$/.test(newValue) && parseInt(newValue) <= 20) {
            setMaxLength(newValue);
        }
    };

    const [xOffset, setXOffset] = useState('');
    const handleXOffsetChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (newValue === "" || newValue === "-" || /^-?(0|[1-9][0-9]?)?$/.test(newValue) && parseInt(newValue) <= 20) {
            setXOffset(newValue);
        }
    };

    const [yOffset, setYOffset] = useState('');
    const handleYOffsetChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (newValue === "" || newValue === "-" || /^-?(0|[1-9][0-9]?)?$/.test(newValue) && parseInt(newValue) <= 20) {
            setYOffset(newValue);
        }
    };

    const [rows, setRows] = useState('');
    const handleRowsChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (newValue === "" || /^(1?[1-9]|20)$/.test(newValue) && parseInt(newValue) <= 20) {
            setRows(newValue);
        }
    };

    const [cols, setCols] = useState('');
    const handleColsChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (newValue === "" || /^(1?[1-9]|20)$/.test(newValue) && parseInt(newValue) <= 20) {
            setCols(newValue);
        }
    };

    const isJumpPatternValid = xOffset.trim() !== "" && xOffset.trim() !== "-" && yOffset.trim() !== "" && yOffset.trim() !== "-";
    const isRegularPatternValid = xDir.trim() !== "" && xDir.trim() !== "-" && yDir.trim() !== "" && yDir.trim() !== "-" && minLength.trim() !== "" && maxLength.trim() !== "";
    const isBoardSizeValid = rows.trim() !== "" && cols.trim() !== "";

    return (
        <Box className={classes.Container}>
            <h2>Create a new Piece</h2>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Regular Pattern</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl fullWidth>
                        <Stack spacing={2} alignItems="center">
                            <div>
                                <label htmlFor="xDir" style={{ display: "inline-block" }}>X direction:</label>
                                <input id="xDir" type="text" value={xDir} onChange={handleXDirChange} style={{ width: "20px", position: "relative", marginLeft: "10px" }} />
                            </div>
                            <div>
                                <label htmlFor="yDir" style={{ display: "inline-block" }}>Y direction:</label>
                                <input id="yDir" type="text" value={yDir} onChange={handleYDirChange} style={{ width: "20px", position: "relative", marginLeft: "10px" }} />
                            </div>
                            <div>
                                <label htmlFor="minLength" style={{ display: "inline-block" }}>Minimum length:</label>
                                <input id="minLength" type="text" value={minLength} onChange={handleMinLengthChange} style={{ width: "20px", position: "relative", marginLeft: "10px" }} />
                            </div>
                            <div>
                                <label htmlFor="maxLength" style={{ display: "inline-block" }}>Maximum length:</label>
                                <input id="maxLength" type="text" value={maxLength} onChange={handleMaxLengthChange} style={{ width: "20px", position: "relative", marginLeft: "10px" }} />
                            </div>
                            <Button disabled={!isRegularPatternValid} onClick={() => { editorService.addMovementPattern(Number(xDir), Number(yDir), Number(minLength), Number(maxLength)) }}>Add Pattern</Button>
                            <Button disabled={!isRegularPatternValid} onClick={() => { editorService.removeMovementPattern(Number(xDir), Number(yDir), Number(minLength), Number(maxLength)) }}>Remove Pattern</Button>
                        </Stack>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Jump pattern</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl fullWidth>
                        <Stack spacing={2} alignItems="center">
                            <div>
                                <label htmlFor="xOffset" style={{ display: "inline-block" }}>X Offset:</label>
                                <input id="xOffset" type="text" value={xOffset} onChange={handleXOffsetChange} style={{ width: "20px", position: "relative", marginLeft: "10px" }} />
                            </div>
                            <div>
                                <label htmlFor="yOffset" style={{ display: "inline-block" }}>Y Offset:</label>
                                <input id="yOffset" type="text" value={yOffset} onChange={handleYOffsetChange} style={{ width: "20px", position: "relative", marginLeft: "10px" }} />
                            </div>
                            <Button disabled={!isJumpPatternValid} onClick={() => { editorService.addMovementPattern(Number(xOffset), Number(yOffset), -1, -1) }}>Add Pattern</Button>
                            <Button disabled={!isJumpPatternValid} onClick={() => { editorService.removeMovementPattern(Number(xOffset), Number(yOffset), -1, -1) }}>Remove Pattern</Button>
                        </Stack>
                    </FormControl>

                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Set board size</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl fullWidth>
                        <Stack spacing={2} alignItems="center">
                            <div>
                                <label htmlFor="rows" style={{ display: "inline-block" }}>Rows:</label>
                                <input id="rows" type="text" value={rows} onChange={handleRowsChange} style={{ width: "20px", position: "relative", marginLeft: "10px" }} />
                            </div>
                            <div>
                                <label htmlFor="cols" style={{ display: "inline-block" }}>Cols:</label>
                                <input id="cols" type="text" value={cols} onChange={handleColsChange} style={{ width: "20px", position: "relative", marginLeft: "10px" }} />
                            </div>
                            <Button disabled={!isBoardSizeValid} onClick={() => { editorService.setBoardSize(Number(rows), Number(cols)) }}>Update board size</Button>
                        </Stack>
                    </FormControl>

                </AccordionDetails>
            </Accordion>

        </Box>
    );

}

