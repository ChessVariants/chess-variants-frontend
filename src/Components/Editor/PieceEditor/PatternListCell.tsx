import TableCell from '@mui/material/TableCell';
import EditorService from "../../../Services/EditorService";
import { IconButton, Typography } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PatternListCell(props: { editorID: string, xDir: number, yDir: number, minLength: number, maxLength: number, attr: string }) {

    const editorService: EditorService = EditorService.getInstance()

    const { editorID, xDir, yDir, minLength, maxLength, attr } = props;

    const canIncrease = (): boolean => {
        switch (attr) {
            case "xDir": {
                if (yDir === -1 && xDir === 0)
                    return false;
                return yDir < 20;
            }
            case "yDir": {
                if (xDir === -1 && yDir === 0)
                    return false;
                return xDir < 20;
            }
            case "minLength": {
                if (minLength === -1) {
                    return false;
                }
                return minLength < maxLength;
            }
            case "maxLength": {
                if (maxLength === -1) {
                    return false;
                }
                return maxLength < 20;
            }
            default: return false;
        }
    };

    const canDecrease = (): boolean => {
        switch (attr) {
            case "xDir": {
                if (yDir === 1 && xDir === 0)
                    return false;
                return yDir > -20;
            }
            case "yDir": {
                if (xDir === 1 && yDir === 0)
                    return false;
                return xDir > -20;
            }
            case "minLength": {
                if (minLength === -1) {
                    return false;
                }
                return minLength > 1;
            }
            case "maxLength": {
                if (maxLength === -1) {
                    return false;
                }
                return maxLength > minLength;
            }
            default: return false;
        }
    };

    const handleIncrease = (): void => {
        switch (attr) {
            case "xDir": {
                editorService.removeMovementPattern(editorID, xDir, yDir, minLength, maxLength)
                editorService.addMovementPattern(editorID, xDir, yDir + 1, minLength, maxLength)
                break;
            }
            case "yDir": {
                editorService.removeMovementPattern(editorID, xDir, yDir, minLength, maxLength)
                editorService.addMovementPattern(editorID, xDir + 1, yDir, minLength, maxLength)
                break
            }
            case "minLength": {
                editorService.removeMovementPattern(editorID, xDir, yDir, minLength, maxLength)
                editorService.addMovementPattern(editorID, xDir, yDir, minLength + 1, maxLength)
                break;
            }
            case "maxLength": {
                editorService.removeMovementPattern(editorID, xDir, yDir, minLength, maxLength)
                editorService.addMovementPattern(editorID, xDir, yDir, minLength, maxLength + 1)
                break;
            }
        }
    }

    const handleDecrease = (): void => {
        switch (attr) {
            case "xDir": {
                editorService.removeMovementPattern(editorID, xDir, yDir, minLength, maxLength)
                editorService.addMovementPattern(editorID, xDir, yDir - 1, minLength, maxLength)
                break;
            }
            case "yDir": {
                editorService.removeMovementPattern(editorID, xDir, yDir, minLength, maxLength)
                editorService.addMovementPattern(editorID, xDir - 1, yDir, minLength, maxLength)
                break
            }
            case "minLength": {
                editorService.removeMovementPattern(editorID, xDir, yDir, minLength, maxLength)
                editorService.addMovementPattern(editorID, xDir, yDir, minLength - 1, maxLength)
                break;
            }
            case "maxLength": {
                editorService.removeMovementPattern(editorID, xDir, yDir, minLength, maxLength)
                editorService.addMovementPattern(editorID, xDir, yDir, minLength, maxLength - 1)
                break;
            }
        }
    }

    const getString = (): number => {
        switch (attr) {
            case "xDir": return yDir;
            case "yDir": return xDir;
            case "minLength": return minLength;
            case "maxLength": return maxLength;
            default: return 0;
        }
    }

    return (
        <TableCell align="center">
            <IconButton disabled={!canIncrease()} size="small" onClick={() => { handleIncrease() }}>
                <ExpandLessIcon fontSize="inherit" />
            </IconButton>
            <Typography> {getString()} </Typography>
            <IconButton disabled={!canDecrease()} size="small" onClick={() => { handleDecrease() }}>
                <ExpandMoreIcon fontSize="inherit" />
            </IconButton>
        </TableCell>
    );

}

