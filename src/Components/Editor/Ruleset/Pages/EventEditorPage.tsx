import { Button, Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { commonClasses } from "../../../Util/CommonClasses";
import CustomDarkTheme from "../../../Util/CustomDarkTheme";
import ListWithPopup from "../Components/ListWithPopup";
import ActionList from "../Components/ActionList";
import SavePopup from "../Components/SavePopup";
import MyPopup from "../Components/Popup";
import CookieService, { Cookie } from "../../../../Services/CookieService";

import React, { useEffect, useState, useRef } from "react";
import { ActionDict, ActionDTO, ConditionInfo, EventDict, EventDTO, ItemInfo } from "../Types";
import { deleteItem, postItem, getEvents, updateDict, getPredicates } from "../HelperFunctions";


export default function EventEditorPage() {

    const classes = commonClasses();

    const [actionsJSON, setActionsJSON] = useState("");

    // EVENT INFO
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [events, setEvents] = useState<EventDict>({});

    // POPUPS
    const [saveWindowOpen, setSaveWindowOpen] = useState(false);
    const [isEventPopupOpen, setIsEventPopupOpen] = useState(false);

    // ACTIONS THAT CAN BE ADDED
    const [items, setItems] = useState(['Win', 'Move Piece', 'Set Piece', 'Tie', 'Promotion']);

    // CONDITION INFO
    const [isConditionPopupOpen, setIsConditionPopupOpen] = useState(false);
    const [conditions, setConditions] = useState<string[]>([]);
    const [selectedCondition, setSelectedCondition] = useState<string>("");

    // ACTION DICTIONARY
    const [actionInfo, setActionInfo] = useState<ActionDict>({});

    // DELETE MODE FOR LOAD POPUP
    const [deleteMode, setDeleteMode] = useState(false);
    /*
        const updateEvents = async () => {
    
            const eventsTemp: EventDTO[] = (await getEvents());
    
            let eventDict: EventDict = {};
            eventsTemp.map((item) => {
                eventDict[item.name] = item
            })
    
            setEvents(eventDict)
        }
    */
    const openPopup = async (deleteMode: boolean) => {

        setDeleteMode(deleteMode);
        updateDict(getEvents, setEvents);
        setIsEventPopupOpen(true)
    }
    let eventController: string = "event";


    const saveEvent = (name: string, description: string) => {
        var info: EventDTO = { name, description, predicate: selectedCondition, actions: Object.values(JSON.parse(actionsJSON)) }
        postItem(eventController, info);

        console.log(info)
    }

    const selectCondition = (selectedItem: string) => {
        setSelectedCondition(selectedItem)
        setIsConditionPopupOpen(false)
    }

    const selectEvent = (itemClicked: string) => {
        if (deleteMode) {
            deleteItem(eventController, itemClicked);
            updateDict(getEvents, setEvents);
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
        console.log(dto);
        if (dto.move !== null) {
            return { name: "Move Piece", id: i }
        }
        if (dto.set !== null) {
            return { name: "Set Piece", id: i }
        }
        if (dto.win !== null) {
            return { name: "Win", id: i }
        }
        if (dto.tie) {
            return { name: "Tie", id: i }
        }
        return { name: "Promotion", id: i }
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
            <CssBaseline />
            <Container maxWidth="md">
                <Paper className={classes.CenteredBasicCard}>
                    <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 0, mt: 0 }} fontSize={40}>Event Editor</Typography>
                    <Typography variant="h5" sx={{ letterSpacing: '2px', mb: 2, mt: 4 }}>Condition:</Typography>
                    <Button variant="contained" color="joinColor" style={{ height: '40px', width: '200px' }} sx={{ mt: 0 }} onClickCapture={() => setIsConditionPopupOpen(true)}>
                        {selectedCondition !== "" ? selectedCondition : "Select Condition"}
                    </Button>
                    <MyPopup isOpen={isConditionPopupOpen} setIsOpen={setIsConditionPopupOpen} title={"Select Condition"} onClickItem={(item: string) => selectCondition(item)} addedItems={[] as { name: string, id: number }[]} singleton={true} items={conditions} setItems={() => { }}></MyPopup>

                    <ListWithPopup title={"Actions"} type={"Action"} singleton={false} width="600px" height="400px" listComponent={ActionList} items={items} setItems={setItems} itemsAdded={itemsAdded} setItemsAdded={setItemsAdded} setListJSON={setActionsJSON} actionInfo={actionInfo} setActionInfo={setActionInfo}></ListWithPopup>

                    <Grid container marginTop="12px" alignItems="right" justifyItems={"right"} justifyContent="right" >
                        <Grid>
                            <Button color={"createColor"} onClick={() => { }}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2, mr: 2, width: 150, p: 1 }}
                                onClickCapture={() => openPopup(false)}>
                                Load Event
                            </Button>
                        </Grid>
                        <Grid>
                            <Button color={"browserColor"} onClick={() => { }}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2, mr: 2, width: 150, p: 1 }}
                                onClickCapture={() => setSaveWindowOpen(true)}>
                                Save Event
                            </Button>
                        </Grid>
                        <Grid>
                            <Button color={"editorColor"} onClick={() => { }}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2, mb: 0, width: 150, p: 1 }}
                                onClickCapture={() => openPopup(true)}>
                                Delete Event
                            </Button>
                        </Grid>
                    </Grid>
                    <MyPopup isOpen={isEventPopupOpen} setIsOpen={setIsEventPopupOpen} title={(deleteMode ? "Delete" : "Load") + " Event"} onClickItem={(item: string) => { selectEvent(item) }} addedItems={[] as { name: string, id: number }[]} singleton={true} items={Object.keys(events)} setItems={() => { }}></MyPopup>
                    <SavePopup isOpen={saveWindowOpen} setIsOpen={setSaveWindowOpen} save={saveEvent} name={name} setName={setName} description={description} setDescription={setDescription} type={"Event"}></SavePopup>

                </Paper>
            </Container>
        </div >
    );
}