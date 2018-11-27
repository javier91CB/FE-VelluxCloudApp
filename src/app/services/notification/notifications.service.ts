import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationRequest } from '../../model/notification/requestModel/notificationRequest';
import { NotificationPushRequest } from 'src/app/model/notification/requestModel/notificationPushRequest';
import { notification_Url } from 'src/app/utilities/url/notification_Url';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly API_URL = notification_Url.notificationUrl;
  constructor(private http: HttpClient) {}

  // notificationUser(notificationRequest: NotificationRequest): Observable<any> {
  //   console.log(this.API_URL);
  //   return this.http.post(this.API_URL + '/Email', JSON.stringify(notificationRequest), {
  //     headers: new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     });
  //   }

  notificationPushUser(notificationPushRequest: NotificationPushRequest): Observable<any> {
      console.log(this.API_URL);
      return this.http.post(this.API_URL + '/NotificationPush', JSON.stringify(notificationPushRequest), {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        });
    }

  notificationPushQualification(place): Observable<any> {
      console.log(this.API_URL);
      var offset = new Date().getTimezoneOffset()/60;
      return this.http.get(this.API_URL + '/NotificationPush/'+place+'/'+offset,
      {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
      });
    }
}
