


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
    win: WinDTO | null;
    set: SetPieceDTO | null;
    move: MovePieceDTO | null;
    tie: boolean;
}

export type WinDTO = {
    white: boolean;
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

export type ActionDict = { [id: number]: ActionDTO }

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

export type DeleteEventDTO = {
    name: string;
}



export type ActionItemInfo = {
    itemInfo: ItemInfo;
    actionInfo: ActionDTO;
}

export type EventDict = { [name: string]: EventDTO }

export type MoveDict = { [name: string]: MoveDTO }

export type MoveDTO = {
    posInfo: PositionDTO;
    actions: ActionDTO[];
    identifier: string;
    predicate: string;
    name: string;
    description: string;
}
