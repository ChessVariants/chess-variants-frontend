import { ThemeProvider } from "@emotion/react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, CssBaseline, Grid, ListItemButton, Paper, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from "@material-ui/core"
import { commonClasses } from "../Util/CommonClasses";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import MyPopup from "./Popup";
import MyDropdown from "./Dropdown";
import ListWithPopup from "./ListWithPopup";
import React, { useEffect, useState, useRef } from "react";

export default function RuleSetEditorPage() {

  const classes = commonClasses();

  const [selectedOption, setSelectedOption] = useState('Option 1');

  const handleDropdownChange = (newSelectedOption: string) => {
    setSelectedOption(newSelectedOption);
  };


  const navigate = useNavigate();
  const navigatePage = (link: string) => {
    navigate(link);
  }
  const doNothing = () => {

  }

  const [specialMoves, setSpecialMoves] = useState(['En Passant', 'Castle King Side', 'Castle Queen Side', 'Double Pawn Move']);
  const [events, setEvents] = useState(['Promotion', 'Explosion']);
  const [stalemateEvents, setStalemateEvents] = useState(['Win If King Checked', 'Tie If King Not Checked']);

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
                <ListWithPopup title={"Special Moves"} type={"Move"} singleton={true} width="200px" height="200px" listComponent={MyList} items={specialMoves} setItems={setSpecialMoves}/>
                <Button variant="contained" color="createColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 1 }} onClickCapture={() => navigate("/editor/move")}>
                  Create Move
                </Button>
              </Grid>
              <Grid>
                <ListWithPopup title={"Events"} type={"Event"} singleton={true} width="200px" height="200px" listComponent={MyList} items={events} setItems={setEvents}/>
                <Button variant="contained" color="createColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 1 }} onClickCapture={() => navigate("/editor/event")}>
                  Create Event
                </Button>
              </Grid>
              <Grid>
                <ListWithPopup title={"Stalemate Events"} type={"Event"} singleton={true} width="200px" height="200px" listComponent={MyList} items={stalemateEvents} setItems={setStalemateEvents}/>
                <Button variant="contained" color="createColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 1 }} onClickCapture={() => navigate("/editor/event")}>
                  Create Event
                </Button>
              </Grid>
            </Grid>

            <Button color={"browserColor"} onClick={() => { }}
              type="submit"
              variant="contained"
              sx={{ mt: 4, mb: 0, width: 200, p: 1 }}>
              Save
            </Button>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}


interface MyListProps {
  items: { name: string, id: number }[];
  onRemoveItem: (newItem: { name: string, id: number }) => void;
  width: string | number;
  height: string | number;
}

function MyList({ items, onRemoveItem, width, height }: MyListProps) {


  return (<Paper variant="outlined" style={{ width: width, height: height, overflowY: 'auto', borderWidth: '5px', userSelect: 'none' }} sx={{ ml: 2, mr: 2 }}>
      <List>
          {items.map((item) => (
              <DefaultListItem item={item} onRemoveItem={onRemoveItem} />
          ))}
      </List>
  </Paper>);
}


interface DefaultListItemProps {
  item: { name: string, id: number };
  onRemoveItem: (newItem: { name: string, id: number }) => void;
}
function DefaultListItem({ item, onRemoveItem }: DefaultListItemProps) {
  const handleRemoveItem = (item: { name: string, id: number }) => {
      onRemoveItem(item);
  };

  return (<ListItem key={item.id}>
      <ListItemText primary={item.name + ", id: " + item.id} />
      <Button variant="contained" color="editorColor" style={{ height: '25px', width: '10px' }} onClickCapture={() => handleRemoveItem(item)}>
          -
      </Button>
  </ListItem>);
}
