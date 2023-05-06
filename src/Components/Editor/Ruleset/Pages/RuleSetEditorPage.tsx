import { ThemeProvider } from "@emotion/react";
import { Button, Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { List, ListItem, ListItemText } from "@material-ui/core"
import { commonClasses } from "../../../Util/CommonClasses";
import CustomDarkTheme from "../../../Util/CustomDarkTheme";
import { useNavigate } from "react-router-dom";
import MyDropdown from "../Components/Dropdown";
import ListWithPopup from "../Components/ListWithPopup";
import { useEffect, useState } from "react";
import SavePopup from "../Components/SavePopup";
import CookieService, { Cookie } from "../../../../Services/CookieService";
import MyPopup from "../Components/Popup";
import { ConditionInfo, EventDTO, EventDict, ItemInfo, MoveDTO, MoveDict, RuleSetDTO, RuleSetDict } from "../Types";
import { deleteItem, getEvents, getMoves, getRulesets, postItem, updateDict, getPredicates } from "../HelperFunctions";


export default function RuleSetEditorPage() {

  const classes = commonClasses();

  // RULESET DICTIONARY
  const [ruleSetDict, setRuleSetDict] = useState<RuleSetDict>({});
  // RULESET INFO
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [specialMovesAdded, setSpecialMovesAdded] = useState<ItemInfo[]>([]);
  const [eventsAdded, setEventsAdded] = useState<ItemInfo[]>([]);
  const [stalemateEventsAdded, setStalemateEventsAdded] = useState<ItemInfo[]>([]);

  // RULESET INFO JSON
  const [addedSpecialMoves, setSpecialMovesAddedJSON] = useState("");
  const [addedEvents, setEventsAddedJSON] = useState("");
  const [addedStalemateEvents, setStalemateEventsAddedJSON] = useState("");

  // POPUP BOOLEANS
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [isConditionPopupOpen, setIsConditionPopupOpen] = useState(false);
  const [isRuleSetPopupOpen, setIsRuleSetPopupOpen] = useState(false);

  // DICTIONARIES FOR RETRIEVING INFORMATION ABOUT MOVES AND EVENTS
  const [moveDict, setMoveDict] = useState<MoveDict>({});
  const [eventDict, setEventDict] = useState<EventDict>({});
  const [stalemateEventDict, setStalemateEventDict] = useState<EventDict>({});

  // MOVE CONDITION
  const [conditions, setConditions] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string>("")

  // DELETE MODE FOR LOAD/DELETE POPUP
  const [deleteMode, setDeleteMode] = useState(false);

  const navigate = useNavigate();
  let token = CookieService.getInstance().get(Cookie.JwtToken)

  const saveRuleSet = (name: string, description: string) => {
    var ruleSetInfo = ({ name: name, description: description, predicate: selectedCondition, moves: JSON.parse(addedSpecialMoves).map((item: ItemInfo) => item.name), events: JSON.parse(addedEvents).map((item: ItemInfo) => item.name), stalemateEvents: JSON.parse(addedStalemateEvents).map((item: ItemInfo) => item.name) });
    postItem(ruleSetController, ruleSetInfo);
  }

  let ruleSetController = "ruleset";

  const selectRuleSet = (itemClicked: string) => {
    if (deleteMode) {
      deleteItem(ruleSetController, itemClicked);
      updateDict<RuleSetDTO>(getRulesets, setRuleSetDict);
    }
    else {
      let retrievedInfo: RuleSetDTO = ruleSetDict[itemClicked];
      setName(retrievedInfo.name);
      setDescription(retrievedInfo.description);
      setSelectedCondition(retrievedInfo.predicate);
      setSpecialMovesAdded(retrievedInfo.moves.map((move, i) => { return { name: move, id: i } }))
      setEventsAdded(retrievedInfo.events.map((event, i) => { return { name: event, id: i } }))
      setStalemateEventsAdded(retrievedInfo.stalemateEvents.map((event, i) => { return { name: event, id: i } }))
    }
    setIsRuleSetPopupOpen(false)
  };


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

    updateDict<EventDTO>(getEvents, setEventDict);
    updateDict<EventDTO>(getEvents, setStalemateEventDict);
    updateDict<MoveDTO>(getMoves, setMoveDict);

  }, []);



  const openPopup = (deleteMode: boolean) => {

    setDeleteMode(deleteMode);
    updateDict<RuleSetDTO>(getRulesets, setRuleSetDict);
    setIsRuleSetPopupOpen(true);
  }

  return (
    <div>
      <ThemeProvider theme={CustomDarkTheme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Paper className={classes.CenteredBasicCard}>

            <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 0, mt: 0 }} fontSize={40}>Ruleset Editor</Typography>

            <Grid container marginTop="12px" alignItems="left" justifyItems={"left"} justifyContent="center">
              <Grid>
                <Container >
                  <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 2, mt: 4 }}>Move Condition:</Typography>
                  <Button variant="contained" color="joinColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 0 }} onClickCapture={() => setIsConditionPopupOpen(true)}>
                    {selectedCondition !== "" ? selectedCondition : "Select Condition"}
                  </Button>
                  <MyPopup isOpen={isConditionPopupOpen} setIsOpen={setIsConditionPopupOpen} title={"Select Condition"} onClickItem={(item: string) => selectCondition(item)} addedItems={[] as { name: string, id: number }[]} singleton={true} items={conditions} setItems={() => { }}></MyPopup>

                  <div>
                    <Button color={"createColor"} onClick={() => { }}
                      type="submit"
                      variant="contained"
                      sx={{ mt: 4, mb: 0, width: 220, p: 1, maxWidth: 250 }}
                      onClickCapture={() => navigate("/editor/condition")}>
                      Create Condition
                    </Button>
                  </div>
                </Container>
              </Grid>
            </Grid>
            <Grid container marginTop="12px" alignItems="left" justifyItems={"left"} justifyContent="center" >
              <Grid>
                <ListWithPopup title={"Special Moves"} type={"Move"} singleton={true} width="200px" height="200px" listComponent={MyList} items={Object.keys(moveDict)} setItems={(t) => { }} itemsAdded={specialMovesAdded} setItemsAdded={setSpecialMovesAdded} setListJSON={(json: string) => { setSpecialMovesAddedJSON(json) }} actionInfo={{}} setActionInfo={(a) => { }} />
                <Button variant="contained" color="createColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 1 }} onClickCapture={() => navigate("/editor/move")}>
                  Create Move
                </Button>
              </Grid>
              <Grid>
                <ListWithPopup title={"Events"} type={"Event"} singleton={true} width="200px" height="200px" listComponent={MyList} items={Object.keys(eventDict)} setItems={(t) => { }} itemsAdded={eventsAdded} setItemsAdded={setEventsAdded} setListJSON={(json: string) => { setEventsAddedJSON(json) }} actionInfo={{}} setActionInfo={(a) => { }} />
                <Button variant="contained" color="createColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 1 }} onClickCapture={() => navigate("/editor/event")}>
                  Create Event
                </Button>
              </Grid>
              <Grid>
                <ListWithPopup title={"Stalemate Events"} type={"Event"} singleton={true} width="200px" height="200px" listComponent={MyList} items={Object.keys(stalemateEventDict)} setItems={(t) => { }} itemsAdded={stalemateEventsAdded} setItemsAdded={setStalemateEventsAdded} setListJSON={(json: string) => { setStalemateEventsAddedJSON(json) }} actionInfo={{}} setActionInfo={(a) => { }} />
                <Button variant="contained" color="createColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 1 }} onClickCapture={() => navigate("/editor/event")}>
                  Create Event
                </Button>
              </Grid>
            </Grid>

            <Grid container marginTop="12px" alignItems="right" justifyItems={"right"} justifyContent="right" >
              <Grid>
                <Button color={"createColor"}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 0, mr: 2, width: 150, p: 1 }}
                  onClickCapture={() => openPopup(false)}>
                  Load Ruleset
                </Button>
              </Grid>
              <Grid>
                <Button color={"browserColor"}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mr: 2, width: 150, p: 1 }}
                  onClickCapture={() => setIsSavePopupOpen(true)}>
                  Save Ruleset
                </Button>
              </Grid>
              <Grid>
                <Button color={"editorColor"}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 0, mr: 2, width: 150, p: 1 }}
                  onClickCapture={() => openPopup(true)}>
                  Delete Ruleset
                </Button>
              </Grid>
            </Grid>
            <MyPopup isOpen={isRuleSetPopupOpen} setIsOpen={setIsRuleSetPopupOpen} title={(deleteMode ? "Delete" : "Load") + " Ruleset"} onClickItem={(item: string) => { selectRuleSet(item) }} addedItems={[] as { name: string, id: number }[]} singleton={true} items={Object.keys(ruleSetDict)} setItems={() => { }}></MyPopup>

            <SavePopup isOpen={isSavePopupOpen} setIsOpen={setIsSavePopupOpen} save={saveRuleSet} name={name} setName={setName} description={description} setDescription={setDescription} type={"Ruleset"}></SavePopup>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}


