import { ThemeProvider } from "@emotion/react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, CssBaseline, Grid, ListItemButton, Paper, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from "@material-ui/core"
import { commonClasses } from "../Util/CommonClasses";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState, useRef } from "react";



interface ListSelectableProps {
    items: string[];
    onClickItem: (newItem: string) => void;
    addedItems: string[];
  }
  
  function ListSelectable({ items, onClickItem, addedItems }: ListSelectableProps) {
  
    return (<Paper variant="outlined" style={{ height: '200px', overflowY: 'auto', borderWidth: '5px' }}>
      <List style={{ width: "300px" }}>
        {items.map((item) => (
          <ListItemButton key={item} onClickCapture={() => onClickItem(item)} sx={{
            color: addedItems.some((word) => item.includes(word))
              ? "#808080"
              : "white"
          }}>
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>
    </Paper>);
  }
  

  
type MyPopupProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
    onClickItem: (newItem: string) => void;
    addedItems: string[];
  }

  
export default function MyPopup({ isOpen, setIsOpen, type, onClickItem, addedItems }: MyPopupProps) {


    const classes = commonClasses();
  
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  
    const [clickedItemName, setClickedItemName] = useState('');
  
    const popupRef = useRef(null);
  
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (popupRef.current && !(popupRef.current as HTMLElement).contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [popupRef]);
  
    return (
      <div>
        <ThemeProvider theme={CustomDarkTheme}>
          {isOpen && (
            <Container maxWidth="md" ref={popupRef}>
              <Paper className={classes.CenteredBasicCard} sx={{ zIndex: 10 }}>
                <Grid>
                  <Grid>
                    <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 2, mt: 1, mr: 0, ml: 0 }}>{type}s</Typography>
                  </Grid>
                  <Grid>
                  </Grid>
                </Grid>
                <div>
  
                  <ListSelectable items={items} onClickItem={(item : string) => onClickItem(item)} addedItems={addedItems} />
                </div>
                    <Button color={"editorColor"} onClick={() => { }}
                      type="submit"
                      variant="contained"
                      sx={{ mr: -0, mt: 2, mb: 0, width: 100, p: 1}}
                      onClickCapture={() => setIsOpen(false)}
                    >
                      Close
                    </Button>
              </Paper>
            </Container>
          )}
        </ThemeProvider>
      </div>
    );
  }