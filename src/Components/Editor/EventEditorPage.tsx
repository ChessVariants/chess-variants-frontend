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

import React, { useEffect, useState, useRef } from "react";

export default function EventEditorPage() {


    const classes = commonClasses();

    const [selectedOption, setSelectedOption] = useState('Option 1');

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
    const test = () => {

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
                        <ListWithPopup title={"Actions"} type={"Action"} singleton={false} width="600px" height="400px" listComponent={MyList} items={items} setItems={setItems}></ListWithPopup>
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

interface MyListProps {
    items: ItemInfo[];
    onRemoveItem: (newItem: ItemInfo) => void;
    width: string | number;
    height: string | number;
}

type PositionCreatorInfo = { posInfo: PositionInfo, id: number, editingFrom: boolean }


function MyList({ items, onRemoveItem, width, height }: MyListProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [positionCreatorInfo, setPositionCreatorInfo] = useState({ posInfo: { coord: "a1" }, id: 0, editingFrom: true } as PositionCreatorInfo);

    const [actionInfo, setActionInfo] = useState({} as { [id: number]: ActionInfo });

    useEffect(() => {
        localStorage.setItem('actionInfo', JSON.stringify(actionInfo));
    }, [actionInfo]);

    useEffect(() => {
        // This code will run only once, on mount,
        // and will retrieve the previous value of `data`
        const savedData = localStorage.getItem('actionInfo');
        if (savedData !== null) {
            setActionInfo(JSON.parse(savedData));
        }
    }, []);

    const isMoveAction = (info: ActionInfo) => {
        return 'from' in info && 'to' in info;
    }

    const resetPositionCreatorPopup = (id: number, editingFrom: boolean) => {
        setPositionCreatorInfo({ posInfo: { coord: "a1" }, id: id, editingFrom: editingFrom } as PositionCreatorInfo)

    }

    const openPositionCreatorPopup = (id: number, editingFrom: boolean) => {
        resetPositionCreatorPopup(id, editingFrom)
        setIsOpen(true)
    }

    const fromItemToActionInfo = (item: ItemInfo) => {
        if (item.name === "Win") {
            return { whiteWins: true } as ActionWin;
        }
        else if(item.name === "Move Piece")
        {
            return {
                from: { coord: "a1" },
                to: { coord: "a1" }
            } as ActionMoveInfo;
        }
        else
        {
            return {at: {coord: "a1"}} as ActionSetPieceInfo;
        }
    }

    const getActionInfo2 = (id: number) => {
        console.log("rerendered!")
        return getActionInfo(id);
    }
    const getActionInfo = (id: number) => {
        if (actionInfo[id] === undefined) {
            actionInfo[id] = fromItemToActionInfo(items[id])
            console.log("-----IS NULL----- id: " + id)
        }
        console.log(actionInfo[id])
        return actionInfo[id];
    }

    const savePositionCreatorToAction = (posInfo: PositionInfo) => {
        console.log("currentPosInfo: " + JSON.stringify(positionCreatorInfo.posInfo))
        positionCreatorInfo.posInfo = posInfo;
        console.log("newPosInfo: " + JSON.stringify(positionCreatorInfo.posInfo))

        let id = positionCreatorInfo.id;
        let currentInfo = getActionInfo(id);
        if ('from' in currentInfo && 'to' in currentInfo) {
            if (positionCreatorInfo.editingFrom)
                currentInfo.from = positionCreatorInfo.posInfo;
            else
                currentInfo.to = positionCreatorInfo.posInfo
        }
        else if ('at' in currentInfo) {
            currentInfo.at = positionCreatorInfo.posInfo;
        }
        setIsOpen(false)
    }

    return (
        <div>
            <Paper variant="outlined" style={{ width: width, height: height, overflowY: 'auto', borderWidth: '5px', userSelect: 'none' }} sx={{ ml: 2, mr: 2 }}>
                <List>
                    {items.map((item) => (
                        <ActionListItem item={{ itemInfo: item, actionInfo: getActionInfo2(item.id) }} onRemoveItem={onRemoveItem} onOpen={(editingFrom) => openPositionCreatorPopup(item.id, editingFrom)} />
                    ))}
                </List>
            </Paper>
            <PositionCreatorPopup positionCreatorInfo={positionCreatorInfo} onSavePosition={() => savePositionCreatorToAction(positionCreatorInfo.posInfo)} isOpen={isOpen} resetPositionCreatorPopup={() => resetPositionCreatorPopup(0, true)} setIsOpen={setIsOpen} />
        </div>
    );
}



interface PositionCreatorPopupProps {
    positionCreatorInfo: PositionCreatorInfo;
    onSavePosition: () => void;
    isOpen: boolean;
    resetPositionCreatorPopup: () => void;
    setIsOpen: (open: boolean) => void;
}

function PositionCreatorPopup({ positionCreatorInfo, onSavePosition, isOpen, resetPositionCreatorPopup, setIsOpen }: PositionCreatorPopupProps) {

    const classes = commonClasses();

    const [selectedOption, setSelectedOption] = useState("")

    const resetOptions = () => {
        resetPositionCreatorPopup()
    }

    const handleDropdownChange = (selectedOption: string) => {
        setSelectedOption(selectedOption);

        if (selectedOption === "Absolute")
            positionCreatorInfo.posInfo = { coord: "a1" }
        else
            positionCreatorInfo.posInfo = { x: 0, y: 0, to: false }
    }

    const handleSaveButton = () => {
        setSelectedOption("")
        onSavePosition();
    }

    const handleChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ('x' in positionCreatorInfo.posInfo)
            positionCreatorInfo.posInfo.x = parseInt(event.target.value)
    }


    const handleChangeY = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ('y' in positionCreatorInfo.posInfo)
            positionCreatorInfo.posInfo.y = parseInt(event.target.value)
    }

    const handleChangeCoord = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ('coord' in positionCreatorInfo.posInfo)
            positionCreatorInfo.posInfo.coord = event.target.value
    }


    const handleChangeRelativeTo = (value: string) => {
        if ('to' in positionCreatorInfo.posInfo)
            positionCreatorInfo.posInfo.to = value == "To" ? true : false;
    }



    return (
        <div>
            {isOpen && (

                <Container maxWidth="md" sx={{ zIndex: 200 }}>
                    <Paper className={classes.CenteredBasicCard}>
                        <div>
                            <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 2, mb: 2, mt: 0, fontSize: 24 }}>Type</Typography>
                            <Grid container alignItems="center" justifyItems={"center"} justifyContent="center" >
                                <MyDropdown
                                    options={['Absolute', 'Relative']}
                                    defaultValue=""
                                    onChange={handleDropdownChange}
                                />
                                {selectedOption === "Relative" ?
                                    (<div>
                                        <Grid container alignItems="center" justifyItems={"center"} justifyContent="center" sx={{ mt: 2 }}>
                                            <Grid>
                                                <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 1, fontSize: 18 }}>X:</Typography>
                                            </Grid>
                                            <Grid>
                                                <TextField sx={{ width: 60, mr: 2 }} onChange={handleChangeX}>

                                                </TextField>
                                            </Grid>
                                            <Grid>
                                                <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 1, fontSize: 18 }}>Y:</Typography>
                                            </Grid>
                                            <Grid>

                                                <TextField sx={{ width: 60 }} onChange={handleChangeY}>

                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="h4" sx={{ letterSpacing: '2px', mr: 2, mb: 1, mt: 1, fontSize: 24 }}>Relative To</Typography>
                                        <MyDropdown
                                            options={['From', 'To']}
                                            defaultValue="From"
                                            onChange={handleChangeRelativeTo}
                                        />
                                    </div>)
                                    : selectedOption === "Absolute" ?
                                        (
                                            <div>
                                                <Typography variant="h4" sx={{ letterSpacing: '2px', mt: 2, fontSize: 24 }}>Coordinate:</Typography>
                                                <Grid container alignItems="center" justifyItems={"center"} justifyContent="center" sx={{ mt: 1, mb: 1 }}>
                                                    <Grid>
                                                        <TextField sx={{ width: 120 }} onChange={handleChangeCoord}>

                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        )
                                        :
                                        (<div></div>)
                                }
                            </Grid>
                            <Button color={"browserColor"} onClick={() => { }}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 0, width: 150, p: 1 }}
                                onClickCapture={() => handleSaveButton()}>
                                Save
                            </Button>
                        </div>
                    </Paper>
                </Container>
            )}
        </div>);
}


