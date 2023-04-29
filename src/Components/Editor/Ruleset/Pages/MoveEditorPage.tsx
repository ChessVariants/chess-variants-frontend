import { ThemeProvider } from "@emotion/react";
import { Button, Container, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { commonClasses } from "../../../Util/CommonClasses";
import CustomDarkTheme from "../../../Util/CustomDarkTheme";
import { useNavigate } from "react-router-dom";
import MyDropdown from "../Components/Dropdown";
import ListWithPopup from "../Components/ListWithPopup";
import PositionCreatorPopup from "../Components/PositionCreatorPopup";
import ActionList from "../Components/ActionList";
import SavePopup from "../Components/SavePopup";

import React, { useState } from "react";

type PositionInfo = AbsoluteInfo | RelativeInfo;

type AbsoluteInfo = {
  coord: string;
}

type RelativeInfo = {
  x: number;
  y: number;
  to: boolean;
}

type ActionDict = { [id: number]: ActionInfo }

type ActionInfo = ActionMoveInfo | ActionWin | ActionSetPieceInfo;

type ActionMoveInfo = {
  from: PositionInfo;
  to: PositionInfo;
}
type ActionSetPieceInfo = {
  at: PositionInfo;
}

type ActionWin = {
  whiteWins: boolean;
}


type MoveInfo = {
  posInfo: PositionInfo;
  actionDict: ActionDict;
  identifier: string;
  predicate: string;
  name: string;
  description: string;
}

export default function MoveEditorPage() {


  const classes = commonClasses();

  const [selectedOption, setSelectedOption] = useState('Standard Chess');

  const handleDropdownChange = (newSelectedOption: string) => {
    setSelectedOption(newSelectedOption);
  };

  const [isPositionCreatorOpen, setIsPositionCreatorOpen] = useState(false);
  const [saveWindowOpen, setSaveWindowOpen] = useState(false)

  const loadCondition = (itemClicked: string) => {
  };


  const navigate = useNavigate();
  const navigatePage = (link: string) => {
    navigate(link);
  }
  const [items, setItems] = useState(['Win', 'Move Piece', 'Set Piece']);

  const [isOpen, setIsOpen] = useState(false);
  const [positionCreatorInfo, setPositionCreatorInfo] = useState({ posInfo: { coord: "a1" }, id: 0, editingFrom: true });

  const [listJSON, setListJSON] = useState("")

  const [identifier, setIdentifier] = useState("")


  const saveEvent = (name: string, description: string) => {
    var info: MoveInfo = { posInfo: positionCreatorInfo.posInfo, actionDict: JSON.parse(listJSON), identifier: identifier, predicate: selectedOption, name, description }
    console.log(info)
}


  const resetPositionCreatorPopup = (id: number, editingFrom: boolean) => {
    setPositionCreatorInfo({ posInfo: { coord: "a1" }, id: 0, editingFrom: true })

  }

  const openPositionCreatorPopup = (id: number, editingFrom: boolean) => {
    resetPositionCreatorPopup(id, editingFrom)
    setIsOpen(true)
  }


  const savePositionCreatorToAction = (posInfo: PositionInfo) => {
    setIsOpen(false)
  }


  const positionInfoToString = (info: PositionInfo) => {
    if ('x' in info && 'y' in info && 'to' in info) {
      return (info.to ? 'to' : 'from') + "(" + info.x + ", " + info.y + ")";
    }
    else if ('coord' in info) {
      return info.coord;
    }
    return "";
  }


  const handleChangeIdentifier = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(event.target.value)
  }


  return (
    <div>
      <ThemeProvider theme={CustomDarkTheme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Paper className={classes.CenteredBasicCard}>
            <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 0, mt: 0 }} fontSize={40}>Move Editor</Typography>
            <Grid container alignItems="center" justifyItems={"center"} justifyContent="center" sx={{ mb: 2, mt: 4 }}>
              <Grid >
                <Typography variant="h5" sx={{ letterSpacing: '2px' }}>Condition:</Typography>
              </Grid>
              <Grid sx={{ ml: 2 }}>
                <MyDropdown
                  options={['Standard Chess', 'Option 2', 'Option 3']}
                  defaultValue="Standard Chess"
                  onChange={handleDropdownChange}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyItems={"center"} justifyContent="center">
              <Grid>

              </Grid>
              <Grid sx={{ mr: 1 }}>
                <Typography variant="h5" sx={{ letterSpacing: '2px' }}>Click To:</Typography>
              </Grid>
              <Grid sx={{ mr: 1 }}>
                <Button variant="contained" color="createColor" style={{ height: '50px', width: '125px' }} onClickCapture={() => setIsOpen(true)} sx={{ mr: 1 }}>
                  {positionInfoToString(positionCreatorInfo.posInfo)}
                </Button>
              </Grid>
              <Grid sx={{ mr: 1 }}>
                <Typography variant="h5" sx={{ letterSpacing: '2px' }}>Piece Identifier:</Typography>
              </Grid>
              <Grid sx={{ mr: 1 }}>
                <TextField sx={{ width: 60, mr: 2 }} onChange={handleChangeIdentifier}>

                </TextField>
              </Grid>
            </Grid>
            <PositionCreatorPopup positionCreatorInfo={positionCreatorInfo} onSavePosition={() => savePositionCreatorToAction(positionCreatorInfo.posInfo)} isOpen={isOpen} resetPositionCreatorPopup={() => resetPositionCreatorPopup(0, true)} setIsOpen={setIsOpen} fixed={true} />
            <ListWithPopup title={"Actions"} type={"Action"} singleton={false} width="600px" height="400px" listComponent={ActionList} items={items} setItems={setItems} setListJSON={setListJSON}></ListWithPopup>
            <Button onClickCapture={() => saveEvent("","")}>
              Print
            </Button>
            <SavePopup isOpen={saveWindowOpen} setIsOpen={setSaveWindowOpen} save={saveEvent}></SavePopup>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}
