import { Typography } from "@mui/material";
import GameService from "../../../Services/GameService";


export default function Lobby(props: { gameID: string }) {

    const gameService = GameService.getInstance();
    const { gameID } = props;

    return (
        <>
            <Typography sx={{ letterSpacing: '2px', mb: 1 }}>Variant Informatio Informatio</Typography>
            <Typography sx={{ letterSpacing: '2px', mb: 1 }}>Variant Informatio Informatio</Typography>
            <Typography sx={{ letterSpacing: '2px', mb: 1 }}>Variant Informatio Informatio</Typography>
            <Typography sx={{ letterSpacing: '2px', mb: 1 }}>Variant Informatio Informatio</Typography>
        </>
    );

}

