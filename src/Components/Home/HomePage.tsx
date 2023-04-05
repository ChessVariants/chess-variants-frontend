import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { commonClasses } from "../Util/CommonClasses";
import { useNavigate } from "react-router-dom";
import Slide from '@mui/material/Slide';
import React from "react";
import EndScreen from "../Game/EndScreen";

export default function HomePage() {

  /**
     * Used to navigate to other pages
     */
  const navigate = useNavigate();


  const classes = commonClasses();
  return (
    <>
      <Container maxWidth="md">
        <Paper className={classes.CenteredBasicCard}>
          <Typography variant="h5" sx={{ letterSpacing: '4px', mb: 2, mt: 1 }}>MAIN MENU</Typography>
          <Divider style={{ width: '100%' }}></Divider>
          <Button color={"joinColor"} onClick={() => {
            navigate("/join");
          }}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 1, p: 2 }}>
            &#9654; JOIN
          </Button>
          <Button color={"createColor"} onClick={() => {
            navigate("/new");
          }}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 1, p: 2 }}>
            CREATE MATCH
          </Button>
          <Button color={"browserColor"} onClick={() => {
            navigate("/browse");
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
            &#9998; CREATE VARIANT
          </Button>
        </Paper>
      </Container>
    </>
  );
}

