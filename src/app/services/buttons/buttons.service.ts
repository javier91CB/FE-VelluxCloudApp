import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { caller_Url } from 'src/app/utilities/url/caller_Url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonsService {

  private endpoint = caller_Url.callerUrl;
  response: any;
  constructor(private http: HttpClient) { }

  getAllSchedulers(placeId: string){
    this.response = this.http.get(
      this.endpoint + '/GetAllButtonScheduleByPlace/'+placeId, 
      {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });

    return this.response;
  }

  createButton(button){
    this.response = this.http.post(
      this.endpoint + '/CreateButton', 
      button,
      {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });

    return this.response;
  }

  updateButton(button,buttonId){
    this.response = this.http.put(
      this.endpoint + '/CreateButton/'+buttonId,
      button, 
      {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });

    return this.response;
  }

  removeButton(buttonId){
    this.response = this.http.get(
      this.endpoint + '/DeleteButton/'+buttonId, 
      {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });

    return this.response;
  }

  postFile(fileUpload: File):Observable<any>{
    let formData = new FormData();
    formData.append('buttonsFile',fileUpload);
    return this.http.post(this.endpoint+'/UploadButtons',
    formData);
  }

}
