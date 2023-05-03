import { ThemeProvider } from "@emotion/react";
import { Button, Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { commonClasses } from "../../../Util/CommonClasses";
import CustomDarkTheme from "../../../Util/CustomDarkTheme";
import { useNavigate } from "react-router-dom";
import MyDropdown from "../Components/Dropdown";
import ListWithPopup from "../Components/ListWithPopup";
import ActionList from "../Components/ActionList";
import SavePopup from "../Components/SavePopup";
import MyPopup from "../Components/Popup";
import { getPredicates } from "./ConditionEditorPage";
import CookieService, { Cookie } from "../../../../Services/CookieService";

import React, { useEffect, useState, useRef } from "react";



export default function EventEditorPage() {

    const classes = commonClasses();

    const [selectedOption, setSelectedOption] = useState("Standard Chess");
    const [listJSON, setListJSON] = useState("");
    const [saveWindowOpen, setSaveWindowOpen] = useState(false)
    const [isEventPopupOpen, setIsEventPopupOpen] = useState(false)

    // SAVE POPUP
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

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





    const [deleteMode, setDeleteMode] = useState(false);

    const openPopup = (deleteMode: boolean) => {

        setDeleteMode(deleteMode);
        setIsEventPopupOpen(true)
    }
    type EventInfo = {
        actionDict: ActionDict
        predicate: string
        name: string
        description: string
    }

    type EventDTO = {
        name: string;
        description: string;
        predicate: string;
        actions: ActionDTO[];
    }

    type ActionDTO = {
        win?: WinDTO;
        set?: SetPieceDTO;
        move?: MovePieceDTO;
        isTie: boolean;
    }

    type WinDTO = {
        whiteWins: boolean;
    }
    type SetPieceDTO = {
        identifier: string;
        at: PositionDTO;
    }
    type MovePieceDTO = {
        from: PositionDTO;
        to: PositionDTO;
    }
    type PositionDTO = {
        positionAbsolute: PositionAbsoluteDTO;
        positionRelative: PositionRelativeDTO;
    }
    type PositionAbsoluteDTO = {
        coordinate: string;
    }
    type PositionRelativeDTO = {
        x: number;
        y: number;
        to: boolean;
    }

    const convertToDTO = (actionInfo: ActionInfo) : ActionDTO  => {
        let actionDTO : ActionDTO;
        if ('from' in actionInfo)
        {
            actionDTO.move = {
                from: actionInfo.from,
                to: actionInfo.to,
            }
        }
    }

    const getActionsFromDict = () => {

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


        let actionDict: ActionDict = JSON.parse(listJSON);
        let list = Object.values(actionDict)

        list.map((action) => {
            convertToDTO(action)
        });

        
    }

    const saveEvent = (name: string, description: string) => {
        if (name === "")
            return;

        let eventDTO = { name: name, description: description, predicate: selectedCondition, actions: getActionsFromDict() };

        console.log(JSON.stringify(conditionInfo))
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/predicate", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify(conditionInfo),
        }).then(o => console.log(o));
    }

    const saveEvent = (name: string, description: string) => {
        var info: EventInfo = { actionDict: JSON.parse(listJSON), predicate: selectedOption, name, description }
        console.log(info)
    }

    const [items, setItems] = useState(['Win', 'Move Piece', 'Set Piece', 'Tie']);


    type ConditionInfo = {
        name: string;
        description: string;
        code: string;
    }

    const [isConditionPopupOpen, setIsConditionPopupOpen] = useState(false);
    const [conditions, setConditions] = useState<string[]>([]);
    const [selectedCondition, setSelectedCondition] = useState<string>("")


    const selectCondition = (selectedItem: string) => {
        setSelectedCondition(selectedItem)
        setIsConditionPopupOpen(false)
    }

    let token = CookieService.getInstance().get(Cookie.JwtToken)

    useEffect(() => {

        const updateConditions = async () => {
            const predicatesTemp: ConditionInfo[] = (await getPredicates(token));
            setConditions(predicatesTemp.map((item) => item.name))
        }

        updateConditions();

    }, []);

    return (
        <div>
            <ThemeProvider theme={CustomDarkTheme}>
                <CssBaseline />
                <Container maxWidth="md">
                    <Paper className={classes.CenteredBasicCard}>
                        <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 0, mt: 0 }} fontSize={40}>Event Editor</Typography>
                        <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 2, mt: 4 }}>Condition:</Typography>
                        <Button variant="contained" color="joinColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 0 }} onClickCapture={() => setIsConditionPopupOpen(true)}>
                            {selectedCondition !== "" ? selectedCondition : "Select Condition"}
                        </Button>
                        <MyPopup isOpen={isConditionPopupOpen} setIsOpen={setIsConditionPopupOpen} title={"Select Condition"} onClickItem={(item: string) => selectCondition(item)} addedItems={[] as { name: string, id: number }[]} singleton={true} items={conditions} setItems={() => { }}></MyPopup>

                        <ListWithPopup title={"Actions"} type={"Action"} singleton={false} width="600px" height="400px" listComponent={ActionList} items={items} setItems={setItems} setListJSON={setListJSON}></ListWithPopup>

                        <Grid container marginTop="12px" alignItems="right" justifyItems={"right"} justifyContent="right" >
                            <Grid>
                                <Button color={"createColor"} onClick={() => { }}
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 2, mr: 2, width: 150, p: 1 }}
                                    onClickCapture={() => openPopup(false)}>
                                    Load
                                </Button>
                            </Grid>
                            <Grid>
                                <Button color={"browserColor"} onClick={() => { }}
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 2, mr: 2, width: 150, p: 1 }}
                                    onClickCapture={() => setSaveWindowOpen(true)}>
                                    Save
                                </Button>
                            </Grid>
                            <Grid>
                                <Button color={"editorColor"} onClick={() => { }}
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 2, mb: 0, width: 150, p: 1 }}
                                    onClickCapture={() => openPopup(true)}>
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                        <MyPopup isOpen={isEventPopupOpen} setIsOpen={setIsEventPopupOpen} title={(deleteMode ? "Delete" : "Load") + " Event"} onClickItem={(item: string) => { }} addedItems={[] as { name: string, id: number }[]} singleton={true} items={[]} setItems={() => { }}></MyPopup>
                        <SavePopup isOpen={saveWindowOpen} setIsOpen={setSaveWindowOpen} save={saveEvent} name={name} setName={setName} description={description} setDescription={setDescription} type={"Event"}></SavePopup>

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


type ActionInfo = ActionMoveInfo | ActionWin | ActionSetPieceInfo | ActionTie;

type ActionMoveInfo = {
  from: PositionInfo;
  to: PositionInfo;
}
type ActionSetPieceInfo = {
  at: PositionInfo;
  identifier: string;
}

type ActionWin = {
  whiteWins: boolean;
}

type ActionTie = {
  null: null
}

type PositionCreatorInfo = { posInfo: PositionInfo, id: number, editingFrom: boolean }

type ActionDict = { [id: number]: ActionInfo }
