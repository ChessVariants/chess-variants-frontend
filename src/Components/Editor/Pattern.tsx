import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import EditorService, { Patterns } from "../../Services/EditorService";
import { Box, Button, Theme, Typography } from "@mui/material";

const useStyles = makeStyles<Theme>(theme => ({
    Container: {
        backgroundColor: "#2C2D2F",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display: "inline-block",
        marginRight: "20px",
        width: "400",
    },

}));

const initialState: Patterns = {
    patterns: [],
};

export default function Pattern(props: { editorService: EditorService }) {

    const classes = useStyles();

    const [patternState, setPatternState] = useState<Patterns>(initialState);

    const { editorService } = props;

    useEffect(() => {

        editorService.on("PatternAdded", (patternState: Patterns) => {
            setPatternState(patternState);
        })
    }, [])


    return (
        <Box className={classes.Container}>
            <h3>Movement patterns</h3>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">X direction </TableCell>
                            <TableCell align="center">Y direction</TableCell>
                            <TableCell align="center">Min length</TableCell>
                            <TableCell align="center">Max length</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patternState.patterns.map((pattern) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{pattern.xDir}</TableCell>
                                <TableCell align="center">{pattern.yDir}</TableCell>
                                <TableCell align="center">{pattern.minLength}</TableCell>
                                <TableCell align="center">{pattern.maxLength}</TableCell>
                                <TableCell align="center">{<Button onClick={() => {editorService.removeMovementPattern(pattern.xDir, pattern.yDir, pattern.minLength, pattern.maxLength)}} >Remove</Button>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

}

