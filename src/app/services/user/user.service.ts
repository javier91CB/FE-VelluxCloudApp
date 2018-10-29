import { Injectable } from '@angular/core';
import { RegisterRequest } from '../../model/users/requestModel/registerRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Security_Url } from '../../utilities/url/security_Url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = Security_Url.userUrl;
  response: any;
  registerRequest: RegisterRequest;

  constructor(
    private http: HttpClient) {}

  createUser(registerRequest: RegisterRequest){
    debugger;
    this.response = this.http.post(
      this.API_URL + '/RegisterUser', 
      JSON.stringify(registerRequest), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  updateUser(registerRequest: RegisterRequest, userId: string){
    this.response = this.http.put(
      this.API_URL + '/UpdateUser/'+userId, 
      JSON.stringify(registerRequest), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  deleteUser(userId: string){
    this.response = this.http.delete(
      this.API_URL + '/RemoveUser/'+userId, 
     {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  getAllUsers(placeId: string){
    this.response = this.http.get(
      this.API_URL + '/GetAllUsers/'+placeId, 
      {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });

    return this.response;

  }

  getPhoto(userId: string){
    
    this.response = this.http.get(
      this.API_URL + '/GetPhoto/'+userId, 
      {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });

    return this.response;
  }
}
