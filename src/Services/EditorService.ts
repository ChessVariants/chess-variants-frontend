import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { BoardSize, Move } from './GameService';

/**
 * Abstraction for a SignalR hub connection, in this case relating to playing a game.
 */
export default class EditorService {
    
    public readonly hubConnection: HubConnection;

    private static editorService?: EditorService;

    constructor(baseUrl: string, path: string = "editor") {
        let completePath: string = baseUrl + path;
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(completePath)
            .withAutomaticReconnect().build();
    }

    static getInstance() {
        if (this.editorService === null || this.editorService === undefined) {
            this.editorService = this.create();
        }
        return this.editorService;
    }

    static create(): EditorService {
        this.editorService = new EditorService(process.env.REACT_APP_BACKEND_BASE_URL!);
        return this.editorService;
    }

    static async connect(): Promise<void> {
        if (this.editorService === undefined) {
            this.create();
        }
        return this.editorService!.startConnection()
    }

    static async createAndConnect(): Promise<void> {
        return this.connect()
    }

    public isConnecting(): boolean {
        return this.hubConnection.state === HubConnectionState.Connecting || this.hubConnection.state === HubConnectionState.Reconnecting;
    }

    public isDisconnected(): boolean {
        return this.hubConnection.state === HubConnectionState.Disconnected || this.hubConnection.state === HubConnectionState.Disconnecting;
    }

    public isConnected(): boolean {
        return this.hubConnection.state === HubConnectionState.Connected;
    }

    on(methodName: string, newMethod: (...args: any[]) => any): void {
        this.hubConnection.on(methodName, newMethod)
    }

    setActiveSquare(square: string): void {
        this.hubConnection.send("ActivateSquare", square);
        this.requestBoardState();
    }

    addMovementPattern(xDir: number, yDir: number, minLength: number, maxLength: number): void {
        console.log("Adding pattern pressed");
        this.hubConnection.send("AddMovementPattern", xDir, yDir, minLength, maxLength);
    }

    removeMovementPattern(xDir: number, yDir: number, minLength: number, maxLength: number): void {
        console.log("Removing pattern pressed");
        this.hubConnection.send("RemoveMovementPattern", xDir, yDir, minLength, maxLength);
    }
    
    removeAllMovementPatterns(): void {
        this.hubConnection.send("ClearMovementPatterns");
    }

    addCapturePattern(xDir: number, yDir: number, minLength: number, maxLength: number): void {
        console.log("Adding pattern pressed");
        this.hubConnection.send("AddCapturePattern", xDir, yDir, minLength, maxLength);
    }
    
    setBoardSize(rows: number, cols: number): void {
        console.log("Removing pattern pressed");
        this.hubConnection.send("UpdateBoardSize", rows, cols);
    }

    setSameCaptureAsMovement(enable: boolean): void {
        console.log("Same Capture as movement pattern");
        this.hubConnection.send("SetCaptureSameAsMovement", enable);
    }

    showMovement(enable: boolean): void {
        console.log("Show movement or captures");
        this.hubConnection.send("ShowMovement", enable);
    }

    canBeCaptured(enable: boolean): void {
        console.log("Set can be captured");
        this.hubConnection.send("PieceCanBeCaptured", enable);
    }

    belongsToPlayer(player: string): void {
        console.log("Set belongs to player");
        this.hubConnection.send("BelongsToPlayer", player);
    }

    setRepeat(repeat: number): void {
        console.log("Set repeat");
        this.hubConnection.send("AmountRepeat", repeat);
    }

    resetPiece(): void {
        console.log("Reset piece");
        this.hubConnection.send("ResetPiece");
    }

    /**
     * Requests the server to send an event with the board state
    */
   async requestBoardState(): Promise<EditorState> {
       return this.hubConnection.invoke('RequestState');
   }

   async requestPatternState(): Promise<PatternState> {
       return this.hubConnection.invoke('RequestPatternState');
   }
    
    /**
     * Starts the connection if it is disconnected, otherwise does nothing.
     */
    async startConnection(): Promise<void> {
        if (this.hubConnection.state === HubConnectionState.Disconnected) {
          await this.hubConnection.start();
          console.log('Connection to user hub successful');
        }
    }
    
}

export interface EditorState {
    board: string[],
    boardSize: BoardSize,
    moves: Move[],
    square: string,
}

export interface Pattern {
    xDir: number,
    yDir: number,
    minLength: number,
    maxLength: number,
}

export interface PatternState {
    patterns: Pattern[],
}

export enum EditorEvents {
    UpdatedEditorState = "updatedEditorState",
    Error = "error",
}
