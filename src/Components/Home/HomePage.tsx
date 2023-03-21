import { Button, Container, CssBaseline, Divider, Paper, Typography } from "@mui/material";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@emotion/react";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import { commonClasses } from "../Util/CommonClasses";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles<Theme>(theme => ({

}));
export default function HomePage() {

  /**
     * Used to navigate to other pages
     */
  const navigate = useNavigate();
  const navigatePage = (link: string) => {
    navigate(link);
  }

  const classes = commonClasses();
  return (
    <ThemeProvider theme={CustomDarkTheme}>
      <CssBaseline />
      <Container maxWidth="md" >
        <Paper className={classes.CenteredBasicCard}>
          <Typography variant="h5" sx={{ letterSpacing: '4px', mb: 2, mt: 1 }}>MAIN MENU</Typography>
          <Divider style={{ width: '100%' }}></Divider>
          <Button color={"joinColor"} onClick={() => {
            navigatePage("/join")
          }}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 1, p: 2 }}>
            &#9654; JOIN
          </Button>
          <Button color={"createColor"} onClick={() => {
            navigatePage("/new")
          }}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 1, p: 2 }}>
            CREATE MATCH
          </Button>
          <Button color={"editorColor"} onClick={() => {
          }}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 1, p: 2 }}>
            &#9998; CREATE NEW VARIANT
          </Button>
        </Paper>
      </Container>
    </ThemeProvider >
  );
}

