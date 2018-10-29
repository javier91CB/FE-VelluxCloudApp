import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  updateToken(userId, placeId, namePlace, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data['Admin'] = userId;
        data['PlaceId'] = placeId;
        data['Token'] = token;
        this.angularFireDB.object(namePlace+'/').update(data)
      })
  }

  requestPermission(userId, placeId, namePlace) {
    alert('Proceso de suscribirse');
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        alert(token);
        this.updateToken(userId, placeId, namePlace, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage(){
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        alert(payload['notification'].title);
        alert(payload['notification'].body);
        this.currentMessage.next(payload);
      })
  }
}
