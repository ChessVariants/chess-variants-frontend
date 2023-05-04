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
import { getPredicates } from "./ConditionEditorPage";
import MyPopup from "../Components/Popup";
import { ConditionInfo, EventDTO, EventDict, ItemInfo, RuleSetInfo } from "../Types";


export async function getEvents(token: string): Promise<EventDTO[]> {

  return fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/event", {
      method: "GET",
      headers: {
          'Accept': "application/json",
          'Authorization': `Bearer ${token}`,
      },
  }).then(o => o.json().then(o => o.events));

}

export default function RuleSetEditorPage() {

  const classes = commonClasses();

  const [saveWindowOpen, setSaveWindowOpen] = useState(false);
  const [isConditionPopupOpen, setIsConditionPopupOpen] = useState(false);
  const [isRuleSetPopupOpen, setIsRuleSetPopupOpen] = useState(false);

  const [addedSpecialMoves, setAddedSpecialMoves] = useState([] as ItemInfo[]);
  const [addedEvents, setAddedEvents] = useState([] as ItemInfo[]);
  const [addedStalemateEvents, setAddedStalemateEvents] = useState([] as ItemInfo[]);
  const [ruleSetInfo, setRuleSetInfo] = useState({ name: "", description: "", condition: "", specialMoves: [], events: [], stalemateEvents: [] } as RuleSetInfo)
  // SAVE POPUP
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');



  const saveRuleSet = (name: string, description: string) => {
    setRuleSetInfo({ name: name, description: description, condition: selectedCondition, specialMoves: addedSpecialMoves, events: addedEvents, stalemateEvents: addedStalemateEvents });
  }

  const navigate = useNavigate();
  const navigatePage = (link: string) => {
    navigate(link);
  }


  let token = CookieService.getInstance().get(Cookie.JwtToken)

  const updateEvents = async () => {

    const eventsTemp: EventDTO[] = (await getEvents(token));

    let eventDict: EventDict = {};
    eventsTemp.map((item) => {
      eventDict[item.name] = item
    })

    setEvents(eventDict)
  }



  const [specialMoves, setSpecialMoves] = useState(['En Passant', 'Castle King Side', 'Castle Queen Side', 'Double Pawn Move']);
  const [events, setEvents] = useState<EventDict>({});
  const [stalemateEvents, setStalemateEvents] = useState(['Win If King Checked', 'Tie If King Not Checked']);

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
    updateEvents();

  }, []);

  useEffect(() => {
    console.log(ruleSetInfo)
  }, [ruleSetInfo]);



  const [deleteMode, setDeleteMode] = useState(false);

  const openPopup = (deleteMode: boolean) => {

    setDeleteMode(deleteMode);
    setIsRuleSetPopupOpen(true)
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
                <ListWithPopup title={"Special Moves"} type={"Move"} singleton={true} width="200px" height="200px" listComponent={MyList} items={specialMoves} setItems={setSpecialMoves} setListJSON={(json: string) => { setAddedSpecialMoves(JSON.parse(json)) }} />
                <Button variant="contained" color="createColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 1 }} onClickCapture={() => navigate("/editor/move")}>
                  Create Move
                </Button>
              </Grid>
              <Grid>
                <ListWithPopup title={"Events"} type={"Event"} singleton={true} width="200px" height="200px" listComponent={MyList} items={Object.keys(events)} setItems={(t) => {}} setListJSON={(json: string) => { setAddedEvents(JSON.parse(json)) }} />
                <Button variant="contained" color="createColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 1 }} onClickCapture={() => navigate("/editor/event")}>
                  Create Event
                </Button>
              </Grid>
              <Grid>
                <ListWithPopup title={"Stalemate Events"} type={"Event"} singleton={true} width="200px" height="200px" listComponent={MyList} items={stalemateEvents} setItems={setStalemateEvents} setListJSON={(json: string) => { setAddedStalemateEvents(JSON.parse(json)) }} />
                <Button variant="contained" color="createColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 1 }} onClickCapture={() => navigate("/editor/event")}>
                  Create Event
                </Button>
              </Grid>
            </Grid>

            <Grid container marginTop="12px" alignItems="right" justifyItems={"right"} justifyContent="right" >
              <Grid>
                <Button color={"createColor"} onClick={() => setIsRuleSetPopupOpen(true)}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 0, mr: 2, width: 150, p: 1 }}
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
                <Button color={"editorColor"} onClick={() => setIsRuleSetPopupOpen(true)}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 0, mr: 2, width: 150, p: 1 }}
                  onClickCapture={() => openPopup(true)}>
                  Delete
                </Button>
              </Grid>
            </Grid>
            <MyPopup isOpen={isRuleSetPopupOpen} setIsOpen={setIsRuleSetPopupOpen} title={(deleteMode ? "Delete" : "Load") + " Ruleset"} onClickItem={(item: string) => { }} addedItems={[] as { name: string, id: number }[]} singleton={true} items={[]} setItems={() => { }}></MyPopup>

            <SavePopup isOpen={saveWindowOpen} setIsOpen={setSaveWindowOpen} save={saveRuleSet} name={name} setName={setName} description={description} setDescription={setDescription} type={"Ruleset"}></SavePopup>
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
    console.log("updated")
  }, [itemsAdded]);


  return (
    <Paper variant="outlined" style={{ width: width, height: height, overflowY: 'auto', borderWidth: '5px', userSelect: 'none' }} sx={{ ml: 2, mr: 2 }}>
      <List>
        {itemsAdded.map((item) => (
          <DefaultListItem item={item} onRemoveItem={onRemoveItem} />
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

