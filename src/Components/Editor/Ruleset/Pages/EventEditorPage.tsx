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
import { getEvents } from "./RuleSetEditorPage"

import React, { useEffect, useState, useRef } from "react";
import { ActionDict, ActionDTO, ConditionInfo, EventDict, EventDTO, ItemInfo } from "../Types";


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
    const [events, setEvents] = useState<EventDict>({});

    const [deleteMode, setDeleteMode] = useState(false);


    const updateEvents = async () => {

        const eventsTemp: EventDTO[] = (await getEvents(token));

        let eventDict: EventDict = {};
        eventsTemp.map((item) => {
            eventDict[item.name] = item
        })

        setEvents(eventDict)
    }

    const openPopup = async (deleteMode: boolean) => {

        setDeleteMode(deleteMode);
        updateEvents();
        setIsEventPopupOpen(true)
    }


    const saveEvent = (name: string, description: string) => {
        var info: EventDTO = { name, description, predicate: selectedCondition, actions: Object.values(JSON.parse(listJSON)) }
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/event", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify(info),
        }).then(o => console.log(o));

        console.log("posting: " + JSON.stringify(info))
    }

    const [items, setItems] = useState(['Win', 'Move Piece', 'Set Piece', 'Tie']);

    const [isConditionPopupOpen, setIsConditionPopupOpen] = useState(false);
    const [conditions, setConditions] = useState<string[]>([]);
    const [selectedCondition, setSelectedCondition] = useState<string>("")
    const [actionInfo, setActionInfo] = useState<ActionDict>({});


    const selectCondition = (selectedItem: string) => {
        setSelectedCondition(selectedItem)
        setIsConditionPopupOpen(false)
    }

    const selectEvent = (itemClicked: string) => {
        if (deleteMode) {
            fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/event/" + itemClicked, {
                method: "DELETE",
                headers: {
                    'Accept': "application/json",
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json",
                },
            });
            updateEvents();

        }
        else {
            let retrievedInfo: EventDTO = events[itemClicked];
            setName(retrievedInfo.name);
            setDescription(retrievedInfo.description);
            setSelectedCondition(retrievedInfo.predicate);
            setItemsAdded(retrievedInfo.actions.map((dto, i) =>
                DTOToItemInfo(dto, i)
            ));
            let newDict: ActionDict = {}
            retrievedInfo.actions.map((dto, i) =>
                newDict[i] = dto
            )
            setActionInfo(newDict)
            
        }
        setIsEventPopupOpen(false)
    };



    const DTOToItemInfo = (dto: ActionDTO, i: number): ItemInfo => {
        if (dto.move !== null) {
            return { name: "Move Piece", id: i }
        }
        if (dto.set !== null) {
            return { name: "Set Piece", id: i }
        }
        if (dto.win !== null) {
            return { name: "Win", id: i }
        }
        return { name: "Tie", id: i }
    }
    let token = CookieService.getInstance().get(Cookie.JwtToken)

    useEffect(() => {

        const updateConditions = async () => {
            const predicatesTemp: ConditionInfo[] = (await getPredicates(token));
            setConditions(predicatesTemp.map((item) => item.name))
        }

        updateConditions();

    }, []);

    const [itemsAdded, setItemsAdded] = useState<ItemInfo[]>([]);

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

                        <ListWithPopup title={"Actions"} type={"Action"} singleton={false} width="600px" height="400px" listComponent={ActionList} items={items} setItems={setItems} itemsAdded={itemsAdded} setItemsAdded={setItemsAdded} setListJSON={setListJSON} actionInfo={actionInfo} setActionInfo={setActionInfo}></ListWithPopup>

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
                        <MyPopup isOpen={isEventPopupOpen} setIsOpen={setIsEventPopupOpen} title={(deleteMode ? "Delete" : "Load") + " Event"} onClickItem={(item: string) => { selectEvent(item) }} addedItems={[] as { name: string, id: number }[]} singleton={true} items={Object.keys(events)} setItems={() => { }}></MyPopup>
                        <SavePopup isOpen={saveWindowOpen} setIsOpen={setSaveWindowOpen} save={saveEvent} name={name} setName={setName} description={description} setDescription={setDescription} type={"Event"}></SavePopup>

                    </Paper>
                </Container>
            </ThemeProvider>
        </div >
    );
}