
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { commonClasses } from "../../../Util/CommonClasses";
import MyDropdown from "./Dropdown";

import React, { useEffect, useState, useRef } from "react";
import { PositionCreatorInfo } from "../Types";



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
    {
      positionCreatorInfo.posInfo = { absolute: { coordinate: "a1" }, relative: null }
      setCoord("a1")
    }
    else {
      positionCreatorInfo.posInfo = { absolute: null, relative: { x: 0, y: 0, to: false } }
      setX("0");
      setY("0");
    }
  }
  /*
    const handleChangePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = event.target;
      const regex = /^[a-t]([0-9]|1[0-9]|20)$/i;
      // Regex Explanation:
      // ^[a-t] - matches the first character from a to t
      // ([0-9]|1[0-9]|20) - matches any single digit number, any two-digit number starting with 1, or the number 20
      // $ - end of string
    
      if (regex.test(inputValue)) {
        setIdentifier(inputValue);
      }
    };*/

  const handleSaveButton = () => {
    setSelectedOption("")
    onSavePosition();
  }

  const [x, setX] = useState("0");
  const [y, setY] = useState("0");
  const [coord, setCoord] = useState("");

  const handleChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {

    const regex = /^-?(20|[0-1]?[0-9])?$/
    let val: string = (event.target.value)

    if (positionCreatorInfo.posInfo.relative !== null && (regex.test(val) || val === "")) {
      positionCreatorInfo.posInfo.relative.x = (val === "" || val === "-") ? 0 : parseInt(val)
      setX(val)
    }
  }
  const handleChangeY = (event: React.ChangeEvent<HTMLInputElement>) => {
                  
    const regex = /^-?(20|[0-1]?[0-9])?$/
    let val: string = (event.target.value)

    if (positionCreatorInfo.posInfo.relative !== null && (regex.test(val) || val === "")) {
      positionCreatorInfo.posInfo.relative.y = (val === "" || val === "-") ? 0 : parseInt(val)
      setY(val)
    }
  }
  const handleChangeCoord = (event: React.ChangeEvent<HTMLInputElement>) => {

    const regex =/^([a-t])([1-9]|[1-9][0-9]|20)?$/
    let val: string = (event.target.value)

    if (positionCreatorInfo.posInfo.absolute !== null && (regex.test(val) || val === "")) {
      positionCreatorInfo.posInfo.absolute.coordinate = val.length <= 1 ? "a1" : val
      setCoord(val)
    }
  }
  

  const handleChangeRelativeTo = (value: string) => {
    if (positionCreatorInfo.posInfo.relative !== null)
      positionCreatorInfo.posInfo.relative.to = value == "To" ? true : false;
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
                        <TextField sx={{ width: 60, mr: 2 }} onChange={handleChangeX} value={x}>

                        </TextField>
                      </Grid>
                      <Grid>
                        <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 1, fontSize: 18 }}>Y:</Typography>
                      </Grid>
                      <Grid>

                        <TextField sx={{ width: 60 }} onChange={handleChangeY} value={y}>

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
                            <TextField sx={{ width: 120 }} onChange={handleChangeCoord} value={coord}>

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
