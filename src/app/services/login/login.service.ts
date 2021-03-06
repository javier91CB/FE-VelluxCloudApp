import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest } from '../../model/users/requestModel/userRequest';
import { Security_Url } from '../../utilities/url/security_Url';

@Injectable()
export class LoginService {

  userRequest: UserRequest;
  private readonly API_URL = Security_Url.userUrl;
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
