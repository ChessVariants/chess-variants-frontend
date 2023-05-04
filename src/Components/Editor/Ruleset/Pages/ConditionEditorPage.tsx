import { ThemeProvider } from "@emotion/react";
import { Button, Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { commonClasses } from "../../../Util/CommonClasses";
import CustomDarkTheme from "../../../Util/CustomDarkTheme";
import MyPopup from "../Components/Popup";
import React, { useState } from "react";
import SavePopup from "../Components/SavePopup";
import CookieService, { Cookie } from "../../../../Services/CookieService";
import { ConditionDict, ConditionInfo, DeleteConditionInfo } from "../Types";

export async function getPredicates(token: string): Promise<ConditionInfo[]> {

  return fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/predicate", {
    method: "GET",
    headers: {
      'Accept': "application/json",
      'Authorization': `Bearer ${token}`,
    },
  }).then(o => o.json().then(o => o.predicates));

}

export default function ConditionEditorPage() {

  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);

  const [isConditionPopupOpen, setIsConditionPopupOpen] = useState(false);

  const [deleteMode, setDeleteMode] = useState(false);

  const [conditionCode, setConditionCode] = useState<string>("");

  const [conditions, setConditions] = useState<ConditionDict>({});


  // SAVE POPUP
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const classes = commonClasses();

  const terminalStyle = {
    fontFamily: 'Cascadia Code',
    fontSize: '16px',
    color: '#ffffff',
    lineHeight: '1.5',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    backgroundColor: 'rgba(0,0,0,.2)',
    left: 0,
    top: 0,
    bottom: 0,
    width: '1240px',
    height: '100px',
    textAlign: 'left' as const,
    resize: 'none' as const,
    userSelect: 'none' as const,
  };

  const codeEditorStyle = {
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
    width: '1200px',
    height: "500px",
    textAlign: 'left' as const,
    resize: 'none' as const,

  };


  const lineNumbersStyle = {
    fontFamily: 'Cascadia Code',
    fontSize: '16px',
    color: '#fffa',
    lineHeight: '1.5',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px 0 0 4px',
    backgroundColor: '#404040',
    left: 0,
    top: 0,
    bottom: 0,
    width: '40px',
    height: '500px',
    textAlign: 'right' as const,
    resize: 'none' as const,
    overflow: 'hidden',
    userSelect: 'none' as const,
  };


  const value = "last_move_duck = move_pred(last, name, DU)\nlast_move_white = move_pred(last, name, WHITE)\nthis_move_duck = move_pred(this, name, DU)\n\nfirst_m = move_pred(this, first_move)\n\nduck_move_rule = this_move_duck && last_move_white\nstandard_move_rule = !this_move_duck && (last_move_duck || first_m)\nmove_rule = duck_move_rule || standard_move_rule\n\nreturn = move_rule"

  const lines_ = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n"

  const lines = value.split('\n').map((line, index) => {
    return (
      <div key={index} style={{ height: '1.5em' }}>
        {index + 1}
      </div>
    );
  });
  let token = CookieService.getInstance().get(Cookie.JwtToken)


  const updateConditions = async () => {

    const predicatesTemp: ConditionInfo[] = (await getPredicates(token));

    let conditionDict: ConditionDict = {};
    predicatesTemp.map((item) => {
      conditionDict[item.name] = item
    })

    setConditions(conditionDict)
  }


  const openConditionPopup = (deleteMode: boolean) => {

    setDeleteMode(deleteMode);
    updateConditions();
    setIsConditionPopupOpen(true)

  }

  const selectCondition = (itemClicked: string) => {
    if (deleteMode) {
      let deleteConditionInfo: DeleteConditionInfo = { name: itemClicked };
      // DELETE CODE HERE
      fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/predicate/" + itemClicked, {
        method: "DELETE",
        headers: {
          'Accept': "application/json",
          'Authorization': `Bearer ${token}`,
          'Content-Type': "application/json",
        },
      });
      updateConditions();

    }
    else {
      let retrievedInfo: ConditionInfo = conditions[itemClicked];
      setName(retrievedInfo.name);
      setDescription(retrievedInfo.description);
      setConditionCode(retrievedInfo.code);
    }
    setIsConditionPopupOpen(false)
  };

  const saveCondition = (name: string, description: string) => {
    if(name === "" || conditionCode === "")
      return;

    let conditionInfo = { name: name, description: description, code: conditionCode };

    console.log(JSON.stringify(conditionInfo))
    fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/predicate", {
      method: "POST",
      headers: {
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`,
        'Content-Type': "application/json",
      },
      body: JSON.stringify(conditionInfo),
    }).then(o => console.log(o));


  }


  const handleChangeCondition = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConditionCode(event.target.value);
  }

  return (
    <div>
      <ThemeProvider theme={CustomDarkTheme}>
        <CssBaseline />
        <Container maxWidth="md" >
          <Paper className={classes.CenteredBasicCard}>
            <Typography variant="h4" sx={{ letterSpacing: '2px', mb: 1, mt: 1, fontSize: 30 }}>Condition Editor</Typography>

            <Grid container marginTop="12px" alignItems="left" justifyItems={"left"} justifyContent="center" >

              <div style={lineNumbersStyle}>
                {lines_}
              </div>
              <div>
                <textarea style={codeEditorStyle} spellCheck={false} onChange={handleChangeCondition} value={conditionCode}></textarea>
              </div>

            </Grid>

            <div style={terminalStyle}>
              Invalid type argument of move_pred predicate: 'captured_'
            </div>

            <Grid container marginTop="12px" alignItems="right" justifyItems={"right"} justifyContent="right" >
              <Grid>
                <Button color={"joinColor"} onClick={() => { }}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 0, mb: 0, mr: 2, width: 150, p: 1 }}>
                  &#9654; Compile
                </Button>
              </Grid><Grid>
                <Button color={"createColor"} onClick={() => openConditionPopup(false)}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 0, mb: 0, mr: 2, width: 150, p: 1 }}>
                  Load
                </Button>
              </Grid>
              <Grid>
                <Button color={"browserColor"} onClick={() => { }}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 0, mb: 0, mr: 2, width: 150, p: 1 }}
                  onClickCapture={() => setIsSavePopupOpen(true)}>
                  Save
                </Button>
              </Grid>
              <Grid>
                <Button color={"editorColor"} onClick={() => { }}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 0, mb: 0, width: 150, p: 1 }}
                  onClickCapture={() => openConditionPopup(true)}>
                  Delete
                </Button>
              </Grid>
            </Grid>

            <MyPopup isOpen={isConditionPopupOpen} setIsOpen={setIsConditionPopupOpen} title={(deleteMode ? "Delete" : "Load") + " Condition"} onClickItem={(item: string) => selectCondition(item)} addedItems={[] as { name: string, id: number }[]} singleton={true} items={Object.keys(conditions)} setItems={() => { }}></MyPopup>
          </Paper>
        </Container>

        <SavePopup isOpen={isSavePopupOpen} setIsOpen={setIsSavePopupOpen} save={saveCondition} name={name} setName={setName} description={description} setDescription={setDescription} type="Condition"></SavePopup>

      </ThemeProvider>
    </div>
  );
}
