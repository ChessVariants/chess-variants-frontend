import { ThemeProvider } from "@emotion/react";
import { Button, Container, CssBaseline, Paper, Typography } from "@mui/material";
import { commonClasses } from "../../../Util/CommonClasses";
import CustomDarkTheme from "../../../Util/CustomDarkTheme";
import { useNavigate } from "react-router-dom";
import MyDropdown from "../Components/Dropdown";
import ListWithPopup from "../Components/ListWithPopup";
import ActionList from "../Components/ActionList";
import SavePopup from "../Components/SavePopup";

import React, { useEffect, useState, useRef } from "react";


type EventInfo = {
    actionDict: ActionDict
    predicate: string
    name: string
    description: string
}

export default function EventEditorPage() {

    const classes = commonClasses();

    const [selectedOption, setSelectedOption] = useState("Standard Chess");
    const [listJSON, setListJSON] = useState("");
    const [saveWindowOpen, setSaveWindowOpen] = useState(false)

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


    const saveEvent = (name: string, description: string) => {
        var info: EventInfo = { actionDict: JSON.parse(listJSON), predicate: selectedOption, name, description }
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
                        <Button onClickCapture={() => saveEvent("","")}>
                            Print
                        </Button>
                    <Button color={"browserColor"} onClick={() => { }}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 0, mb: 0, width: 150, p: 1 }}
                        onClickCapture={() => setSaveWindowOpen(true)}>
                        Save
                    </Button>
                    <SavePopup isOpen={saveWindowOpen} setIsOpen={setSaveWindowOpen} save={saveEvent}></SavePopup>
                    
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
