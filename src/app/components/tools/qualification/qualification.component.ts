import { Component, OnInit } from '@angular/core';
import { NotificationInfo } from '../../../model/notification/notificationInfo';
import { NotificationRequest } from '../../../model/notification/requestModel/notificationRequest';
import { NotificationsService } from '../../../services/notification/notifications.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {

  notification: NotificationInfo;
  constructor(private sericeNotification: NotificationsService) { }

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
      },
      error => {
        console.log(error);
      });
  }

  SaveNotificationInfo(recipiant, modul, place) {

    this.notification = new NotificationInfo();
    this.notification.recipiant = recipiant;
    this.notification.modul = modul;
    this.notification.place = place;

    localStorage.setItem('NotificationInfo', JSON.stringify(this.notification));
  }
}