interface ActionListItemProps {
    item: ActionItemInfo;
    onRemoveItem: (newItem: ItemInfo) => void;
    onOpen: (editingFrom: boolean) => void;
}

function ActionListItem({ item, onRemoveItem, onOpen }: ActionListItemProps) {
    const handleRemoveItem = (item: ItemInfo) => {
        onRemoveItem(item);
    };


    return (
        <div>
            <ListItem key={item.itemInfo.id}>
                <ListItemText primary={item.itemInfo.name} />
                {'whiteWins' in item.actionInfo
                    ? <ActionWin></ActionWin>
                    : ('from' in item.actionInfo && 'to' in item.actionInfo
                        ? <ActionMovePiece onOpen={onOpen} actionInfo={item.actionInfo}></ActionMovePiece>
                        : ('at' in item.actionInfo
                        ? <ActionSetPiece onOpen={onOpen} actionInfo={item.actionInfo}></ActionSetPiece>
                        : <div></div>))}



                <Button variant="contained" color="editorColor" style={{ height: '50px', width: '10px' }} onClickCapture={() => handleRemoveItem(item.itemInfo)}>
                    -
                </Button>
            </ListItem>
        </div>
    );
}


function ActionWin() {

    const handleDropdownChange = () => {

    }

    return (
        <MyDropdown
            options={['White', 'Black']}
            defaultValue=""
            onChange={handleDropdownChange}
        />);
}


