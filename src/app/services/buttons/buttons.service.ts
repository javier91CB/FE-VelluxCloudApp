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
    debugger;
    this.response = this.http.get(
      this.endpoint + '/GetAllButtonScheduleByPlace/'+placeId, 
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
