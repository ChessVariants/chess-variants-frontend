import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { BoardSize, Move } from './GameService';
import CookieService, { Cookie } from './CookieService';

/**
 * Abstraction for a SignalR hub connection, in this case relating to playing a game.
 */
export default class EditorService {

    public readonly hubConnection: HubConnection;

    private static editorService?: EditorService;

    constructor(baseUrl: string, token: string, path: string = "editor") {
        let completePath: string = baseUrl + path;
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(completePath, { accessTokenFactory: () => token })
            .withAutomaticReconnect().build();
    }

    static getInstance() {
        if (this.editorService === null || this.editorService === undefined) {
            this.editorService = this.create();
        }
        return this.editorService;
    }

    static create(): EditorService {
        const cookieService = CookieService.getInstance()
        const token = cookieService.get(Cookie.JwtToken)
        this.editorService = new EditorService(process.env.REACT_APP_BACKEND_BASE_URL!, token);
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

    sendCreatePieceEditor(editorId: string): void {
        this.hubConnection.send('CreatePieceEditor', editorId);
    }

    setImagePath(editorId: string, imagePath: string): void {
        this.hubConnection.send("SetImagePath", editorId, imagePath);
    }

    setActiveSquare(editorId: string, square: string): void {
        this.hubConnection.send("ActivateSquare", editorId, square);
        this.requestPieceEditorBoardState(editorId);
    }

    addMovementPattern(editorId: string, xDir: number, yDir: number, minLength: number, maxLength: number): void {
        console.log("Adding pattern pressed");
        this.hubConnection.send("AddMovementPattern", editorId, xDir, yDir, minLength, maxLength);
    }

    removeMovementPattern(editorId: string, xDir: number, yDir: number, minLength: number, maxLength: number): void {
        console.log("Removing pattern pressed");
        this.hubConnection.send("RemoveMovementPattern", editorId, xDir, yDir, minLength, maxLength);
    }

    removeAllMovementPatterns(editorId: string): void {
        this.hubConnection.send("ClearMovementPatterns", editorId);
    }

    addCapturePattern(editorId: string, xDir: number, yDir: number, minLength: number, maxLength: number): void {
        console.log("Adding pattern pressed");
        this.hubConnection.send("AddCapturePattern", editorId, xDir, yDir, minLength, maxLength);
    }

    setPieceEditorBoardSize(editorId: string, rows: number, cols: number): void {
        console.log("Removing pattern pressed");
        this.hubConnection.send("UpdatePieceEditorBoardSize", editorId, rows, cols);
    }

    setSameCaptureAsMovement(editorId: string, enable: boolean): void {
        console.log("Same Capture as movement pattern");
        this.hubConnection.send("SetCaptureSameAsMovement", editorId, enable);
    }

    showMovement(editorId: string, enable: boolean): void {
        console.log("Show movement or captures");
        this.hubConnection.send("ShowMovement", editorId, enable);
    }

    canBeCaptured(editorId: string, enable: boolean): void {
        console.log("Set can be captured");
        this.hubConnection.send("PieceCanBeCaptured", editorId, enable);
    }

    belongsToPlayer(editorId: string, player: string): void {
        console.log("Set belongs to player");
        this.hubConnection.send("BelongsToPlayer", editorId, player);
    }

    setRepeat(editorId: string, repeat: number): void {
        console.log("Set repeat");
        this.hubConnection.send("AmountRepeat", editorId, repeat);
    }

    resetPiece(editorId: string,): void {
        console.log("Reset piece");
        this.hubConnection.send("ResetPiece", editorId);
    }

    // Board editor
    sendCreateBoardEditor(editorId: string): void {
        this.hubConnection.send('CreateBoardEditor', editorId);
    }

    setBoardEditorBoardSize(editorId: string, rows: number, cols: number): void {
        console.log("setting board editor size");
        this.hubConnection.send("SetBoardEditorSize", editorId, rows, cols);
    }

    clearBoardEditorBoard(editorId: string): void {
        this.hubConnection.send("ClearBoard", editorId);
    }

    resetStartingPosition(editorId: string): void {
        this.hubConnection.send("ResetStartingPosition", editorId);
    }

    setActivePiece(editorId: string, piece: string, color: string): void {
        this.hubConnection.send("SetActivePiece", editorId, piece, color);
    }

    setActiveRemove(editorId: string): void {
        this.hubConnection.send("SetActiveRemove", editorId);
    }

    insertPiece(editorId: string, square: string) {
        this.hubConnection.send("UpdateSquare", editorId, square);
    }

    buildPiece(editorId: string, pieceName: string) {
        console.log("Building piece");
        this.hubConnection.send("BuildPiece", editorId, pieceName)
    }

    /**
     * Requests the server to send an event with the board state
    */
    async requestPieceEditorBoardState(editorId: string): Promise<PieceEditorState> {
        return this.hubConnection.invoke('RequestPieceEditorState', editorId);
    }

    async requestPatternState(editorId: string): Promise<PatternState> {
        return this.hubConnection.invoke('RequestPatternState', editorId);
    }

    async requestStandardPieces(color: string): Promise<Piece[]> {
        return this.hubConnection.invoke('RequestStandardPiecesByColor', color);
    }

    async requestPiecesByUser(editorId: string): Promise<Piece[]> {
        return this.hubConnection.invoke('GetUserPieces', editorId);
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

export interface Piece {
    name: string,
    image: string,
}

export interface BoardEditorState {
    board: string[],
    boardSize: BoardSize,
}

export interface PieceEditorState {
    board: string[],
    boardSize: BoardSize,
    moves: Move[],
    square: string,
    belongsTo: string,
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
    UpdatedPieceEditorState = "updatedPieceEditorState",
    UpdatedBoardEditorState = "updatedBoardEditorState",
    BuildFailed = "buildFailed",
    Error = "error",
}
