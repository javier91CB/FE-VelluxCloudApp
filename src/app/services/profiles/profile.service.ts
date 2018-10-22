import { Injectable } from '@angular/core';
import { RolesRequest } from '../../model/roles/requestModel/rolesRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Security_Url } from '../../utilities/url/security_Url';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private API_URL = Security_Url.permissionUrl;
  response: any;
  rolesRequest: RolesRequest;

  constructor(
    private http: HttpClient) {}

  createPermission(rolesRequest: RolesRequest){
    this.response = this.http.post(
      this.API_URL + '/RegisterPermission', 
      JSON.stringify(rolesRequest), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  updatePermission(rolesRequest, PermissionId){
    this.response = this.http.put(
      this.API_URL + '/UpdatePermission/'+PermissionId, 
      JSON.stringify(rolesRequest), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  deletePermission(PermissionId: string){
    this.response = this.http.delete(
      this.API_URL + '/RemovePermission/'+PermissionId, 
     {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  getAllPermissions(placeId: string){
    this.response = this.http.get(
      this.API_URL + '/RegisterPermission/'+placeId, 
      {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }
}
