import { ThemeProvider } from "@emotion/react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, CssBaseline, Grid, ListItemButton, Paper, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from "@material-ui/core"
import { commonClasses } from "../Util/CommonClasses";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import MyPopup from "./Popup";

import React, { useEffect, useState, useRef } from "react";
import MyDropdown from "./Dropdown";

export default function MoveEditorPage() {


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
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}