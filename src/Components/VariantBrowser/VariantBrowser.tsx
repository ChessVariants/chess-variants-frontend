import { Box, Grid, Paper, Typography } from "@mui/material";
import VariantList, { createData } from "./VariantList";
import CookieService, { Cookie } from "../../Services/CookieService";
import { useEffect, useState } from "react";

type GetVariantsDTO = {
    variantInfos: VariantInfo[],
    variantAmount: number,
}

type VariantInfo = {
    name: string,
    description: string,
    code: string,
    creator: string,
}

async function getVariants(): Promise<VariantInfo[]> {
    return fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'api/variant', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CookieService.getInstance().get(Cookie.JwtToken)}`,
        'Accept': "application/json",
       },
    }).then(resp => resp.json().then(v => {console.log(v); return v.variantInfo as VariantInfo[]}));
  }

export default function VariantBrowser() {

    const [variants, setVariants] = useState<VariantInfo[]>([]);

    useEffect(() => {
        getVariants().then(v => setVariants(v));
    }, [])

    const constantVariants = [
        createData("", "Standard", "This is the normal variant of chess.", "standard", true),
        createData("", "CaptureTheKing", "Capture the king is variant based on standard", "captureTheKing", true),
        createData("", "AntiChess", "In this variant, you have to take the opponents pieces. First player to lose their pieces win", "antiChess", true),
        createData("", "DuckChess", "A chess variant where there is a piece that both players can move.", "duckChess", true),
    ];

    const createVariantData = (): ReturnType<typeof createData>[] => {
        let fetchedVariantData = variants.map(o => createData(o.creator, o.name, o.description, o.code, false));
        return constantVariants.concat(fetchedVariantData);
    }

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
                <VariantList variants={createVariantData()}></VariantList>
            </Paper>
        </Box>
    );
}

