
import { ThemeProvider } from "@emotion/react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, CssBaseline, Grid, ListItemButton, Paper, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from "@material-ui/core"
import { commonClasses } from "../Util/CommonClasses";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import MyPopup from "../Editor/Popup";
import MyDropdown from "./Dropdown";
import ListWithPopup from "./ListWithPopup";

import React, { useEffect, useState, useRef } from "react";

type PositionCreatorInfo = { posInfo: PositionInfo, id: number, editingFrom: boolean }

type PositionInfo = AbsoluteInfo | RelativeInfo;

type AbsoluteInfo = {
  coord: string;
}

type RelativeInfo = {
  x: number;
  y: number;
  to: boolean;
}

interface PositionCreatorPopupProps {
    positionCreatorInfo: PositionCreatorInfo;
    onSavePosition: () => void;
    isOpen: boolean;
    resetPositionCreatorPopup: () => void;
    setIsOpen: (open: boolean) => void;
    fixed: boolean;
  }
  
export default function PositionCreatorPopup({ positionCreatorInfo, onSavePosition, isOpen, resetPositionCreatorPopup, setIsOpen, fixed }: PositionCreatorPopupProps) {
  
    const classes = commonClasses();
  
    const [selectedOption, setSelectedOption] = useState("")
  
    const resetOptions = () => {
      resetPositionCreatorPopup()
    }
  
    const handleDropdownChange = (selectedOption: string) => {
      setSelectedOption(selectedOption);
  
      if (selectedOption === "Absolute")
        positionCreatorInfo.posInfo = { coord: "a1" }
      else
        positionCreatorInfo.posInfo = { x: 0, y: 0, to: false }
    }
  
    const handleSaveButton = () => {
      setSelectedOption("")
      onSavePosition();
    }
  
    const handleChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {
      if ('x' in positionCreatorInfo.posInfo)
        positionCreatorInfo.posInfo.x = parseInt(event.target.value)
    }
  
  
    const handleChangeY = (event: React.ChangeEvent<HTMLInputElement>) => {
      if ('y' in positionCreatorInfo.posInfo)
        positionCreatorInfo.posInfo.y = parseInt(event.target.value)
    }
  
    const handleChangeCoord = (event: React.ChangeEvent<HTMLInputElement>) => {
      if ('coord' in positionCreatorInfo.posInfo)
        positionCreatorInfo.posInfo.coord = event.target.value
    }
  
  
    const handleChangeRelativeTo = (value: string) => {
      if ('to' in positionCreatorInfo.posInfo)
        positionCreatorInfo.posInfo.to = value == "To" ? true : false;
    }
  
  
  
    return (
      <div>
        {isOpen && (
  
          <Container maxWidth="md" sx={{ zIndex: 200 }}>
            <Paper className={classes.CenteredBasicCard}>
              <div>
                <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 2, mb: 2, mt: 0, fontSize: 24 }}>Type</Typography>
                <Grid container alignItems="center" justifyItems={"center"} justifyContent="center" >
                  <MyDropdown
                    options={['Absolute', 'Relative']}
                    defaultValue=""
                    onChange={handleDropdownChange}
                  />
                  {selectedOption === "Relative" ?
                    (<div>
                      <Grid container alignItems="center" justifyItems={"center"} justifyContent="center" sx={{ mt: 2 }}>
                        <Grid>
                          <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 1, fontSize: 18 }}>X:</Typography>
                        </Grid>
                        <Grid>
                          <TextField sx={{ width: 60, mr: 2 }} onChange={handleChangeX}>
  
                          </TextField>
                        </Grid>
                        <Grid>
                          <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 1, fontSize: 18 }}>Y:</Typography>
                        </Grid>
                        <Grid>
  
                          <TextField sx={{ width: 60 }} onChange={handleChangeY}>
  
                          </TextField>
                        </Grid>
                      </Grid>
                      {
                        fixed ?
                          <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 1, fontSize: 18 }}></Typography>
                          :
                          <div>
                            <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 2, mb: 1, mt: 1, fontSize: 24 }}>Relative To</Typography>
                            <MyDropdown
                              options={['From', 'To']}
                              defaultValue="From"
                              onChange={handleChangeRelativeTo}
                            />
                          </div>
  
                      }
  
                    </div>)
                    : selectedOption === "Absolute" ?
                      (
                        <div>
                          <Typography variant="h4" sx={{ letterSpacing: '2px', mt: 2, fontSize: 24 }}>Coordinate:</Typography>
                          <Grid container alignItems="center" justifyItems={"center"} justifyContent="center" sx={{ mt: 1, mb: 1 }}>
                            <Grid>
                              <TextField sx={{ width: 120 }} onChange={handleChangeCoord}>
  
                              </TextField>
                            </Grid>
                          </Grid>
                        </div>
                      )
                      :
                      (<div></div>)
                  }
                </Grid>
                <Button color={"browserColor"} onClick={() => { }}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 0, width: 150, p: 1 }}
                  onClickCapture={() => handleSaveButton()}>
                  Save
                </Button>
              </div>
            </Paper>
          </Container>
        )}
      </div>);
  }
  