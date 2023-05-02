import { Box, Button, Divider, FormGroup, FormLabel, Stack, Typography } from "@mui/material";
import EditorService from "../../../Services/EditorService";
import { ChangeEvent, useState } from "react";

export default function PatternInputs(props: { editorID: string }) {

    const editorService: EditorService = EditorService.getInstance();

    const { editorID } = props;

    const [xDir, setXDir] = useState('');
    const handleXDirChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (validateDirectionInput(newValue)) {
            setXDir(newValue);
        }
    };

    const [yDir, setYDir] = useState('');
    const handleYDirChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (validateDirectionInput(newValue)) {
            setYDir(newValue);
        }
    };

    const validateLengthInput = (input: string): boolean => {
        return input === "" || (/^([1-9]|1[0-9]|20)$/.test(input) && parseInt(input) <= 20);
    }

    const validateDirectionInput = (input: string): boolean => {
        return input === "" || input === "-" || (/^-?(0|[1-9][0-9]?)?$/.test(input) && parseInt(input) <= 20) && parseInt(input) >= -20;
    }

    const [minLength, setMinLength] = useState('');
    const handleMinLengthChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (validateLengthInput(newValue)) {
            setMinLength(newValue);
        }
    };

    const [maxLength, setMaxLength] = useState('');
    const handleMaxLengthChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (validateLengthInput(newValue)) {
            setMaxLength(newValue);
        }
    };

    const [xOffset, setXOffset] = useState('');
    const handleXOffsetChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (validateDirectionInput(newValue)) {
            setXOffset(newValue);
        }
    };

    const [yOffset, setYOffset] = useState('');
    const handleYOffsetChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (validateDirectionInput(newValue)) {
            setYOffset(newValue);
        }
    };

    const [rows, setRows] = useState('');
    const handleRowsChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (validateLengthInput(newValue)) {
            setRows(newValue);
        }
    };

    const [cols, setCols] = useState('');
    const handleColsChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        if (validateLengthInput(newValue)) {
            setCols(newValue);
        }
    };

    const isJumpPatternValid = xOffset.trim() !== "" && xOffset.trim() !== "-" && yOffset.trim() !== "" && yOffset.trim() !== "-" && (Number(xOffset.trim()) !== 0 || Number(yOffset.trim()) !== 0);
    const isRegularPatternValid = xDir.trim() !== "" && xDir.trim() !== "-" && yDir.trim() !== "" && yDir.trim() !== "-" && minLength.trim() !== "" && maxLength.trim() !== "" && (Number(xDir.trim()) !== 0 || Number(yDir.trim()) !== 0) && (Number(minLength) <= Number(maxLength));
    const isBoardSizeValid = rows.trim() !== "" && cols.trim() !== "";

    return (
        <Box >
            <Stack direction="column" spacing={1}>
                <FormGroup style={{ alignItems: "center" }}>
                    <FormLabel>
                        <Typography sx={{ textDecoration: 'underline', textUnderlineOffset: 5, fontSize: 20 }}>
                            Regular pattern
                        </Typography>
                    </FormLabel>
                    <div>
                        <label htmlFor="yDir">X direction:</label>
                        <input id="yDir" type="text" value={yDir} onChange={handleYDirChange} style={{ width: "25px", position: "relative", marginLeft: "10px" }} />
                    </div>
                    <div>
                        <label htmlFor="xDir">Y direction:</label>
                        <input id="xDir" type="text" value={xDir} onChange={handleXDirChange} style={{ width: "25px", position: "relative", marginLeft: "10px" }} />
                    </div>
                    <div>
                        <label htmlFor="minLength">Minimum length:</label>
                        <input id="minLength" type="text" value={minLength} onChange={handleMinLengthChange} style={{ width: "25px", position: "relative", marginLeft: "10px" }} />
                    </div>
                    <div>
                        <label htmlFor="maxLength">Maximum length:</label>
                        <input id="maxLength" type="text" value={maxLength} onChange={handleMaxLengthChange} style={{ width: "25px", position: "relative", marginLeft: "10px" }} />
                    </div>
                    <FormGroup row>
                        <Button disabled={!isRegularPatternValid} onClick={() => { editorService.addMovementPattern(editorID, Number(xDir), Number(yDir), Number(minLength), Number(maxLength)) }}>Add to Movement</Button>
                        <Button disabled={!isRegularPatternValid} onClick={() => { editorService.addCapturePattern(editorID, Number(xDir), Number(yDir), Number(minLength), Number(maxLength)) }}>Add to Captures</Button>
                    </FormGroup>
                    <Divider style={{ width: '80%' }}></Divider>
                </FormGroup>
                <FormGroup style={{ alignItems: "center" }}>
                    <FormLabel>
                        <Typography sx={{ textDecoration: 'underline', textUnderlineOffset: 5, fontSize: 20 }}>
                            Jump pattern
                        </Typography>
                    </FormLabel>
                    <div>
                        <label htmlFor="yOffset">X Offset:</label>
                        <input id="yOffset" type="text" value={yOffset} onChange={handleYOffsetChange} style={{ width: "25px", position: "relative", marginLeft: "10px" }} />
                    </div>
                    <div>
                        <label htmlFor="xOffset">Y Offset:</label>
                        <input id="xOffset" type="text" value={xOffset} onChange={handleXOffsetChange} style={{ width: "25px", position: "relative", marginLeft: "10px" }} />
                    </div>
                    <FormGroup row>
                        <Button disabled={!isJumpPatternValid} onClick={() => { editorService.addMovementPattern(editorID, Number(xOffset), Number(yOffset), -1, -1) }}>Add to Movement</Button>
                        <Button disabled={!isJumpPatternValid} onClick={() => { editorService.addCapturePattern(editorID, Number(xOffset), Number(yOffset), -1, -1) }}>Add to Captures</Button>
                    </FormGroup>
                    <Divider style={{ width: '80%' }}></Divider>
                </FormGroup>
                <FormGroup >
                    <FormLabel>
                        <Typography sx={{ textDecoration: 'underline', textUnderlineOffset: 5, fontSize: 20 }}>
                            Board size
                        </Typography>
                    </FormLabel>
                    <div>
                        <label htmlFor="rows">Rows:</label>
                        <input id="rows" type="text" value={rows} onChange={handleRowsChange} style={{ width: "25px", position: "relative", marginLeft: "10px" }} />
                    </div>
                    <div>
                        <label htmlFor="cols">Cols:</label>
                        <input id="cols" type="text" value={cols} onChange={handleColsChange} style={{ width: "25px", position: "relative", marginLeft: "10px" }} />
                    </div>
                    <Button disabled={!isBoardSizeValid} onClick={() => { editorService.setBoardSize(editorID, Number(rows), Number(cols)) }}>Update board size</Button>
                    <Divider style={{ width: '80%', alignSelf: 'center' }}></Divider>
                </FormGroup>
            </Stack>
        </Box>
    );

}

