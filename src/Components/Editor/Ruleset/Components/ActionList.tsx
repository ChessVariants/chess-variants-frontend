import { Button, Paper, TextField } from "@mui/material";
import { List, ListItem, ListItemText } from "@material-ui/core"
import PositionCreatorPopup from "./PositionCreatorPopup";

import { useEffect, useState } from "react";

import MyDropdown from "./Dropdown";
import { ActionDTO, ActionDict, ActionItemInfo, ItemInfo, MovePieceDTO, PositionCreatorInfo, PositionDTO, SetPieceDTO, WinDTO } from "../Types";

interface ActionListProps {
  itemsAdded: ItemInfo[];
  onRemoveItem: (newItem: ItemInfo) => void;
  width: string | number;
  height: string | number;
  setJSON: (json: string) => void;
  actionInfo: ActionDict;
  setActionInfo: (newInfo: ActionDict) => void;
}



export default function ActionList({ itemsAdded, onRemoveItem, width, height, setJSON, actionInfo, setActionInfo }: ActionListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [positionCreatorInfo, setPositionCreatorInfo] = useState({ posInfo: { absolute: { coordinate: "a1" }, relative: null }, id: 0, editingFrom: true } as PositionCreatorInfo);


  const updateJSON = () => {
    setJSON(JSON.stringify(actionInfo))
  }

  useEffect(() => {
    console.log("saving actionInfo")
    localStorage.setItem('actionInfo', JSON.stringify(actionInfo));
  }, [actionInfo]);

  useEffect(() => {
    console.log("Before: " + JSON.stringify(actionInfo))
    updateDict();
    console.log("After: " + JSON.stringify(actionInfo))
  }, [itemsAdded]);

  useEffect(() => {
    console.log("retrieving actionInfo")
    const savedData = localStorage.getItem('actionInfo');
    if (savedData !== null) {
      updateJSON();
      setActionInfo(JSON.parse(savedData));
    }
  }, []);

  const isMoveAction = (info: ActionDTO) => {
    return info.move !== null;
  }

  const resetPositionCreatorPopup = (id: number, editingFrom: boolean) => {
    setPositionCreatorInfo({ posInfo: { absolute: { coordinate: "a1" }, relative: null }, id: id, editingFrom: editingFrom } as PositionCreatorInfo)
  }

  const openPositionCreatorPopup = (id: number, editingFrom: boolean) => {
    resetPositionCreatorPopup(id, editingFrom)
    setIsOpen(true)
  }

  const fromItemToActionInfo = (item: ItemInfo) => {
    let action: ActionDTO = actionInfo[item.id] === undefined ? { move: null, win: null, set: null, tie: false } : actionInfo[item.id];

    if (item.name === "Win") {
      if (action.win === null) {
        action.win = { white: true };
      }
      action.move = null;
      action.set = null;
      action.tie = false;
    }
    else if (item.name === "Move Piece") {
      if (action.move === null) {
        action.move = {
          from: { absolute: { coordinate: "a1" }, relative: null },
          to: { absolute: { coordinate: "a1" }, relative: null }
        };
      }
      action.win = null;
      action.set = null;
      action.tie = false;
    }
    else if (item.name == "Set Piece") {
      if (action.set === null) {
        action.set = { identifier: "", at: { absolute: { coordinate: "a1" }, relative: null } };
      }
      action.win = null;
      action.move = null;
      action.tie = false;
    }
    else {
      if (!action.tie) {
        action.tie = true;
      }
      action.win = null;
      action.move = null;
      action.set = null;
    }
    return action;
  }

  const updateDict = () => {
    itemsAdded.map((item) => {
      if (item !== undefined)
        actionInfo[item.id] = fromItemToActionInfo(item)
    });
    updateJSON();
  }

  const getActionInfo = (id: number) => {
    if (actionInfo[id] === undefined)
      return fromItemToActionInfo(itemsAdded[id]);//{ move: null, win: null, set: null, isTie: false };
    updateDict();
    
    return actionInfo[id];
  }

  const savePositionCreatorToAction = (posInfo: PositionDTO) => {
    positionCreatorInfo.posInfo = posInfo;

    let id = positionCreatorInfo.id;
    let currentInfo = getActionInfo(id);
    if (currentInfo === null)
      return;
    if (currentInfo.move !== null) {
      if (positionCreatorInfo.editingFrom)
        currentInfo.move.from = positionCreatorInfo.posInfo;
      else
        currentInfo.move.to = positionCreatorInfo.posInfo
    }
    else if (currentInfo.set !== null) {
      currentInfo.set.at = positionCreatorInfo.posInfo;
    }

    updateJSON();
    setIsOpen(false)
  }


  const removeItem = (newItem: ItemInfo, id: number) => {
    delete actionInfo[id];
    onRemoveItem(newItem);
    updateJSON();

    console.log(actionInfo);
    console.log(itemsAdded);
    /*    actionInfo[id] = null;
        let j: number = 0;
        for (let i = 0; i < itemsAdded.length - 1; i++) {
          if (i === id) {
            j++;
          }
          actionInfo[i] = actionInfo[j]
          j++;
        }
        actionInfo[itemsAdded.length-1] = null;
        updateJSON();*/
  }

  return (
    <div>
      <Paper variant="outlined" style={{ width: width, height: height, overflowY: 'auto', borderWidth: '5px', userSelect: 'none' }} sx={{ ml: 2, mr: 2 }}>
        <List>
          {itemsAdded.map((item) => (
            <div>
              <ActionListItem item={{ itemInfo: item, actionInfo: getActionInfo(item.id) }} onRemoveItem={(itemToRemove) => removeItem(itemToRemove, item.id)} onOpen={(editingFrom) => openPositionCreatorPopup(item.id, editingFrom)} />
            </div>
          ))}
        </List>
      </Paper>
      <PositionCreatorPopup positionCreatorInfo={positionCreatorInfo} onSavePosition={() => savePositionCreatorToAction(positionCreatorInfo.posInfo)} isOpen={isOpen} resetPositionCreatorPopup={() => resetPositionCreatorPopup(0, true)} setIsOpen={setIsOpen} fixed={false} />
    </div>
  );
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
        {item.actionInfo.win !== null
          ? <ActionWin actionInfo={item.actionInfo.win}></ActionWin>
          : (item.actionInfo.move !== null
            ? <ActionMovePiece onOpen={onOpen} actionInfo={item.actionInfo.move}></ActionMovePiece>
            : (item.actionInfo.set !== null
              ? <ActionSetPiece onOpen={onOpen} actionInfo={item.actionInfo.set}></ActionSetPiece>
              : <ActionTie></ActionTie>))}



        <Button variant="contained" color="editorColor" style={{ height: '50px', width: '10px' }} onClickCapture={() => onRemoveItem(item.itemInfo)}>
          -
        </Button>
      </ListItem>
    </div>
  );
}


