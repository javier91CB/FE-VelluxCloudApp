import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notification/notifications.service';
import { HelperUserInfo } from 'src/app/utilities/tools/helperUserInfo';
import { UserInfoModel } from 'src/app/model/users/userInfoModel';
import { TokenModel } from 'src/app/model/token/tokenModel';
import { DatePipe } from '@angular/common';
import { NotificationPushEntity } from 'src/app/model/notificationPush/notificationPushEntity';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-notification-push',
  templateUrl: './notification-push.component.html',
  styleUrls: ['./notification-push.component.css']
})
export class NotificationPushComponent implements OnInit {
  userInfoModel: any;
  tokenModel: any;
  placeId: any;
  userId: any;
  notificationPush: Array<NotificationPushEntity>;

  constructor(
    private notificationService:NotificationsService,
    private router: Router) { }

  ngOnInit() {
    var _helperUserInfo = new HelperUserInfo();
    this.userInfoModel = new UserInfoModel();
    this.tokenModel = new TokenModel();
    var userInfo = _helperUserInfo.getUserInformation();
    if(userInfo != null) {
      this.tokenModel = userInfo;
      this.userInfoModel = this.tokenModel.userInfo;
      this.placeId = this.tokenModel.userInfo.placeId;
      this.userId = this.tokenModel.userInfo.id;
    }
      this.getNotifications();
      this.checkNotifications();
  }

  getNotifications(){
    this.notificationService.notificationPushQualification(this.placeId).subscribe(
      (data) => {
        localStorage.removeItem("notificationPush")
        var datePipe = new DatePipe('en-US');
        var arrayNotification = new Array<NotificationPushEntity>();
        for(let i = 0; i< data.length; i++){
          var item = new NotificationPushEntity();
          item.id = data[i].id;
          item.module = data[i].module;
          item.notificationDate =datePipe.transform( data[i].notificationDate, 'yyyy-MM-dd');
          item.number = data[i].number;
          item.placeId = data[i].placeId;
          item.placeName = data[i].placeName;

          arrayNotification[i] = item;
        }
        this.notificationPush = arrayNotification;
      },
      error => {
        
      });
  }

  checkNotifications() {
    setInterval(() => {
      var listPush = JSON.parse(localStorage.getItem("notificationPush"));
      if(listPush != null && this.router.url === '/notificationsPush'){
        this.getNotifications();
      }
    },1000)
  }
}
