
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

/**
 * Abstraction for a SignalR hub connection, in this case relating to playing a game.
 */
export default class EditorService {
    
    public readonly hubConnection: HubConnection;

    private static editorService?: EditorService;

    constructor(url: string="editor", connection?: HubConnection) {
        if (connection === null || connection === undefined) {
            this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:7081/' + url).withAutomaticReconnect().build();
        } 
        else {
            this.hubConnection = connection!;
        }
        this.startConnection().catch((e) => {
            console.log("Could not connect to user hub");
            console.log(e);
        });
    }

    static getInstance() {
        if (this.editorService === null || this.editorService === undefined) {
            this.editorService = new EditorService();
        }
        return this.editorService;
    }

    /**
     * Forwards the event subscription to the internal {@link HubConnection}.
     * @param methodName the event to subscribe to
     * @param newMethod a function on what to do with the event information received
     * 
     * @example
     * Subscribes to the event "playerJoinedGame" and logs the received value.
     * ```ts
     * gameService.on('playerJoinedGame', (value: string) => {
     *   console.log(value);
     * });
     * ```
     */
    on(methodName: string, newMethod: (...args: any[]) => any): void {
        this.hubConnection.on(methodName, newMethod)
    }

    addMovementPattern(xDir: number, yDir: number, minLength: number, maxLength: number): void {
        console.log("Adding pattern pressed")
        this.hubConnection.send("AddMovementPattern", xDir, yDir, minLength, maxLength);
    }

    /**
     * Makes a request to the server to swap colors between players
     * @param gameId the gameId for the game to swap colors between players in
     */
    swapColors(gameId: string) {
        this.hubConnection.send('SwapColors', gameId);
    }

    /**
     * Requests the server to send an event with the board state
     */
    requestBoardState(): void {
        console.log("Board state requested");
        this.hubConnection.send('RequestState');
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

export enum EditorEvents {
    GameNotFound = "gameNotFound",
    PieceMoved = "pieceMoved",
    UpdatedGameState = "updatedGameState",
    PlayerLeftGame = "playerLeftGame",
    PlayerJoinedGame = "playerJoinedGame",
    GameCreated = "gameCreated",
    GameJoined = "gameJoined",
    GameLeft = "gameLeft",
    PlayerNotFound = "playerNotFound",
    InvalidMove = "invalidMove",
    Error = "error",
    WhiteWon = "whiteWon",
    BlackWon = "blackWon",
    Tie = "tie",
}
