import { Button, Paper,} from "@mui/material";
import { List, ListItem, ListItemText } from "@material-ui/core"
import PositionCreatorPopup from "./PositionCreatorPopup";

import { useEffect, useState } from "react";

import MyDropdown from "./Dropdown";


type PositionCreatorInfo = { posInfo: PositionInfo, id: number, editingFrom: boolean }

type PositionInfo = AbsoluteInfo | RelativeInfo;

type AbsoluteInfo = {
  coord: string;
}

type RelativeInfo = {
  x: number;
  y: number;
  to: boolean;
}


type MoveInfo = {
  posInfo: PositionInfo;
  actionDict: ActionDict
  identifier: string;
  predicate: string;
}

type ItemInfo = { name: string, id: number }

type ActionItemInfo = { itemInfo: ItemInfo, actionInfo: ActionInfo }

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


type ActionDict = { [id: number]: ActionInfo }

interface ActionListProps {
  items: ItemInfo[];
  onRemoveItem: (newItem: ItemInfo) => void;
  width: string | number;
  height: string | number;
  setJSON: (json: string) => void
}



export default function ActionList({ items, onRemoveItem, width, height, setJSON }: ActionListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [positionCreatorInfo, setPositionCreatorInfo] = useState({ posInfo: { coord: "a1" }, id: 0, editingFrom: true } as PositionCreatorInfo);

  const [actionInfo, setActionInfo] = useState({} as ActionDict);

  const updateJSON = () => {
    setJSON(JSON.stringify(actionInfo))
  }

  useEffect(() => {
    localStorage.setItem('actionInfo', JSON.stringify(actionInfo));
  }, [actionInfo]);

  useEffect(() => {
    // This code will run only once, on mount,
    // and will retrieve the previous value of `data`
    const savedData = localStorage.getItem('actionInfo');
    if (savedData !== null) {
      updateJSON();
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
    else if (item.name === "Move Piece") {
      return {
        from: { coord: "a1" },
        to: { coord: "a1" }
      } as ActionMoveInfo;
    }
    else {
      return { at: { coord: "a1" } } as ActionSetPieceInfo;
    }
  }

  const getActionInfo2 = (id: number) => {
    //console.log("rerendered!")
    return getActionInfo(id);
  }
  const getActionInfo = (id: number) => {
    if (actionInfo[id] === undefined) {
      actionInfo[id] = fromItemToActionInfo(items[id])
      updateJSON();
      //console.log("-----IS NULL----- id: " + id)
    }
    //console.log(actionInfo[id])
    return actionInfo[id];
  }

  const savePositionCreatorToAction = (posInfo: PositionInfo) => {
    //console.log("currentPosInfo: " + JSON.stringify(positionCreatorInfo.posInfo))
    positionCreatorInfo.posInfo = posInfo;
    //console.log("newPosInfo: " + JSON.stringify(positionCreatorInfo.posInfo))

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
    updateJSON();
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
      <Button variant="contained" color="createColor" style={{ height: '50px', width: '125px' }} onClickCapture={() => onOpen(true)} sx={{ mr: 1 }}>
        {positionInfoToString(actionInfo.at)}
      </Button>
    </div>);
}

