
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';



export default class GameService {
    
    public hubConnection: HubConnection;


    constructor(url: string="game") {
        
        this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:7081/' + url).withAutomaticReconnect().build();
        this.startConnection().catch((e) => {
            console.log("Could not connect to user hub");
            console.log(e);
        });
    }

    //    on(method:string)) {    }
    

    sendMove(move:string, gameId:string) {
        this.hubConnection.send('MovePiece', move, gameId);
    }

    joinGame(gameId:string) {
        this.hubConnection.send('JoinGame', gameId);
    }

    leaveGame(gameId:string) {
        this.hubConnection.send('LeaveGame', gameId);
    }

    requestBoardState() {
        this.hubConnection.send('RequestBoardState');
    }
    
    async startConnection() {
        if (this.hubConnection.state === HubConnectionState.Disconnected) {
          await this.hubConnection.start();
          console.log('Connection to user hub successful');
        }
      }
      
}