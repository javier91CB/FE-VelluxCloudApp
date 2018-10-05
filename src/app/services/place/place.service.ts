import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Security_Url } from '../../utilities/url/security_Url';
import { RolesRequest } from '../../model/roles/requestModel/rolesRequest';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private API_URL = Security_Url.placeUrl;
  response: any;

  constructor(
    private http: HttpClient) {}

  createPlace(placeRequest){
    this.response = this.http.post(
      this.API_URL + '/RegisterPlace', 
      JSON.stringify(placeRequest), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  updatePlace(placeRequest, placeId){
    debugger;
    this.response = this.http.put(
      this.API_URL + '/UpdatePlace/'+placeId, 
      JSON.stringify(placeRequest), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  deletePlace(placeId: string){
    this.response = this.http.delete(
      this.API_URL + '/RemovePlace/'+placeId, 
     {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  getAllPlaces(){
    this.response = this.http.get(
      this.API_URL + '/GetAllPlace', 
      {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }
}
