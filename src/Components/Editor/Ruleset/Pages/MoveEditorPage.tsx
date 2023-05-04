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
import { ConditionInfo, MoveInfo, PositionCreatorInfo, PositionDTO } from "../Types";


export default function MoveEditorPage() {

  const classes = commonClasses();


  const [isPositionCreatorOpen, setIsPositionCreatorOpen] = useState(false);
  const [saveWindowOpen, setSaveWindowOpen] = useState(false)

  const loadCondition = (itemClicked: string) => {
  };


  const navigate = useNavigate();
  const navigatePage = (link: string) => {
    navigate(link);
  }
  const [items, setItems] = useState(['Win', 'Move Piece', 'Set Piece', 'Tie']);

  const [isOpen, setIsOpen] = useState(false);
  const [positionCreatorInfo, setPositionCreatorInfo] = useState<PositionCreatorInfo>({ posInfo: { absolute: { coordinate: "a1" }, relative: null }, id: 0, editingFrom: true });

  const [listJSON, setListJSON] = useState("")

  const [identifier, setIdentifier] = useState("")
  const [isMovePopupOpen, setIsMovePopupOpen] = useState(false)

  // SAVE POPUP
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const saveMove = (name: string, description: string) => {
    var info: MoveInfo = { posInfo: positionCreatorInfo.posInfo, actionDict: JSON.parse(listJSON), identifier: identifier, predicate: selectedCondition, name, description }
    console.log(info)
  }


  const resetPositionCreatorPopup = (id: number, editingFrom: boolean) => {
    setPositionCreatorInfo({ posInfo: { absolute: { coordinate: "a1" }, relative: null }, id: 0, editingFrom: true })

  }

  const openPositionCreatorPopup = (id: number, editingFrom: boolean) => {
    resetPositionCreatorPopup(id, editingFrom)
    setIsOpen(true)
  }


  const savePositionCreatorToAction = (posInfo: PositionDTO) => {
    setIsOpen(false)
  }


  const positionInfoToString = (info: PositionDTO) => {
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

  const [deleteMode, setDeleteMode] = useState(false);

  const openPopup = (deleteMode: boolean) => {

    setDeleteMode(deleteMode);
    setIsMovePopupOpen(true)
  }


  const [isConditionPopupOpen, setIsConditionPopupOpen] = useState(false);
  const [conditions, setConditions] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string>("")


  const selectCondition = (selectedItem: string) => {
    setSelectedCondition(selectedItem)
    setIsConditionPopupOpen(false)
  }

  let token = CookieService.getInstance().get(Cookie.JwtToken)

  useEffect(() => {

    const updateConditions = async () => {
      const predicatesTemp: ConditionInfo[] = (await getPredicates(token));
      setConditions(predicatesTemp.map((item) => item.name))
    }

    updateConditions();

  }, []);


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
            <MyPopup isOpen={isMovePopupOpen} setIsOpen={setIsMovePopupOpen} title={(deleteMode ? "Delete" : "Load") + " Move"} onClickItem={(item: string) => { }} addedItems={[] as { name: string, id: number }[]} singleton={true} items={[]} setItems={() => { }}></MyPopup>
            <SavePopup isOpen={saveWindowOpen} setIsOpen={setSaveWindowOpen} save={saveMove} name={name} setName={setName} description={description} setDescription={setDescription} type={"Move"}></SavePopup>

          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}
