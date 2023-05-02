import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import EditorService, { PatternState } from "../../../Services/EditorService";
import { Button, Container, Theme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PatternListCell from "./PatternListCell";

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

}));

const initialState: PatternState = {
    patterns: [],
};

export default function PatternList(props: { editorID: string }) {

    const editorService: EditorService = EditorService.getInstance()

    const classes = useStyles();

    const [patternState, setPatternState] = useState<PatternState>(initialState);

    const { editorID } = props;

    useEffect(() => {
        editorService.on("PatternAdded", (patternState: PatternState) => {
            setPatternState(patternState);
        })
    })

    return (
        <Container>
            <Paper className={classes.Container}>
                <h3>Movement patterns</h3>
                <TableContainer className={classes.scrollbar} component={Paper} style={{ overflow: "auto", height: 700 }}>
                    <Table size="small" style={{
                        width: "100%",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                    }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">X direction </TableCell>
                                <TableCell align="center">Y direction</TableCell>
                                <TableCell align="center">Min length</TableCell>
                                <TableCell align="center">Max length</TableCell>
                                <TableCell align="center">{<Button onClick={() => editorService.removeAllMovementPatterns(editorID)} >Remove all</Button>}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patternState.patterns.map((pattern) => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <PatternListCell editorID={editorID} xDir={pattern.xDir} yDir={pattern.yDir} minLength={pattern.minLength} maxLength={pattern.maxLength} attr={"xDir"} />
                                    <PatternListCell editorID={editorID} xDir={pattern.xDir} yDir={pattern.yDir} minLength={pattern.minLength} maxLength={pattern.maxLength} attr={"yDir"} />
                                    <PatternListCell editorID={editorID} xDir={pattern.xDir} yDir={pattern.yDir} minLength={pattern.minLength} maxLength={pattern.maxLength} attr={"minLength"} />
                                    <PatternListCell editorID={editorID} xDir={pattern.xDir} yDir={pattern.yDir} minLength={pattern.minLength} maxLength={pattern.maxLength} attr={"maxLength"} />

                                    <TableCell align="center">{<Button onClick={() => {
                                        editorService.removeMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength)
                                    }}
                                    > <DeleteIcon /></Button>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );

}

