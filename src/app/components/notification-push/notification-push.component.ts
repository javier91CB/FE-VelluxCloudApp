import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notification/notifications.service';
import { HelperUserInfo } from 'src/app/utilities/tools/helperUserInfo';
import { UserInfoModel } from 'src/app/model/users/userInfoModel';
import { TokenModel } from 'src/app/model/token/tokenModel';
import { DatePipe } from '@angular/common';
import { NotificationPushEntity } from 'src/app/model/notificationPush/notificationPushEntity';
import { Route, Router } from '@angular/router';
import { CrossCuttingList } from 'src/app/model/crosscuttingList';
import { PlaceService } from 'src/app/services/place/place.service';
import { notification_Url } from 'src/app/utilities/url/notification_Url';

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
  selectedOption:any;
  notificationPush: Array<NotificationPushEntity>;
  crossCuttingList: any[];
  loading: boolean;
  private readonly API_URL = notification_Url.notificationUrl;
  
  constructor(
    private placeService: PlaceService,
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
      this.getAllPlace(this.placeId)
  }
  
  showDetails(){
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
  }

  getAllPlace(placeId)
  {
    this.placeService.getAllPlaces().subscribe(
      (data) => {
        this.crossCuttingList = new Array<CrossCuttingList>();
        
        for(let _i = 0; _i < data.length; _i++)
        {
          var clist = new CrossCuttingList();
          clist.key = data[_i].id;
          clist.value = data[_i].placeName;
          this.crossCuttingList[_i] = clist;
        }
      },
      error => {
      });
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
          item.notificationDate =datePipe.transform( data[i].notificationDate, 'yyyy-MM-dd HH:mm');
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

  downloadReport(StartDate, EndDate, PlaceId){
    this.loading = true;
    var place = PlaceId.toString().slice(3,PlaceId.length);
    var offset = new Date().getTimezoneOffset()/60;
    console.log(offset);
    var response =
      this.API_URL + '/ReportBySite/'
      +StartDate+'/'
      +EndDate+'/'
      +place+'/'
      +offset;
      this.loading = false;
      return window.location.href=response;
  }
}