interface MyListProps {
  itemsAdded: ItemInfo[];
  onRemoveItem: (newItem: ItemInfo) => void;
  width: string | number;
  height: string | number;
  setJSON: (json: string) => void
}

function MyList({ itemsAdded, onRemoveItem, width, height, setJSON }: MyListProps) {

  useEffect(() => {
    setJSON(JSON.stringify(itemsAdded));
  }, [itemsAdded]);


  return (
    <Paper variant="outlined" style={{ width: width, height: height, overflowY: 'auto', borderWidth: '5px', userSelect: 'none' }} sx={{ ml: 2, mr: 2 }}>
      <List>
        {itemsAdded.map((item) => (
          <DefaultListItem item={item} onRemoveItem={onRemoveItem} key={item.id} />
        ))}
      </List>
    </Paper>
  );
}


interface DefaultListItemProps {
  item: { name: string, id: number };
  onRemoveItem: (newItem: { name: string, id: number }) => void;
}
function DefaultListItem({ item, onRemoveItem }: DefaultListItemProps) {

  return (<ListItem key={item.id}>
    <ListItemText primary={item.name} />
    <Button variant="contained" color="editorColor" style={{ height: '25px', width: '10px' }} onClickCapture={() => onRemoveItem(item)}>
      -
    </Button>
  </ListItem>);
}