interface ActionWinProps {
  actionInfo: WinDTO;
}

function ActionWin({ actionInfo }: ActionWinProps) {

  const whiteString: string = 'White';
  const blackString: string = 'Black';

  const handleDropdownChange = (selectedOption: string) => {
    actionInfo.white = selectedOption == whiteString ? true : false
  }

  return (
    <MyDropdown
      options={[whiteString, blackString]}
      defaultValue={actionInfo.white ? whiteString : blackString}
      onChange={handleDropdownChange}
    />);
}


function ActionTie() {

  return (
    <div></div>);
}


interface ActionMovePieceProps {
  onOpen: (editingFrom: boolean) => void;
  actionInfo: MovePieceDTO;
}

const positionInfoToString = (info: PositionDTO) => {
  if (info.relative !== null) {
    return (info.relative.to ? 'to' : 'from') + "(" + info.relative.x + ", " + info.relative.y + ")";
  }
  else if (info.absolute !== null) {
    return info.absolute.coordinate;
  }
  return "";
}

function ActionMovePiece({ onOpen, actionInfo }: ActionMovePieceProps) {


  const handleOpenMenuClick = (bool: boolean) => {

  }


  return (
    <div>
      <Button variant="contained" color="createColor" style={{ height: '50px', width: '125px' }} onClickCapture={() => onOpen(true)} sx={{ mr: 1 }}>
        {positionInfoToString(actionInfo.from)}
      </Button>
      <Button variant="contained" color="createColor" style={{ height: '50px', width: '125px' }} onClickCapture={() => onOpen(false)} sx={{ mr: 1 }}>
        {positionInfoToString(actionInfo.to)}
      </Button>
    </div>);
}

interface ActionSetPieceProps {
  onOpen: (editingFrom: boolean) => void;
  actionInfo: SetPieceDTO;
}

function ActionSetPiece({ onOpen, actionInfo }: ActionSetPieceProps) {


  const handleOpenMenuClick = (bool: boolean) => {

  }

  const handleChangeIdentifier = (event: React.ChangeEvent<HTMLInputElement>) => {
    actionInfo.identifier = event.target.value;
  }

  return (
    <div>

      <TextField sx={{ width: 60, mr: 2 }} onChange={handleChangeIdentifier}>

      </TextField>
      <Button variant="contained" color="createColor" style={{ height: '50px', width: '125px' }} onClickCapture={() => onOpen(true)} sx={{ mr: 1 }}>
        {positionInfoToString(actionInfo.at)}
      </Button>
    </div>);
}

