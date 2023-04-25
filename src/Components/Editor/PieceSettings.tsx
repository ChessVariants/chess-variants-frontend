import { Box, Button, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Switch } from "@mui/material";
import { FormControl } from "@material-ui/core";
import EditorService from "../../Services/EditorService";
import { ChangeEvent, useState } from "react";

export default function PieceSettings(props: { editorService: EditorService }) {

    const { editorService } = props;

    const handleSameCaptureAndMovement = (event: ChangeEvent<HTMLInputElement>) => {
        setSameCapMove(event.target.checked);
        editorService.setSameCaptureAsMovement(event.target.checked);
    };

    const handleCanBeCaptured = (event: ChangeEvent<HTMLInputElement>) => {
        setCanBeCaptured(false);
        editorService.canBeCaptured(event.target.checked);
    };

    const handleShowMovement = (event: ChangeEvent<HTMLInputElement>) => {
        var showMovement = true;
        if (event.target.value === "captures")
            showMovement = false;
        editorService.showMovement(showMovement);
    };

    const handleBelongsToPlayer = (event: ChangeEvent<HTMLInputElement>) => {
        setBelongsTo(event.target.value);
        editorService.belongsToPlayer(event.target.value);
    };

    const [repeat, setRepeat] = useState('0');
    const handleRepeatChange = (event: SelectChangeEvent) => {
        setRepeat(event.target.value);
        editorService.setRepeat(Number(event.target.value));
    };

    const [sameCapMove, setSameCapMove] = useState(true);
    const [canBeCaptured, setCanBeCaptured] = useState(true);
    const [belongsTo, setBelongsTo] = useState("white");

    return (
        <Box >
            <Stack direction="column" spacing={1}>
                <FormControl>
                    <InputLabel id="repeat-label" sx={{padding: '5px'}}>Repeat movement</InputLabel>
                    <Select
                        id="repeat-select"
                        value={repeat}
                        label="Age"
                        onChange={handleRepeatChange}
                        autoWidth={true}
                        sx={{ width: 75, height: 40, alignSelf: 'center' }}
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </FormControl>
                <FormGroup style={{ alignItems: "center" }} >
                    <FormGroup style={{ alignItems: "left" }} >
                        <FormControlLabel control={<Switch checked={sameCapMove} onChange={handleSameCaptureAndMovement} />} label="Same capture as movement" />
                        <FormControlLabel control={<Switch checked={canBeCaptured} onChange={handleCanBeCaptured} />} label="Can be captured" />
                    </FormGroup>
                    <FormControl>
                        <FormLabel id="movement-display-radio">Belongs to </FormLabel>
                        <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            value={belongsTo}
                        >
                            <FormControlLabel value="white" control={<Radio onChange={handleBelongsToPlayer} />} label="White" />
                            <FormControlLabel value="black" control={<Radio onChange={handleBelongsToPlayer} />} label="Black" />
                            <FormControlLabel value="shared" control={<Radio onChange={handleBelongsToPlayer} />} label="Shared" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="movement-display-radio">Display patterns</FormLabel>
                        <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            defaultValue="movement"
                        >
                            <FormControlLabel value="movement" control={<Radio onChange={handleShowMovement} />} label="Movements" />
                            <FormControlLabel value="captures" control={<Radio onChange={handleShowMovement} />} label="Captures" />
                        </RadioGroup>
                    </FormControl>
                </FormGroup>
                <FormGroup row style={{ justifyContent: "center" }}>
                    <Button
                        color={"browserColor"}
                        onClick={() => {
                            editorService.resetPiece();
                            setSameCapMove(true);
                            setCanBeCaptured(true);
                            setRepeat("0");
                            setBelongsTo("white");
                        }}
                        variant="contained"
                        sx={{ mt: 2, mb: 2, mr: 2, p: 2, width: "40%" }}
                    >
                        Reset Piece
                    </Button>
                    <Button
                        color={"createColor"}
                        onClick={() => { }}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, mb: 2, p: 2, width: "40%" }}
                    >
                        Build Piece
                    </Button>
                </FormGroup>
            </Stack>
        </Box>
    );

}

