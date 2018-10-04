import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HelperUserInfo } from '../../utilities/tools/helperUserInfo';
import { UserInfoModel } from '../../model/users/userInfoModel';
import { TokenModel } from '../../model/token/tokenModel';
import { CallerModel } from '../../model/notification/callerModel';

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
  registerCount: number;
  paginator: boolean;
  private _hubConnection: signalR.HubConnection;
  userInfoModel: UserInfoModel;
  tokenModel: TokenModel;
  registerServices: Array<CallerModel>;

  constructor() {
    this.registerServices = [
     
    ];
      this.paginator = true;
    this.startConnection();
    this.startTimer();
  }

  ngOnInit() {
    var _helperUserInfo = new HelperUserInfo();
    this.userInfoModel = new UserInfoModel();
    this.tokenModel = new TokenModel();
    var userInfo = _helperUserInfo.getUserInformation();
    if(userInfo != null) {
      this.tokenModel = userInfo;
      this.userInfoModel = this.tokenModel.userInfo;
    }
  }

  private startConnection():void{
     this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:52978/callerHub", signalR.HttpTransportType.WebSockets)
    .build();
      this._hubConnection.start()
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
    
    
    startTimer() {
      setInterval(() => {
       this.getCaller();
      },5000)
    }

    getCaller() {
      this._hubConnection.invoke('GetCallerHub', 'hola')
      .then((data)=>{
        this.registerServices = data;
      });
    }

}
