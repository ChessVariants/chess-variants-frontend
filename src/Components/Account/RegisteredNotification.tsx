import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function RegisteredNotification(props: { displayCondition: any, hideRegisteredNotification: any }) {

    let {
        displayCondition,
        hideRegisteredNotification,
    } = props;

    return (
        <Snackbar
        open={displayCondition()}
        onClose={hideRegisteredNotification}
        message="Registration successful! Please log in."
        autoHideDuration={15000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ClickAwayListenerProps={{ mouseEvent: false }}
        action={
            <IconButton size="small" color="inherit" onClick={hideRegisteredNotification}>
              <CloseIcon></CloseIcon>
            </IconButton>
          }
        ></Snackbar>
    );
}
