import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import EditorService, { PatternState } from "../../Services/EditorService";
import { Button, Container, IconButton, Theme } from "@mui/material";
import { FormControl, FormGroup, Typography } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { maxHeaderSize } from "http";
import darkScrollbar from '@mui/material/darkScrollbar';


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
    }, [])

    return (
        <Container>
            <Paper className={classes.Container}>
                <h3>Movement patterns</h3>
                <TableContainer className={classes.scrollbar} component={Paper} style={{ overflow: "auto", height: 700}}>
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
                                    <TableCell align="center">
                                        <IconButton size="small" onClick={() => {
                                            editorService.removeMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength)
                                            editorService.addMovementPattern(editorID, pattern.xDir, pattern.yDir + 1, pattern.minLength, pattern.maxLength)
                                        }}>
                                            <ExpandLessIcon fontSize="inherit" />
                                        </IconButton>
                                        <Typography> {pattern.yDir} </Typography>
                                        <IconButton size="small" onClick={() => {
                                            editorService.removeMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength)
                                            editorService.addMovementPattern(editorID, pattern.xDir, pattern.yDir - 1, pattern.minLength, pattern.maxLength)
                                        }}>
                                            <ExpandMoreIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" onClick={() => {
                                            editorService.removeMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength)
                                            editorService.addMovementPattern(editorID, pattern.xDir + 1, pattern.yDir, pattern.minLength, pattern.maxLength)
                                        }}>
                                            <ExpandLessIcon fontSize="inherit" />
                                        </IconButton>
                                        <Typography> {pattern.xDir} </Typography>
                                        <IconButton size="small" onClick={() => {
                                            editorService.removeMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength)
                                            editorService.addMovementPattern(editorID, pattern.xDir - 1, pattern.yDir, pattern.minLength, pattern.maxLength)
                                        }}>
                                            <ExpandMoreIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" onClick={() => {
                                            editorService.removeMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength)
                                            editorService.addMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength + 1, pattern.maxLength)
                                        }}>
                                            <ExpandLessIcon fontSize="inherit" />
                                        </IconButton>
                                        <Typography> {pattern.minLength} </Typography>
                                        <IconButton size="small" onClick={() => {
                                            editorService.removeMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength)
                                            editorService.addMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength - 1, pattern.maxLength)
                                        }}>
                                            <ExpandMoreIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" onClick={() => {
                                            editorService.removeMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength)
                                            editorService.addMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength + 1)
                                        }}>
                                            <ExpandLessIcon fontSize="inherit" />
                                        </IconButton>
                                        <Typography> {pattern.maxLength} </Typography>
                                        <IconButton size="small" onClick={() => {
                                            editorService.removeMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength)
                                            editorService.addMovementPattern(editorID, pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength - 1)
                                        }}>
                                            <ExpandMoreIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
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

