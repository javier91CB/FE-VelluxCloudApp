import { Component, OnInit } from '@angular/core';
import { NotificationInfo } from '../../../model/notification/notificationInfo';
import { NotificationRequest } from '../../../model/notification/requestModel/notificationRequest';
import { NotificationsService } from '../../../services/notification/notifications.service';
import { MessagingService } from 'src/app/services/shared/messaging.service';
import { CrossCuttingList } from 'src/app/model/crosscuttingList';
import { PlaceService } from 'src/app/services/place/place.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {

  notification: NotificationInfo;
  Success:boolean;
  blocked:boolean;
  crossCuttingList: any;

  constructor(
    private sericeNotification: NotificationsService,
    private messagingService: MessagingService,
    private placeService: PlaceService) { }
  message;
  
  notificationRequest: NotificationRequest;

  ngOnInit() {
    this.getAllPlace();
  }

  SendQualification(estrellas) {
    const info = JSON.parse(localStorage.getItem('NotificationInfo'));

    this.notificationRequest = new NotificationRequest();
    this.notificationRequest.place = info['place'];
    this.notificationRequest.payDesk = info['modul'];
    this.notificationRequest.recipient = info['recipiant'];
    this.notificationRequest.dateEmail = '2015-03-25T12:00:00-06:00';
    this.notificationRequest.qualification = estrellas;
    
    this.sericeNotification.notificationUser(this.notificationRequest)
    .subscribe(
      (data) => {
        const result = data;
        this.blocked = true;
        this.Success = true;
        this.startTimer();
      },
      error => {
        console.log(error);
      });
  }

  startTimer() {
    setInterval(() => {
      this.Success = false;
      this.blocked = false;
    },10000)
  }

  getAllPlace()
  {
    debugger;
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

  SaveAsNotificationAdmin(nomeRecipiant, recipiant) {

    this.messagingService.requestPermission(nomeRecipiant, recipiant)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }

  SaveNotificationInfo(nomeRecipiant, recipiant, modul, place) {

    this.message = this.messagingService.currentMessage
    this.notification = new NotificationInfo();
    this.notification.nomeRecipiant = nomeRecipiant;
    this.notification.recipiant = recipiant;
    this.notification.modul = modul;
    this.notification.place = place;

    localStorage.setItem('NotificationInfo', JSON.stringify(this.notification));

  }
}
