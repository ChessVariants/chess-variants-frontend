
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

/**
 * Abstraction for a SignalR hub connection, in this case relating to playing a game.
 */
export default class GameService {
    
    public readonly hubConnection: HubConnection;

    constructor(url: string="game", connection?: HubConnection) {
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
     * @param move the move to send, such as `"e2e4"`
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
     * Leaves the game with the supplied gameId
     * @param gameId the gameId for the the game to leave
     */
    leaveGame(gameId: string): void {
        this.hubConnection.send('LeaveGame', gameId);
    }

    /**
     * Requests the server to send an event with the board state
     */
    requestBoardState(): void {
        this.hubConnection.send('RequestBoardState');
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