import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props: { open: any, setOpen: any, title: string, body: string, clickFunction: any }) {

    const { open, setOpen, title, body, clickFunction } = props;

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {body}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="joinColor" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={clickFunction}
                        color="joinColor"
                        autoFocus
                        variant="contained"
                    >
                        Resign
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
