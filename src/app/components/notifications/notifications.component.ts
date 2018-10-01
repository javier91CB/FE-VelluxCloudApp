import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';

export enum TypeStatus {
  Good= 1,
  Alert= 2,
  Danger= 3
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  hubConnection: signalR.HubConnection;
  registerServices: object[];
  registerCount: number;
  paginator: boolean;

  constructor() {
    this.registerServices = [
     
    ];
      this.paginator = true;
    this.startConnection();
  }

  ngOnInit() {}

    private startConnection():void{
      let connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:52978/callerHub", signalR.HttpTransportType.WebSockets)
    .build();
      connection.start()
      .then(() => {
        console.log('Caller Hub connection started.......')
      })
      .catch(() => {
        console.log('Error while establishing connection')
        setTimeout(() => {
          this.startConnection()
        }, 5000);
      });
    }

}
