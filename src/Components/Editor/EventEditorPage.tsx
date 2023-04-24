import { ThemeProvider } from "@emotion/react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, CssBaseline, Grid, ListItemButton, Paper, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from "@material-ui/core"
import { commonClasses } from "../Util/CommonClasses";
import CustomDarkTheme from "../Util/CustomDarkTheme";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import MyPopup from "../Editor/Popup";
import MyDropdown from "./Dropdown";
import ListWithPopup from "./ListWithPopup";
import ActionList from "./ActionList";
import PositionCreatorPopup from "./PositionCreatorPopup";

import React, { useEffect, useState, useRef } from "react";


type EventInfo = {
    actionDict: ActionDict
    predicate: string
}

export default function EventEditorPage() {

    const classes = commonClasses();

    const [selectedOption, setSelectedOption] = useState("Standard Chess");
    const [listJSON, setListJSON] = useState("");

    const handleDropdownChange = (newSelectedOption: string) => {
        setSelectedOption(newSelectedOption);
    };

    const [isPositionCreatorOpen, setIsPositionCreatorOpen] = useState(false);

    const loadCondition = (itemClicked: string) => {
    };


    const navigate = useNavigate();
    const navigatePage = (link: string) => {
        navigate(link);
    }


    const logInfo = () => {
        var info: EventInfo = { actionDict: JSON.parse(listJSON), predicate: selectedOption }
        console.log(info)
    }


    const [items, setItems] = useState(['Win', 'Move Piece', 'Set Piece']);

    return (
        <div>
            <ThemeProvider theme={CustomDarkTheme}>
                <CssBaseline />
                <Container maxWidth="md">
                    <Paper className={classes.CenteredBasicCard}>
                        <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 0, mt: 0 }} fontSize={40}>Event Editor</Typography>
                        <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 2, mt: 4 }}>Condition:</Typography>
                        <MyDropdown
                            options={['Standard Chess', 'Option 2', 'Option 3']}
                            defaultValue="Standard Chess"
                            onChange={handleDropdownChange}
                        />
                        <ListWithPopup title={"Actions"} type={"Action"} singleton={false} width="600px" height="400px" listComponent={ActionList} items={items} setItems={setItems} setListJSON={setListJSON}></ListWithPopup>
                        <Button onClickCapture={() => logInfo()}>
                            Print
                        </Button>
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>
    );
}

type ItemInfo = { name: string, id: number }

type ActionItemInfo = { itemInfo: ItemInfo, actionInfo: ActionInfo }

type PositionInfo = AbsoluteInfo | RelativeInfo;

type AbsoluteInfo = {
    coord: string;
}

type RelativeInfo = {
    x: number;
    y: number;
    to: boolean;
}

type ActionInfo = ActionMoveInfo | ActionWin | ActionSetPieceInfo;

type ActionMoveInfo = {
    from: PositionInfo;
    to: PositionInfo;
}
type ActionSetPieceInfo = {
    at: PositionInfo;
}

type ActionWin = {
    whiteWins: boolean;
}

type PositionCreatorInfo = { posInfo: PositionInfo, id: number, editingFrom: boolean }

type ActionDict = { [id: number]: ActionInfo }
