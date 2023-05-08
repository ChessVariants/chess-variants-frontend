import { Button, Container, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { commonClasses } from "../../Util/CommonClasses";
import { useNavigate } from "react-router-dom";
import MyDropdown from "../Ruleset/Components/Dropdown";
import { useEffect, useState } from "react";
import { getRulesets } from "../Ruleset/HelperFunctions";
import { RuleSetDTO } from "../Ruleset/Types";
import CookieService, { Cookie } from "../../../Services/CookieService";
import RegisteredNotification from "../../Account/RegisteredNotification";

const descriptionStyle = {
  fontFamily: 'Cascadia Code',
  fontSize: '16px',
  color: '#ffffff',
  lineHeight: '1.5',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '0 4px 4px 0',
  backgroundColor: 'rgba(0,0,0,.2)',
  left: 0,
  top: 0,
  bottom: 0,
  width: '320px',
  height: "300px",
  textAlign: 'left' as const,
  resize: 'none' as const,
};

type SaveVariantDTO = {
  whiteRulesetIdentifier: string,
  blackRulesetIdentifier: string,
  movesPerTurn: number,
  name: string,
  description: string,
  boardIdentifier: string,
}

type BoardInfo = {
  name: string,
}

async function saveVariant(saveVariantDTO: SaveVariantDTO): Promise<Response> {
  return fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'api/variant', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${CookieService.getInstance().get(Cookie.JwtToken)}`,
      'Content-Type': "application/json",
     },
    body: JSON.stringify(saveVariantDTO)
  }).then();
}

async function getBoards(): Promise<BoardInfo[]> {
  return fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'api/board', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${CookieService.getInstance().get(Cookie.JwtToken)}`,
      'Accept': "application/json",
     },
  }).then(resp => resp.json().then(j => j.boardOptions as BoardInfo[]));
}

enum SaveState {
  NotInitiated,
  InProgress,
  Success,
  Failed,
}

export default function VariantEditor() {
  const [rulesets, setRulesets] = useState<RuleSetDTO[]>([]);
  const [boards, setBoards] = useState<BoardInfo[]>([]);
  const [whiteRuleset, setWhiteRuleset] = useState<string>("");
  const [blackRuleset, setBlackRuleset] = useState<string>("");
  const [movesPerTurn, setMovesPerTurn] = useState<number>(1);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [variantName, setVariantName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<SaveState>(SaveState.NotInitiated);

  const navigate = useNavigate();
  const navigatePage = (link: string) => {
    navigate(link);
  }
  
  useEffect(() => {
    getRulesets().then(rulesets => setRulesets(rulesets));
    getBoards().then(boards => setBoards(boards));
  }, [])

  const handleWhiteRulesetChange = (selectedOption: string) => {
    setWhiteRuleset(selectedOption);
  }

  const handleBlackRulesetChange = (selectedOption: string) => {
    setBlackRuleset(selectedOption);
  }

  const handleMovesPerTurnChange = (selectedOption: string) => {
    setMovesPerTurn(parseInt(selectedOption));
  }

  const handleBoardChange = (selectedOption: string) => {
    setSelectedBoard(selectedOption);
  }

  const handleVariantNameChange = (event: any) => {
    setVariantName(event.target.value);
  }

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  }

  const handleSave = () => {
    let saveVariantDTO = {
      whiteRulesetIdentifier: whiteRuleset,
      blackRulesetIdentifier: blackRuleset,
      movesPerTurn: movesPerTurn,
      name: variantName,
      description: description,
      boardIdentifier: selectedBoard,
    } as SaveVariantDTO;
    setSaveStatus(SaveState.InProgress);
    saveVariant(saveVariantDTO).then(success => {
      if (success) {
        setSaveStatus(SaveState.Success);
      } else {
        setSaveStatus(SaveState.Failed);
      }
    })
  }

  const getRulesetNames = () => {
    return rulesets.map(ruleset => ruleset.name);
  }

  const getBoardNames = () => {
    return boards.map(boards => boards.name);
  }

  // a function that returns an array of integers from 1 to n
  const getMovesPerTurnOptions = (maxTurns: number) => {
    return Array.from(Array(maxTurns).keys()).map(i => i + 1);
  }

  const allFieldsFilled = () => {
    return whiteRuleset !== "" && blackRuleset !== "" && movesPerTurn !== 0 && variantName !== "" && description !== "" && selectedBoard !== "";
  }


  const SaveButton = () => {
    switch (saveStatus) {
      case SaveState.NotInitiated:
        if (allFieldsFilled()) {
          return <Button color={"joinColor"} sx={{ mt: 2, width: 150, p: 1 }} onClick={handleSave} type="submit" variant="contained">Save</Button>
        } else {
          return <Button color={"joinColor"} sx={{ mt: 2, width: 150, p: 1 }} disabled type="submit" variant="contained">Fill all fields</Button>
        }
      case SaveState.InProgress:
        return <Button color={"joinColor"} sx={{ mt: 2, width: 150, p: 1 }} disabled type="submit" variant="contained">Saving...</Button>
      case SaveState.Success:
        return (<>
          <Button color={"joinColor"} sx={{ mt: 2, width: 150, p: 1 }} disabled type="submit" variant="contained">Saved!</Button>
          <Button color={"joinColor"} sx={{ mt: 2, width: 150, p: 1 }} variant="contained" onClick={() => navigatePage('/browse')}>Go To Play Menu!</Button>
          </>)
      case SaveState.Failed:
        return <Button color={"joinColor"} sx={{ mt: 2, width: 150, p: 1 }} disabled type="submit" variant="contained">Failed to save</Button>
    }
  }
  


  const classes = commonClasses();

  return (
    <Container>
      <Paper className={classes.CenteredBasicCard} sx={{ maxWidth: '500px', width: "80%" }}>
        <Typography variant="h5" sx={{ letterSpacing: '4px', mb: 2, mt: 1 }}>COMPILE VARIANT</Typography>
        <Divider style={{ width: '100%', marginBottom: '10px'}}></Divider>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ letterSpacing: '4px', mb: 2, mt: 1, fontSize: 18  }}>White ruleset</Typography>
            <MyDropdown options={getRulesetNames()} defaultValue="" onChange={handleWhiteRulesetChange}/>
            <Typography variant="h5" sx={{ letterSpacing: '4px', mb: 2, mt: 1, fontSize: 18  }}>Black ruleset</Typography>
            <MyDropdown options={getRulesetNames()} defaultValue="" onChange={handleBlackRulesetChange}/>
            <Typography variant="h5" sx={{ letterSpacing: '4px', mb: 2, mt: 1, fontSize: 18  }}>Board</Typography>
            <MyDropdown options={getBoardNames()} defaultValue="" onChange={handleBoardChange}/>
            <Typography variant="h5" sx={{ letterSpacing: '4px', mb: 1.67, mt: 1, fontSize: 18  }}>Moves per turn</Typography>
            <MyDropdown options={getMovesPerTurnOptions(10)} defaultValue="1" onChange={handleMovesPerTurnChange}/>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" sx={{ letterSpacing: '4px', mb: 2, mt: 1, fontSize: 18 }}>Name:</Typography>
            <TextField onChange={handleVariantNameChange} value={variantName}></TextField>
            <Typography variant="h4" sx={{ letterSpacing: '4px', mb: 2.33, mt: 1, fontSize: 18 }}>Description:</Typography>
            <TextField size="medium" onChange={handleDescriptionChange} value={description} multiline minRows={10} maxRows={10}></TextField>
          </Grid>
        </Grid>
        {SaveButton()}
      </Paper>
    </Container>
  );
}