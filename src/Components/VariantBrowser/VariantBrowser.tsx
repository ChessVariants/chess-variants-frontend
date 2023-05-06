import { Box, Grid, Paper, Typography } from "@mui/material";
import VariantList, { createData } from "./VariantList";
export default function VariantBrowser() {

    const variants = [
        createData("", "Standard", "This is the normal variant of chess.", "standard", true),
        createData("", "CaptureTheKing", "Capture the king is variant based on standard", "captureTheKing", true),
        createData("", "AntiChess", "In this variant, you have to take the opponents pieces. First player to lose their pieces win", "antiChess", true),
        createData("", "DuckChess", "A chess variant where there is a piece that both players can move.", "duckChess", true),
        createData("user1", "Duckchess", "A chess variant where there is a piece that both players can move.", "h1jpas1", false),
        createData("user1", "Duckchess", "A chess variant where there is a piece that both players can move.", "h1jpas2", false),
    ];

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <Paper sx={{ maxWidth: '900px', width: "80%", p: 4 }}>
                <Typography variant={"h5"} sx={{ mt: 2, mb: 4, letterSpacing: "2px" }}>Variant Browser</Typography>
                <Grid></Grid>
                <VariantList variants={variants}></VariantList>
            </Paper>
        </Box>
    );
}

