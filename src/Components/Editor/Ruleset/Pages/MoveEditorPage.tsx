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
import MyPopup from "../Components/Popup";
import CookieService, { Cookie } from "../../../../Services/CookieService";
import { getPredicates } from "./ConditionEditorPage";

import React, { useEffect, useState } from "react";
import { ActionDict, ActionDTO, ConditionInfo, ItemInfo, MoveDict, MoveDTO, PositionCreatorInfo, PositionDTO } from "../Types";

export async function getMoves(token: string): Promise<MoveDTO[]> {

  return fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/move", {
    method: "GET",
    headers: {
      'Accept': "application/json",
      'Authorization': `Bearer ${token}`,
    },
  }).then(o => o.json().then(o => o.events));

}


export default function MoveEditorPage() {



  const [positionCreatorInfo, setPositionCreatorInfo] = useState<PositionCreatorInfo>({ posInfo: { absolute: { coordinate: "a1" }, relative: null }, id: 0, editingFrom: true });

  const [identifier, setIdentifier] = useState("")


  const classes = commonClasses();

  const [selectedOption, setSelectedOption] = useState("Standard Chess");
  const [listJSON, setListJSON] = useState("");
  const [saveWindowOpen, setSaveWindowOpen] = useState(false)
  const [isMovePopupOpen, setIsMovePopupOpen] = useState(false)

  // SAVE POPUP
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [isPositionCreatorOpen, setIsPositionCreatorOpen] = useState(false);


  const navigate = useNavigate();
  const navigatePage = (link: string) => {
    navigate(link);
  }
  const [moves, setMoves] = useState<MoveDict>({});

  const [deleteMode, setDeleteMode] = useState(false);


  const openPopup = async (deleteMode: boolean) => {

    setDeleteMode(deleteMode);
    const movesTemp: MoveDTO[] = (await getMoves(token));

    let moveDict: MoveDict = {};
    movesTemp.map((item) => {
      moveDict[item.name] = item
    })

    setMoves(moveDict)
    setIsMovePopupOpen(true)
  }

  const saveMove = (name: string, description: string) => {
    var info: MoveDTO = { posInfo: positionCreatorInfo.posInfo, actions: Object.values(JSON.parse(listJSON)), identifier: identifier, predicate: selectedCondition, name, description }
    fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/move", {
      method: "POST",
      headers: {
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`,
        'Content-Type': "application/json",
      },
      body: JSON.stringify(info),
    }).then(o => console.log(o));

    console.log("posting: " + JSON.stringify(info))
  }

  const [items, setItems] = useState(['Win', 'Move Piece', 'Set Piece', 'Tie']);

  const [isConditionPopupOpen, setIsConditionPopupOpen] = useState(false);
  const [conditions, setConditions] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string>("")


  const selectCondition = (selectedItem: string) => {
    setSelectedCondition(selectedItem)
    setIsConditionPopupOpen(false)
  }

  useEffect(() => {

    const updateConditions = async () => {
      const predicatesTemp: ConditionInfo[] = (await getPredicates(token));
      setConditions(predicatesTemp.map((item) => item.name))
    }

    updateConditions();

  }, []);




  const resetPositionCreatorPopup = (id: number, editingFrom: boolean) => {
    setPositionCreatorInfo({ posInfo: { absolute: { coordinate: "a1" }, relative: null }, id: 0, editingFrom: true })

  }

  const openPositionCreatorPopup = (id: number, editingFrom: boolean) => {
    resetPositionCreatorPopup(id, editingFrom)
    setIsPositionCreatorOpen(true)
  }


  const savePositionCreatorToAction = (posInfo: PositionDTO) => {
    setIsPositionCreatorOpen(false)
  }
  const positionInfoToString = (info: PositionDTO) => {
    if (info.relative !== null) {
      return (info.relative.to ? 'to' : 'from') + "(" + info.relative.x + ", " + info.relative.y + ")";
    }
    else if (info.absolute !== null) {
      return info.absolute.coordinate;
    }
    return "";
  }

  const handleChangeIdentifier = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(event.target.value)
  }
  const [itemsAdded, setItemsAdded] = useState<ItemInfo[]>([]);

  const [actionDict, setActionDict] = useState<ActionDict>({});

  
  const updateMoves = async () => {

    const movesTemp: MoveDTO[] = (await getMoves(token));

    let moveDict: MoveDict = {};
     movesTemp.map((item) => {
        moveDict[item.name] = item
    })

    setMoves(moveDict)
}

  const selectMove = (itemClicked: string) => {
    if (deleteMode) {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/move/" + itemClicked, {
            method: "DELETE",
            headers: {
                'Accept': "application/json",
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
            },
        });
        updateMoves();

    }
    else {
        let retrievedInfo: MoveDTO = moves[itemClicked];
        setName(retrievedInfo.name);
        setDescription(retrievedInfo.description);
        setSelectedCondition(retrievedInfo.predicate);
        setItemsAdded(retrievedInfo.actions.map((dto, i) =>
            DTOToItemInfo(dto, i)
        ));
        let newDict: ActionDict = {}
        retrievedInfo.actions.map((dto, i) =>
            newDict[i] = dto
        )
        setActionDict(newDict)
        
    }
    setIsMovePopupOpen(false)
};



const DTOToItemInfo = (dto: ActionDTO, i: number): ItemInfo => {
    if (dto.move !== null) {
        return { name: "Move Piece", id: i }
    }
    if (dto.set !== null) {
        return { name: "Set Piece", id: i }
    }
    if (dto.win !== null) {
        return { name: "Win", id: i }
    }
    return { name: "Tie", id: i }
}
let token = CookieService.getInstance().get(Cookie.JwtToken)
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
                <Button variant="contained" color="joinColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 0 }} onClickCapture={() => setIsConditionPopupOpen(true)}>
                  {selectedCondition !== "" ? selectedCondition : "Select Condition"}
                </Button>
                <MyPopup isOpen={isConditionPopupOpen} setIsOpen={setIsConditionPopupOpen} title={"Select Condition"} onClickItem={(item: string) => selectCondition(item)} addedItems={[] as { name: string, id: number }[]} singleton={true} items={conditions} setItems={() => { }}></MyPopup>

              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyItems={"center"} justifyContent="center">
              <Grid>

              </Grid>
              <Grid sx={{ mr: 1 }}>
                <Typography variant="h5" sx={{ letterSpacing: '2px' }}>Click To:</Typography>
              </Grid>
              <Grid sx={{ mr: 1 }}>
                <Button variant="contained" color="createColor" style={{ height: '50px', width: '125px' }} onClickCapture={() => setIsPositionCreatorOpen(true)} sx={{ mr: 1 }}>
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
            <PositionCreatorPopup positionCreatorInfo={positionCreatorInfo} onSavePosition={() => savePositionCreatorToAction(positionCreatorInfo.posInfo)} isOpen={isPositionCreatorOpen} resetPositionCreatorPopup={() => resetPositionCreatorPopup(0, true)} setIsOpen={setIsPositionCreatorOpen} fixed={true} />
            <ListWithPopup title={"Actions"} type={"Action"} singleton={false} width="600px" height="400px" listComponent={ActionList} items={items} setItems={setItems} itemsAdded={itemsAdded} setItemsAdded={setItemsAdded} setListJSON={setListJSON} actionInfo={actionDict} setActionInfo={setActionDict}></ListWithPopup>
            <Grid container marginTop="12px" alignItems="right" justifyItems={"right"} justifyContent="right" >
              <Grid>
                <Button color={"createColor"} onClick={() => { }}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mr: 2, width: 150, p: 1 }}
                  onClickCapture={() => openPopup(false)}>
                  Load
                </Button>
              </Grid>
              <Grid>
                <Button color={"browserColor"} onClick={() => { }}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mr: 2, width: 150, p: 1 }}
                  onClickCapture={() => setSaveWindowOpen(true)}>
                  Save
                </Button>
              </Grid>
              <Grid>
                <Button color={"editorColor"} onClick={() => { }}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mr: 2, width: 150, p: 1 }}
                  onClickCapture={() => openPopup(true)}>
                  Delete
                </Button>
              </Grid>
            </Grid>
            <MyPopup isOpen={isMovePopupOpen} setIsOpen={setIsMovePopupOpen} title={(deleteMode ? "Delete" : "Load") + " Move"} onClickItem={(item: string) => { selectMove(item) }} addedItems={[] as { name: string, id: number }[]} singleton={true} items={[]} setItems={() => { }}></MyPopup>
            <SavePopup isOpen={saveWindowOpen} setIsOpen={setSaveWindowOpen} save={saveMove} name={name} setName={setName} description={description} setDescription={setDescription} type={"Move"}></SavePopup>

          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}
