
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

/**
 * Abstraction for a SignalR hub connection, in this case relating to playing a game.
 */
export default class GameService {

    public readonly hubConnection: HubConnection;

    private static gameService?: GameService;

    constructor(url: string = "game", connection?: HubConnection) {
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
        if (this.gameService === null || this.gameService === undefined) {
            this.gameService = new GameService();
        }
        return this.gameService;
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

    /**
     * Sends a move to the server for the given gameId.
     * 
     * @param move the move to send, such as "e2e4"
     * @param gameId the corresponding gameId where the move should be played
     */
    sendMove(move: string, gameId: string): void {
        this.hubConnection.send('MovePiece', move, gameId);
    }

    /**
     * Joins or creates a game with the supplied gameId on the server
     * @param gameId the game to join or create.
     */
    joinGame(gameId: string): void {
        this.hubConnection.send('JoinGame', gameId);
    }

    /**
     * Joins or creates a game with the supplied gameId on the server
     * @param gameId the game to join or create.
     */
    createGame(gameId: string, variant: string = Variant.Standard): void {
        this.hubConnection.send('CreateGame', gameId, variant);
    }

    /**
     * Leaves the game with the supplied gameId
     * @param gameId the gameId for the the game to leave
     */
    leaveGame(gameId: string): void {
        this.hubConnection.send('LeaveGame', gameId);
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
    requestBoardState(gameId: string): void {
        console.log("Board state requested");

        this.hubConnection.send('RequestState', gameId);
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

export enum GameEvents {
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

export enum Variant {
    Standard = "standard",
    CaptureTheKing = "captureTheKing",
    AntiChess = "antiChess",
}