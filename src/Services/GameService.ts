
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import Cookies from 'universal-cookie';

/**
 * Abstraction for a SignalR hub connection, in this case relating to playing a game.
 * 
 * Methods prefixed with "send" will merely send an RPC call to the backend, which may or may not result in
 * the backend sending events as a response.
 * 
 * Methods prefixed with "request" will invoke a method on the backend and returns a {@link Promise} of the
 * result. It may also cause the backend to send events as a response.
 */
export default class GameService {

    public readonly hubConnection: HubConnection;
    private static gameService?: GameService;

    constructor(baseUrl: string, token: string, path: string = "game") {
        let completePath: string = baseUrl + path;
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(completePath, { accessTokenFactory: () => token })
            .withAutomaticReconnect().build();
    }

    static async createAndConnect() {
        if (this.gameService === null || this.gameService === undefined) {
            const cookies = new Cookies();
            const token = cookies.get('jwtToken')
            console.log(token);
            this.gameService = new GameService(process.env.REACT_APP_BACKEND_BASE_URL!, token);

            await this.gameService.startConnection().catch((e) => {
                console.log("Could not connect to user hub");
                console.log(e);
            })
        }
        return this.gameService;
    }

    static getInstance(): GameService {
        if (this.gameService === null || this.gameService === undefined) {
            console.log("Could not get GameService instance, object was null or undefined");
            throw new ReferenceError("GameService instance does not exist");
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
        console.log("registered:" + methodName);
        
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
    sendJoinGame(gameId: string): void {
        this.hubConnection.send('JoinGame', gameId);
    }

    async requestJoinGame(gameId: string): Promise<boolean> {
        return this.hubConnection.invoke('JoinGame', gameId);
    }

    /**
     * Joins or creates a game with the supplied gameId on the server
     * @param gameId the game to join or create.
     */
    sendCreateGame(gameId: string, variant: string = Variant.Standard): void {
        this.hubConnection.send('CreateGame', gameId, variant);
    }

    sendStartGame(gameId: string): void {
        this.hubConnection.send('StartGame', gameId);
    }

    /**
     * Leaves the game with the supplied gameId
     * @param gameId the gameId for the the game to leave
     */
    sendLeaveGame(gameId: string): void {
        this.hubConnection.send('LeaveGame', gameId);
    }

    /**
     * Makes a request to the server to swap colors between players
     * @param gameId the gameId for the game to swap colors between players in
     */
    sendSwapColors(gameId: string): void {
        this.hubConnection.send('SwapColors', gameId);
    }

    async requestColors(gameId: string): Promise<Colors> {
        return this.hubConnection.invoke('RequestColors', gameId)
    }

    async requestBoardState(gameId: string): Promise<GameState> {
        return this.hubConnection.invoke('RequestState', gameId);
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

export interface Colors {
    white?: string,
    black?: string,
}

export interface GameState {
    sideToMove: string,
    board: string[],
    boardSize: BoardSize,
    moves: Move[]
}

export interface BoardSize {
    rows: number,
    cols: number,
}

export interface Move {
    from: string,
    to: string[],
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
    GameVariantSet = "gameVariantSet",
    GameVariantNotSet = "gameVariantNotSet",
    GameStarted = "gameStarted",
    Colors = "colors",
}

export enum Variant {
    Standard = "standard",
    CaptureTheKing = "captureTheKing",
    AntiChess = "antiChess",
}