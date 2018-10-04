import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationRequest } from '../../model/notification/requestModel/notificationRequest';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly API_URL = 'https://vcnotificationapi.azurewebsites.net/api';
  constructor(private http: HttpClient) {}

  notificationUser(notificationRequest: NotificationRequest): Observable<any> {
    console.log(this.API_URL);
    return this.http.post(this.API_URL + '/SendGrid', JSON.stringify(notificationRequest), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    }
}
