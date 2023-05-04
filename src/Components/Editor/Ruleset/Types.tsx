


export type EventDTO = {
    name: string;
    description: string;
    predicate: string;
    actions: ActionDTO[];
}

export type EventInfo = {
    actionDict: ActionDict
    predicate: string
    name: string
    description: string
}

export type ActionDTO = {
    win?: WinDTO;
    set?: SetPieceDTO;
    move?: MovePieceDTO;
    tie: boolean;
}

export type WinDTO = {
    whiteWins: boolean;
}
export type SetPieceDTO = {
    identifier: string;
    at: PositionDTO;
}
export type MovePieceDTO = {
    from: PositionDTO;
    to: PositionDTO;
}
export type PositionDTO = {
    absolute: PositionAbsoluteDTO | null;
    relative: PositionRelativeDTO | null;
}
export type PositionAbsoluteDTO = {
    coordinate: string;
}
export type PositionRelativeDTO = {
    x: number;
    y: number;
    to: boolean;
}

export type ItemInfo = { name: string, id: number }

type ActionDict = { [id: number]: ActionDTO }

export type PositionCreatorInfo = { posInfo: PositionDTO, id: number, editingFrom: boolean }

export type RuleSetInfo = {
    name: string;
    description: string;
    condition: string;
    specialMoves: ItemInfo[];
    events: ItemInfo[];
    stalemateEvents: ItemInfo[];
}


export type ConditionInfo = {
    name: string;
    description: string;
    code: string;
}

export type ConditionDict = { [name: string]: ConditionInfo }

export type DeleteConditionInfo = {
  name: string;
}


export type EventDict = { [name: string]: EventDTO }

export type MoveInfo = {
  posInfo: PositionDTO;
  actionDict: ActionDict;
  identifier: string;
  predicate: string;
  name: string;
  description: string;
}
