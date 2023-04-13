import { ThemeProvider } from "@emotion/react";
import { Button, Container, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { commonClasses } from "../Util/CommonClasses";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import CodeEditor from '@uiw/react-textarea-code-editor';
import MyPopup from "../Editor/Popup";
import React, { useState } from "react";

export default function ConditionEditorPage() {

  const [isOpen, setIsOpen] = useState(false);

  const [isLoadPopupOpen, setIsLoadPopupOpen] = useState(false);

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
    width: '300px',
    height: "300px",
    textAlign: 'left' as const,
    resize: 'none' as const,

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

  const loadCondition = (itemClicked: string) =>
  {
  };
  
  const [predicates, setPredicates] = useState(['Standard Chess Move Rule', 'Duck Chess Move Rule']);

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
                <textarea style={codeEditorStyle} spellCheck={false} defaultValue={value}></textarea>
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
                <Button color={"createColor"} onClick={() => { setIsLoadPopupOpen(true)}}
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
                  sx={{ mt: 0, mb: 0, width: 150, p: 1 }}
                  onClickCapture={() => setIsOpen(true)}>
                  Save
                </Button>
              </Grid>

            </Grid>

            <MyPopup isOpen={isLoadPopupOpen} setIsOpen={setIsLoadPopupOpen} type={"Predicate"} onClickItem={(item : string) => loadCondition(item)} addedItems={[] as  {name:string, id:number}[]} singleton={true} items={predicates} setItems={setPredicates}></MyPopup>
          </Paper>
        </Container>


        {isOpen && (

          <Container maxWidth="md" >
            <Paper className={classes.CenteredBasicCard}>
              <div>
                <Grid container alignItems="center" justifyItems={"center"} justifyContent="center" marginBottom={2}>
                  <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 2, mb: 1, mt: 1, fontSize: 18 }}>Name:</Typography>
                  <Grid>
                    <TextField>

                    </TextField>
                  </Grid>
                </Grid>
                <Typography variant="h4" sx={{ letterSpacing: '2px', mb: 2, mt: 1, fontSize: 18 }}>Description:</Typography>
                <div>
                  <textarea style={descriptionStyle} spellCheck={false}>

                  </textarea>
                </div>
                <Button color={"browserColor"} onClick={() => { }}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 1, mb: 0, width: 150, p: 1 }}
                  onClickCapture={() => setIsOpen(false)}>
                  Save
                </Button>
              </div>
            </Paper>
          </Container>
        )}
      </ThemeProvider>
    </div>
  );
}
