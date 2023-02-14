import { Box } from "@mui/system";
import GameBoard from "./GameBoard";
import React from "react";



export default function MatchPage() {  

  return (
    <Box>
      <GameBoard row={8} col={8}></GameBoard>
    </Box>
  );
}
  