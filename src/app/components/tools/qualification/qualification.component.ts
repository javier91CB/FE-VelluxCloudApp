import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NotificationInfo } from '../../../model/notification/notificationInfo';
import { NotificationRequest } from '../../../model/notification/requestModel/notificationRequest';
import { NotificationsService } from '../../../services/notification/notifications.service';
import { MessagingService } from 'src/app/services/shared/messaging.service';
import { CrossCuttingList } from 'src/app/model/crosscuttingList';
import { PlaceService } from 'src/app/services/place/place.service';
import { NotificationPushRequest } from 'src/app/model/notification/requestModel/notificationPushRequest';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {
  hideMenu:boolean = false;
  notification: NotificationInfo;
  Success:boolean;
  blocked:boolean;
  crossCuttingList: any;
  notificationInfo: NotificationInfo;
  selectedOptionPlace: any;
  isAdminValidation: boolean;
  isVertical: any;
  isHorizontal: boolean;

  constructor(
    private sericeNotification: NotificationsService,
    private messagingService: MessagingService,
    private placeService: PlaceService) 
    {
       this.onload();
       this.isAdminValidation = false;
       this.hideMenu = false;
    }
  message;
  
  notificationRequest: NotificationRequest;

  ngOnInit() {

    if(window.orientation == 90){
      this.isHorizontal = true;
      this.isVertical = false;      
    }
    else{
      this.isVertical = true;
      this.isHorizontal = false;
    }

    window.addEventListener("orientationchange", ()=> {
      if (window.matchMedia("(orientation: portrait)").matches) {
        this.isHorizontal = true;
        this.isVertical = false;      
      }
    
      if (window.matchMedia("(orientation: landscape)").matches) {
        this.isVertical = true;
        this.isHorizontal = false;
      }
    });

    this.getAllPlace();
  }

  SendQualification(estrellas) {
    const info = JSON.parse(localStorage.getItem('NotificationInfo'));
    
    if(info != null){
    this.notificationRequest = new NotificationRequest();
    this.notificationRequest.place = info['place'];
    this.notificationRequest.payDesk = info['modul'];
    this.notificationRequest.recipient = info['recipiant'];
    var namePlace = this.crossCuttingList.find(x=> x.key==info['place']).value;
    this.notificationRequest.namePlace = info['namePlace'];
    this.notificationRequest.dateEmail = '2015-03-25T12:00:00-06:00';
    this.notificationRequest.qualification = estrellas;
    
    // this.sericeNotification.notificationUser(this.notificationRequest)
    // .subscribe(
    //   (data) => {
    //     const result = data;
    //     this.blocked = true;
    //     this.Success = true;
    //     this.startTimer();
    //   },
    //   error => {
    //     console.log(error);
    //   });
      
      var notificationPushRequest = new NotificationPushRequest();
      notificationPushRequest.namePlace = namePlace;
      notificationPushRequest.module = info['modul'];
      notificationPushRequest.idPlace = info['place'];
      notificationPushRequest.place = info['place'];
      notificationPushRequest.qualification = estrellas;

    this.sericeNotification.notificationPushUser(notificationPushRequest)
      .subscribe(
        (data) => {
        this.blocked = true;
        this.Success = true;
        this.startTimer();
        },
        error => {
          console.log(error);
        });
    }
    else{
      alert('Porfavor configure los parametros de envio');
    }
  }

  startTimer() {
    setInterval(() => {
      this.Success = false;
      this.blocked = false;
    },10000)
  }

  getAllPlace()
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

  SaveAsNotificationAdmin(nameRecipiant, placeId) {
    var namePlace = this.crossCuttingList.find(x=> x.key==placeId).value;
    this.messagingService.requestPermission(nameRecipiant, placeId, namePlace);
    this.message = this.messagingService.currentMessage
  }

  SaveNotificationInfo(recipiant, modul, place) {

    this.message = this.messagingService.currentMessage
    this.notification = new NotificationInfo();
    this.notification.recipiant = recipiant;
    this.notification.modul = modul;
    this.notification.place = place;
    this.notificationInfo.namePlace = this.crossCuttingList.find(x=> x.key==place).value;
    localStorage.setItem('NotificationInfo', JSON.stringify(this.notification));

  }

  onload(){
    this.notificationInfo = new NotificationInfo();
    this.notificationInfo.nameRecipiant = '';
    this.notificationInfo.modul = '';
    this.notificationInfo.place = '';
    this.notificationInfo.recipiant = '';
    this.selectedOptionPlace = '';
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

  validateAdmin(fieldValidtion){
    if(fieldValidtion === '991155')
    {
      this.isAdminValidation = true;
    }
  }

  hidenMenu(val){
    if(val){
      document.getElementById('menuRouter').style.display = 'none';
    }
    else{
      document.getElementById('menuRouter').style.display = 'block';
    }
  }
}
