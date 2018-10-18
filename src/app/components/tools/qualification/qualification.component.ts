import { Component, OnInit } from '@angular/core';
import { NotificationInfo } from '../../../model/notification/notificationInfo';
import { NotificationRequest } from '../../../model/notification/requestModel/notificationRequest';
import { NotificationsService } from '../../../services/notification/notifications.service';
import { MessagingService } from 'src/app/services/shared/messaging.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {

  notification: NotificationInfo;
  Success:boolean;
  blocked:boolean;

  constructor(
    private sericeNotification: NotificationsService,
    private messagingService: MessagingService) { }
  message;
  
  notificationRequest: NotificationRequest;

  ngOnInit() {
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

  SaveNotificationInfo(nomeRecipiant, recipiant, modul, place) {

    const userId = nomeRecipiant;
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage

    this.notification = new NotificationInfo();
    this.notification.nomeRecipiant = nomeRecipiant;
    this.notification.recipiant = recipiant;
    this.notification.modul = modul;
    this.notification.place = place;

    localStorage.setItem('NotificationInfo', JSON.stringify(this.notification));

  }
}