interface ActionMovePieceProps {
    onOpen: (editingFrom: boolean) => void;
    actionInfo: ActionMoveInfo;
}

function ActionMovePiece({ onOpen, actionInfo }: ActionMovePieceProps) {


    const handleDropdownChange = () => {

    }

    const handleOpenMenuClick = (bool: boolean) => {

    }

    const positionInfoToString = (info: PositionInfo) => {
        if ('x' in info && 'y' in info && 'to' in info) {
            return (info.to ? 'to' : 'from') + "(" + info.x + ", " + info.y + ")";
        }
        else if ('coord' in info) {
            return info.coord;
        }
        return "";
    }

    return (
        <div>
            <Button variant="contained" color="createColor" style={{ height: '50px', width: '100px'}} onClickCapture={() => onOpen(true)} sx={{mr: 1}}>
                {positionInfoToString(actionInfo.from)}
            </Button>
            <Button variant="contained" color="createColor" style={{ height: '50px', width: '100px' }} onClickCapture={() => onOpen(false)} sx={{mr: 1}}>
                {positionInfoToString(actionInfo.to)}
            </Button>
        </div>);
}



interface ActionSetPieceProps {
    onOpen: (editingFrom: boolean) => void;
    actionInfo: ActionSetPieceInfo;
}

function ActionSetPiece({ onOpen, actionInfo }: ActionSetPieceProps) {


    const handleDropdownChange = () => {

    }

    const handleOpenMenuClick = (bool: boolean) => {

    }

    const positionInfoToString = (info: PositionInfo) => {
        if ('x' in info && 'y' in info && 'to' in info) {
            return (info.to ? 'to' : 'from') + "(" + info.x + ", " + info.y + ")";
        }
        else if ('coord' in info) {
            return info.coord;
        }
        return "";
    }

    return (
        <div>
            <Button variant="contained" color="createColor" style={{ height: '50px', width: '100px' }} onClickCapture={() => onOpen(true)} sx={{mr: 1}}>
                {positionInfoToString(actionInfo.at)}
            </Button>
        </div>);
}

