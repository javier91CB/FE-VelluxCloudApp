import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/retry';
// import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import { UserRequest } from '../../model/userRequest';

@Injectable()
export class LoginService {

  userRequest: UserRequest;
  private readonly API_URL = 'http://localhost:65308/api/User';
  constructor(private http: HttpClient) {}

  userAuthentication(userName, password): Observable<any> {
    console.log(this.API_URL);
    this.userRequest = new UserRequest();
    this.userRequest.username = userName;
    this.userRequest.password = password;

    return this.http.post(this.API_URL + '/Token', JSON.stringify(this.userRequest), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    }
}
