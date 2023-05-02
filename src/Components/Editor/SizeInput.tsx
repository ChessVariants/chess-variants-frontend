import { Button, Divider, FormGroup, FormLabel, Typography } from "@mui/material";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { ChangeEvent, useState } from "react";
import EditorService from "../../Services/EditorService";


const useStyles = makeStyles<Theme>(({
    Container: {
        backgroundColor: "#2C2D2F",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display: "inline-block",
        color: "white",
    },
}));

export default function SizeInput(props: { editorID: string, context: string }) {

    const editorService: EditorService = EditorService.getInstance();

    const { editorID, context } = props;
    const classes = useStyles();

    const validateLengthInput = (input: string): boolean => {
        return input === "" || (/^([1-9]|1[0-9]|20)$/.test(input) && parseInt(input) <= 20);
    }

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

    const isBoardSizeValid = rows.trim() !== "" && cols.trim() !== "";

    return (
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
            <Button disabled={!isBoardSizeValid} onClick={() => {
                if(context === "PieceEditor")
                    editorService.setPieceEditorBoardSize(editorID, Number(rows), Number(cols))
                else
                    editorService.setBoardEditorBoardSize(editorID, Number(rows), Number(cols))
                }}>Update board size</Button>
        </FormGroup>
    );

}

