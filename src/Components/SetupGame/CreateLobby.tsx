import { Box, Button, Container, Divider, Grid, IconButton, MenuItem, Paper, Select, SelectChangeEvent, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { commonClasses } from "../Util/CommonClasses";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import useMediaQuery from '@mui/material/useMediaQuery';
import ClearIcon from "@mui/icons-material/Clear";
import GameService from "../../Services/GameService";



export default function CreateGame(props: { createGameFunction: any }) {

    const classes = commonClasses();
    const [selectVariant, setSelectVariant] = useState('standard');
    const [textFieldVariant, setTextFieldVariant] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const gameService = GameService.getInstance();

    const clearTextField = () => {
        setTextFieldVariant("");
        setSelectVariant("standard");
    };

    // Placeholder
    const tryCreateLobby = () => {
        if ("success") {
            if (textFieldVariant === "") {
                createLobby(selectVariant);
            }
            else {
                createLobby(textFieldVariant);
            }
        }
        else {
            setErrorMessage("Please enter a valid variant code!");
        }
    };
    const createLobby = (variantId: string) => {
        const gameID = (Math.random() + 1).toString(36).substring(5);
        gameService.sendCreateGame(gameID, variantId);
        props.createGameFunction(variantId);
    }

    const selectSetVariant = (event: SelectChangeEvent) => {
        setSelectVariant(event.target.value as string);
        setTextFieldVariant("");
    };

    const CMenuItem = styled(MenuItem)({
        '&.Mui-selected': {
            backgroundColor: CustomDarkTheme.palette.createColor.dark + " !important",
        }
    });


    return (
        <Container maxWidth="md" >
            <Paper className={classes.CenteredBasicCard}>
                <Typography variant={"h5"} sx={{ mt: 2, mb: 4, letterSpacing: "2px" }}>SELECT A VARIANT</Typography>
                <Grid container
                    maxWidth={useMediaQuery(CustomDarkTheme.breakpoints.up('md')) ? "9999px" : "160px"}
                >
                    <Grid item md={5} sm={12} xs={12}>
                        {textFieldVariant !== "" ?
                            <Typography color={CustomDarkTheme.palette.text.secondary}>PRESET</Typography>
                            :
                            <Typography color={CustomDarkTheme.palette.createColor.light}>PRESET</Typography>}
                        <Select
                            labelId="variant-select-label"
                            id="variant-select"
                            fullWidth
                            value={selectVariant}
                            onChange={selectSetVariant}
                            color={"createColor"}
                            autoFocus
                            sx={{
                                mt: 2, mb: 2, width: useMediaQuery(CustomDarkTheme.breakpoints.up('sm')) ? "160px" : "100%",
                            }}
                        >
                            <CMenuItem value={"standard"}>Standard</CMenuItem>
                            <CMenuItem value={"captureTheKing"}>CaptureTheKing</CMenuItem>
                            <CMenuItem value={"antiChess"}>AntiChess</CMenuItem>
                        </Select>
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        {useMediaQuery(CustomDarkTheme.breakpoints.up('md')) ?
                            <Divider orientation="vertical" sx={{ ml: 2, mr: 2, color: CustomDarkTheme.palette.text.secondary }}>
                                or</Divider>
                            :
                            <Divider sx={{ mb: 2, color: CustomDarkTheme.palette.text.secondary, width: "100%", maxWidth: "160px" }}>
                                or</Divider>}
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        {textFieldVariant === "" ?
                            <Typography color={CustomDarkTheme.palette.text.secondary}>CUSTOM VARIANT</Typography>
                            :
                            <Typography color={CustomDarkTheme.palette.createColor.light}>CUSTOM VARIANT</Typography>}
                        <TextField
                            focused={textFieldVariant === "" ? false : true}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTextFieldVariant(event.target.value);
                            }}
                            color={"createColor"}
                            margin="normal"
                            required
                            fullWidth
                            value={textFieldVariant}
                            id="variantID"
                            name="variantID"
                            autoComplete="variantID"
                            sx={{ mt: 2, mb: 2, maxWidth: "160px" }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={clearTextField}>
                                        <ClearIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <Button
                    color={"createColor"}
                    fullWidth
                    variant="contained"
                    onClick={tryCreateLobby}
                    sx={{ mt: 3, mb: 1, p: 1 }}
                >
                    CREATE LOBBY
                </Button>
                {
                    errorMessage ? <Box sx=
                        {{
                            color: CustomDarkTheme.palette.error.main,
                            fontSize: "12px",
                        }}>{errorMessage}</Box>
                        : null
                }
            </Paper>
        </Container>
    )
}

