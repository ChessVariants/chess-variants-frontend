import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { commonClasses } from "../../../Util/CommonClasses";
import React, { useState } from "react";

interface SavePopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void
  save: (name: string, description: string) => void
  name: string;
  setName: (newName: string) => void
  description: string;
  setDescription: (newDescription: string) => void
  type: string;
}

export default function SavePopup({ isOpen, setIsOpen, save, name, setName, description, setDescription, type }: SavePopupProps) {

  const classes = commonClasses();

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

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const handleSave = () => {
    setIsOpen(false);
    console.log("saving: " + name + ", " + description)
    save(name, description);
  }

  return <div>{isOpen && (

    <Container maxWidth="md" >
      <Paper className={classes.CenteredBasicCard}>
        <div>
          <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 2, mb: 1, mt: 1 }}>Save {type}</Typography>
          <Grid container alignItems="center" justifyItems={"center"} justifyContent="center" marginBottom={2}>
            <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 2, mb: 1, mt: 1, fontSize: 18 }}>Name:</Typography>
            <Grid>
              <TextField onChange={handleChangeName} value={name}>

              </TextField>
            </Grid>
          </Grid>
          <Typography variant="h4" sx={{ letterSpacing: '2px', mb: 2, mt: 1, fontSize: 18 }}>Description:</Typography>
          <div>
            <textarea style={descriptionStyle} spellCheck={false} onChange={handleChangeDescription} value={description}>

            </textarea>
          </div>
          <Button color={"browserColor"} onClick={() => { }}
            type="submit"
            variant="contained"
            sx={{ mt: 1, mr: 1, width: 150, p: 1 }}
            onClickCapture={() => handleSave()}>
            Save
          </Button>
          <Button color={"editorColor"} onClick={() => { }}
            type="submit"
            variant="contained"
            sx={{ mt: 1, mr: 0, width: 150, p: 1 }}
            onClickCapture={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </Paper>
    </Container>
  )}</div>;
}