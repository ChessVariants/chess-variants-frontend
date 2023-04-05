import { ThemeProvider } from "@emotion/react";
import { Button, Container, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { commonClasses } from "../Util/CommonClasses";
import CustomDarkTheme from "../Util/CustomDarkTheme";

export default function PredicateEditorPage() {

    const classes = commonClasses();

    const terminalStyle = {
      fontFamily: 'Cascadia Code',
      fontSize: '16px',
      color: '#ffffff',
      lineHeight: '1.5',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px', // Round the top-left and bottom-left corners
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,.2)',
      left: 0, // Align the line numbers to the left of the textarea
      top: 0, // Align the line numbers to the top of the textarea
      bottom: 0, // Make the line numbers extend to the bottom of the textarea
      width: '840px', // Set the width of the line numbers column
      height: '100px',
      textAlign: 'left' as const, // Align the line numbers text to the right
      resize: 'none' as const,
      userSelect: 'none' as const, // Prevent the line numbers from being selected
    };
    
      
      const codeEditorStyle = {
        fontFamily: 'Cascadia Code',
        fontSize: '16px',
        color: '#ffffff',
        lineHeight: '1.5',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '0 4px 4px 0', // Round the top-left and bottom-left corners
        backgroundColor: 'rgba(0,0,0,.2)',
        left: 0, // Align the line numbers to the left of the textarea
        top: 0, // Align the line numbers to the top of the textarea
        bottom: 0, // Make the line numbers extend to the bottom of the textarea
        width: '800px', // Set the width of the line numbers column
        height: "502px",
        textAlign: 'left' as const, // Align the line numbers text to the right
        resize: 'none' as const,
        
      };
      

      const lineNumbersStyle = {
        fontFamily: 'Cascadia Code',
        fontSize: '16px',
        color: '#fffa',
        lineHeight: '1.5',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px 0 0 4px', // Round the top-left and bottom-left corners
        backgroundColor: '#404040',
        //position: 'absolute' as const, // Position the line numbers absolutely
        left: 0, // Align the line numbers to the left of the textarea
        top: 0, // Align the line numbers to the top of the textarea
        bottom: 0, // Make the line numbers extend to the bottom of the textarea
        width: '40px',
        height: '502px',
        textAlign: 'right' as const, // Align the line numbers text to the right
        resize: 'none' as const,
        overflow: 'hidden',
        userSelect: 'none' as const, // Prevent the line numbers from being selected
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

    return (
        <div>
        <ThemeProvider theme={CustomDarkTheme}>
            <CssBaseline />
            <Container maxWidth="md" >
            <Paper className={classes.CenteredBasicCard}>
            <Typography variant="h4" sx={{ letterSpacing: '2px', mb: 1, mt: 1, fontSize:30 }}>Predicate Editor</Typography>
                
            <Grid container marginTop="12px" alignItems="left" justifyItems={"left"} justifyContent="center" >
                
                <div style={lineNumbersStyle}>
                    {lines_}
                </div>
                <div>
                    <textarea style={codeEditorStyle} spellCheck={false} defaultValue={value}></textarea>
                </div>

            </Grid>
              <Typography variant="h5" align="left" sx={{ letterSpacing: '2px', mb: 1, mt: 2, fontSize:25}}>Terminal</Typography>
            <div style={terminalStyle}>
                 Invalid type argument of move_pred predicate: 'captured_'
            </div>


            <Grid container marginTop="12px" alignItems="center" justifyItems={"center"} justifyContent="center" >
                <Typography variant="h5" sx={{ letterSpacing: '1px', mb: 0, mt: 0, mr:2 }}>Name:</Typography>
                <Grid>
                <TextField sx={{mr:12, width:300}} spellCheck={false} defaultValue='Duck Chess Move Rule White'>
                </TextField>
                </Grid>
                
                <Grid>
                <Button color={"joinColor"} onClick={() => { }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 0, mb: 0, mr:2, width:150, p: 1 }}>
                    &#9654; Compile
                </Button>
                </Grid>
                <Grid>
                <Button color={"browserColor"} onClick={() => { }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 0, mb: 0, width:150, p: 1 }}>
                    Save
                </Button>
                </Grid>

            </Grid>
            </Paper>
            </Container>
        </ThemeProvider>
        </div>
    );
}
