
import { ThemeProvider } from "@emotion/react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, CssBaseline, Grid, ListItemButton, Paper, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from "@material-ui/core"
import { commonClasses } from "../Util/CommonClasses";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useNavigate} from "react-router-dom";
import MyPopup from "../Editor/Popup";
import React, { useEffect, useState, useRef } from "react";

interface MyDropdownProps {
    options: string[];
    defaultValue: string;
    onChange: (selectedOption: string) => void;
  }
  
export default function MyDropdown({ options, defaultValue, onChange }: MyDropdownProps) {
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