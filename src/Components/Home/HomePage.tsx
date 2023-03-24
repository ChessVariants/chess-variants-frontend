import { Button, Container, CssBaseline, Dialog, DialogTitle, Divider, Paper, Typography } from "@mui/material";
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@emotion/react";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import { commonClasses } from "../Util/CommonClasses";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Slide from '@mui/material/Slide';
import React from "react";
import LoginDialog from "../Account/Login/LoginDialog";
import Cookies from "universal-cookie";

/**
 * Slide animation function, used by dialog window
 * @param props 
 * @returns 
 */
function SlideUp(props: any) {
  const [direction, setDirection] = React.useState('down');

  return (
    <Slide
      {...props}
      direction={direction}
      onEntered={() => setDirection('down')}
      onExited={() => setDirection('up')}
    />
  );
}

export default function HomePage() {

  const [user, setUser] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const cookies = new Cookies()
    setUser(cookies.get('username') ? cookies.get('username') : "")
  }, [])

  useEffect(() => {
    if (user === "") {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [user])

  /**
     * Used to navigate to other pages
     */
  const navigate = useNavigate();
  const navigatePage = (link: string) => {
    navigate(link);
  }
  const closeDialog = () => {
    setOpen(false)
  }
  const classes = commonClasses();
  return (
    <ThemeProvider theme={CustomDarkTheme}>
      <CssBaseline />
      <Dialog open={open}>
        <LoginDialog clickFunction={closeDialog}></LoginDialog>
      </Dialog>
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
          <Button color={"browserColor"} onClick={() => {
            navigatePage("/browse")
          }}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 1, p: 2 }}>
            BROWSE VARIANTS
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

