import { ThemeProvider } from "@emotion/react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, CssBaseline, Grid, ListItemButton, Paper, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from "@material-ui/core"
import { commonClasses } from "../Util/CommonClasses";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import MyPopup from "../Editor/Popup";

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
                <ListWithPopup title={"Special Moves"} type={"Move"}></ListWithPopup>
              </Grid>
              <Grid>
                <ListWithPopup title={"Events"} type={"Event"}></ListWithPopup>
              </Grid>
              <Grid>
                <ListWithPopup title={"Stalemate Events"} type={"Event"}></ListWithPopup>
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


interface ListWithPopupProps {
  title: string;
  type: string;
}


function ListWithPopup({ title, type }: ListWithPopupProps) {

  const [items, setItems] = useState([] as string[]);

  const [isOpen, setIsOpen] = useState(false);

  const handleAddItem = (newItem: string) => {
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (newItem: string) => {
    setItems(items.filter((item) => item !== newItem));
  };


  const handleClickItem = (itemClicked: string) => {
    if (!(items.some((item) => item === itemClicked))) {
      handleAddItem(itemClicked);
      setIsOpen(false);
    }
  };


  return (
    <div>
      <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 1, mt: 2 }}>{title}:</Typography>
      <MyList items={items} onRemoveItem={handleRemoveItem} />

      <div>
      <Button variant="contained" color="joinColor" style={{ height: '40px', width: '200px' }} onClickCapture={() => setIsOpen(true)} sx={{mt: 1, mr: 2, ml: 2}}>
        Add {type}
      </Button>
      </div>
      <div>
      <Button variant="contained" color="createColor" style={{ height: '40px', width: '200px'}} sx={{mt: 1}}>
        Create {type}
      </Button>
      </div>
      <MyPopup isOpen={isOpen} setIsOpen={setIsOpen} type={type} onClickItem={(item) => handleClickItem(item)} addedItems={items}></MyPopup>
    </div>
  );
}

interface MyListProps {
  items: string[];
  onRemoveItem: (newItem: string) => void;
}

function MyList({ items, onRemoveItem }: MyListProps) {

  const handleRemoveItem = (item: string) => {
    onRemoveItem(item);
  };

  return (<Paper variant="outlined" style={{ height: '200px', overflowY: 'auto', borderWidth: '5px', userSelect: 'none' }} sx={{ml: 2, mr: 2}}>
    <List>
      {items.map((item) => (
        <ListItem key={item}>
          <ListItemText primary={item} />
          <Button variant="contained" color="editorColor" style={{ height: '25px', width: '10px' }} onClickCapture={() => handleRemoveItem(item)}>
            -
          </Button>
        </ListItem>
      ))}
    </List>
  </Paper>);
}




interface MyDropdownProps {
  options: string[];
  defaultValue: string;
  onChange: (selectedOption: string) => void;
}

function MyDropdown({ options, defaultValue, onChange }: MyDropdownProps) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSelectedOption = event.target.value as string;
    setSelectedOption(newSelectedOption);
    onChange(newSelectedOption);
  };


  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
      },
      whiteText: {
        color: 'white',
        minWidth: 200,
        borderColor: 'white',
        '&:before': {
          borderColor: 'white',
          backgroundColor: '#505050',
          zIndex: -1,
          top: -5, // move the background color up
          left: -10, // extend the background color to the left
          right: -10, // extend the background color to the right
          bottom: -5, // move the background color down
        },
        '&:after': {
          borderColor: 'white',
        },

      },
      icon: {
        fill: 'white',
      },
    })
  );

  const classes = useStyles();


  return (
    <FormControl>
      <Select
        labelId="my-dropdown-label"
        id="my-dropdown"
        value={selectedOption}
        onChange={handleChange}
        className={classes.whiteText}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} className={classes.formControl} style={{ whiteSpace: 'normal' }}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}