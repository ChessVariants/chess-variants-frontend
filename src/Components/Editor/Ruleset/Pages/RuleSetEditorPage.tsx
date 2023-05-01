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



type RuleSetInfo = {
  name: string;
  description: string;
  condition: string;
  specialMoves: ItemInfo[];
  events: ItemInfo[];
  stalemateEvents: ItemInfo[];
}


type ItemInfo = { name: string, id: number }

export default function RuleSetEditorPage() {

  const classes = commonClasses();

  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [saveWindowOpen, setSaveWindowOpen] = useState(false);

  const [addedSpecialMoves, setAddedSpecialMoves] = useState([] as ItemInfo[]);
  const [addedEvents, setAddedEvents] = useState([] as ItemInfo[]);
  const [addedStalemateEvents, setAddedStalemateEvents] = useState([] as ItemInfo[]);
  const [ruleSetInfo, setRuleSetInfo] = useState({ name: "", description: "", condition: "", specialMoves: [], events: [], stalemateEvents: [] } as RuleSetInfo)

  const handleDropdownChange = (newSelectedOption: string) => {
    setSelectedOption(newSelectedOption);
  };


  const saveEvent = (name: string, description: string) => {
    setRuleSetInfo({ name: name, description: description, condition: selectedOption, specialMoves: addedSpecialMoves, events: addedEvents, stalemateEvents: addedStalemateEvents });
  }

  const navigate = useNavigate();
  const navigatePage = (link: string) => {
    navigate(link);
  }
  const doNothing = () => {

  }

  const [specialMoves, setSpecialMoves] = useState(['En Passant', 'Castle King Side', 'Castle Queen Side', 'Double Pawn Move']);
  const [events, setEvents] = useState(['Promotion', 'Explosion']);
  const [stalemateEvents, setStalemateEvents] = useState(['Win If King Checked', 'Tie If King Not Checked']);

  
  useEffect(() => {
    console.log(ruleSetInfo)
  }, [ruleSetInfo]);

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
                  <MyDropdown
                    options={['Standard Chess', 'Option 2', 'Option 3']}
                    defaultValue="Standard Chess"
                    onChange={handleDropdownChange}
                  />
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
                <ListWithPopup title={"Events"} type={"Event"} singleton={true} width="200px" height="200px" listComponent={MyList} items={events} setItems={setEvents} setListJSON={(json: string) => { setAddedEvents(JSON.parse(json)) }} />
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

            <Button color={"browserColor"} onClick={() => { }}
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 0, width: 150, p: 1 }}
              onClickCapture={() => setSaveWindowOpen(true)}>
              Save
            </Button>
            <SavePopup isOpen={saveWindowOpen} setIsOpen={setSaveWindowOpen} save={saveEvent}></SavePopup>
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

