import { Button, InputAdornment, Popover, TextField, Typography } from "@mui/material";
import CustomDarkTheme from "../../Util/CustomDarkTheme";
import React from "react";


export default function Lobby(props: { gameID: string }) {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const { gameID } = props;
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(gameID);
        navigator.clipboard.writeText("localhost:3000/join/" + gameID);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <TextField
            sx={{
                width: "100%", maxWidth: '200px', marginTop: '10px',
                webkitUserSelect: 'all',
                mozUserSelect: 'all', /* Firefox */
                msUserSelect: 'all', /* IE10+/Edge */
                userSelect: 'all', /* Standard */
                color: CustomDarkTheme.palette.primary.light,
            }}
            defaultValue={gameID}
            required
            id="outlined-required"
            InputProps={{
                disabled: true,
                endAdornment: (
                    <InputAdornment position="end">
                        <Button color={"createColor"} onClick={handleClick}>
                            COPY URL</Button>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 2 }}>Link copied to clipboard</Typography>
                        </Popover>
                    </InputAdornment>
                ),
            }}
        />
    );

}

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}
