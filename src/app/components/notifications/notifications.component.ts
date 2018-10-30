import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HelperUserInfo } from '../../utilities/tools/helperUserInfo';
import { UserInfoModel } from '../../model/users/userInfoModel';
import { TokenModel } from '../../model/token/tokenModel';
import { CallerModel } from '../../model/notification/callerModel';
import { caller_Url } from '../../utilities/url/caller_Url';

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
  _hubConnection: signalR.HubConnection;
  userInfoModel: UserInfoModel;
  tokenModel: TokenModel;
  registerServices: Array<CallerModel>;
  placeId: string;
  private readonly API_URL = caller_Url.callerHubUrl;
  constructor() {
    this.registerServices = [];
      this.paginator = true;
    if(typeof this._hubConnection === 'undefined' || 
    this._hubConnection['connection'].connectionState === 0){
       this.startConnection();
    }
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
      this.placeId = this.tokenModel.userInfo.placeId;
    }
  }

  public startConnection():void{
    this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(this.API_URL, signalR.HttpTransportType.WebSockets)
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
      },1000)
    }

    getCaller() {
      if(this._hubConnection['connection'].connectionState == 1){
        this._hubConnection.invoke('GetCallerHub',this.placeId )
        .then((data)=>{
          this.registerServices = new Array<CallerModel>();
         for (var _i = 0; _i < data.length; _i++) {
            var callerModel = new CallerModel();
            callerModel.id = data[_i].id;
            callerModel.idButton = data[_i].idButton;
            callerModel.idPlace = data[_i].idPlace;
            callerModel.isBill = data[_i].isBill;
            callerModel.isService = data[_i].isService;
            callerModel.owner = data[_i].owner;
            callerModel.reCallBill = data[_i].reCallBill;
            callerModel.reCallService = data[_i].reCallService;
            callerModel.startCall = data[_i].startCall;
            callerModel.endCall = data[_i].endCall;
  
            var time = (new Date().getTime() - new Date(data[_i].startCall).getTime())/1000;
            var horas = Math.floor(time / 3600);
            var minutos = Math.floor((time - (horas * 3600)) / 60);
            var segundos = time - (horas * 3600) - (minutos * 60);
            var m = Math.ceil(minutos) < 10 ? '0'+ Math.ceil(minutos).toString() : Math.ceil(minutos).toString();
            var s = Math.ceil(segundos)  < 10 ? '0'+ Math.ceil(segundos).toString() : Math.ceil(segundos).toString();
            callerModel.timer = m + ':' + s;
            callerModel.status = time < 180 ? 1 :  time < 300 ? 2 : time < 420 ? 3 : 0;
  
            this.registerServices[_i] = callerModel;
          }
        });
      }
    }
}
