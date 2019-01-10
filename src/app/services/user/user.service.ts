import { Injectable } from '@angular/core';
import { RegisterRequest } from '../../model/users/requestModel/registerRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Security_Url } from '../../utilities/url/security_Url';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = Security_Url.userUrl;
  response: any;
  responseCipher: any;
  registerRequest: RegisterRequest;

  constructor(
    private http: HttpClient) {}

  createUser(registerRequest: RegisterRequest){
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

  getUserById(userId: string){
    this.response = this.http.get(
      this.API_URL + '/GetUserById/' + userId, 
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

  cipher(valueToCipher: string){
    var key = CryptoJS.enc.Utf8.parse('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9eyJpc3MiOiJhdXRoMCJ9AbIJTDMFc7yUa5MhvcP03nJPyCPzZtQcGEpzWfOkEF');
    var iv = CryptoJS.enc.Utf8.parse('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9eyJpc3MiOiJhdXRoMCJ9AbIJTDMFc7yUa5MhvcP03nJPyCPzZtQcGEpzWfOkEF');
    return this.responseCipher = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(valueToCipher), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    
  }
  
  decipher(encrypted: string | CryptoJS.WordArray){
    var key = CryptoJS.enc.Utf8.parse('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9eyJpc3MiOiJhdXRoMCJ9AbIJTDMFc7yUa5MhvcP03nJPyCPzZtQcGEpzWfOkEF');
    var iv = CryptoJS.enc.Utf8.parse('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9eyJpc3MiOiJhdXRoMCJ9AbIJTDMFc7yUa5MhvcP03nJPyCPzZtQcGEpzWfOkEF');
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });
  }
}
