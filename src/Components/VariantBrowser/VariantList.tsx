import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Popover, TablePagination, Typography } from '@mui/material';
import CustomDarkTheme from '../Util/CustomDarkTheme';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

export function createData(
    creator: string,
    name: string,
    description: string,
    code: string,
    bookmarked: boolean,
) {
    return {
        creator,
        name,
        description,
        code,
        bookmarked,
    };
}

function Row(props: { row: ReturnType<typeof createData>, index: number }) {

    const { row, index } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(row.code);
        navigator.clipboard.writeText(row.code);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const navigatePage = (link: string, variantId: string) => {
        navigate(link, {
            state: {
                variantId: variantId,
            }
        });
    }


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'none' } }} style={index % 2 ? { background: CustomDarkTheme.palette.background.default } : { background: CustomDarkTheme.palette.background.paper[300] }}>
                {row.bookmarked ?
                    <TableCell align="center">
                        <StarIcon sx={{ color: CustomDarkTheme.palette.primary.light }} />
                    </TableCell>
                    : <TableCell align="left">{row.creator}</TableCell>
                }
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">
                    <Button color={"createColor"} onClick={handleClick}>
                        {row.code}</Button>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>Copied to clipboard</Typography>
                    </Popover></TableCell>
                <TableCell>
                    <Button
                        color={"createColor"}
                        onClick={() => { navigatePage("/new", row.code) }}
                        type="submit"
                        variant="contained">Play</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                ></TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function VariantList(props: { variants: ReturnType<typeof createData>[] }) {

    const { variants } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: "50vh" }}>
                <Table sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none"
                    }
                }} stickyHeader aria-label="Variant list">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Creator</TableCell>
                            <TableCell align="left">VariantName</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Code</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {variants.map((variant, index) => (
                            <Row key={variant.code} index={index} row={variant} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={variants.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
