
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
      positionCreatorInfo.posInfo = { absolute: { coordinate: "a1" }, relative: null }
    else
      positionCreatorInfo.posInfo = { absolute: null, relative: { x: 0, y: 0, to: false } }
  }

  const handleSaveButton = () => {
    setSelectedOption("")
    onSavePosition();
  }

  const handleChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (positionCreatorInfo.posInfo.relative !== null)
      positionCreatorInfo.posInfo.relative.x = parseInt(event.target.value)
  }


  const handleChangeY = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (positionCreatorInfo.posInfo.relative !== null)
      positionCreatorInfo.posInfo.relative.y = parseInt(event.target.value)
  }

  const handleChangeCoord = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (positionCreatorInfo.posInfo.absolute !== null)
      positionCreatorInfo.posInfo.absolute.coordinate = event.target.value
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
