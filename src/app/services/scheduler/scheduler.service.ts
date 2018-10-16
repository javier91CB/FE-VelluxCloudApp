import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Security_Url } from '../../utilities/url/security_Url';
import { ScheduleRequest } from '../../model/schedule/request/scheduleRequest';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  private API_URL = Security_Url.schedulerUrl;
  response: any;

  constructor(
    private http: HttpClient) { }

  getScheduler(idPlace: string){
    this.response = this.http.post(
      this.API_URL + '/RegisterSchedule/'+idPlace, 
      {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  createScheduler(scheduleRequest: ScheduleRequest){
    this.response = this.http.post(
      this.API_URL + '/RegisterSchedule', 
      JSON.stringify(scheduleRequest), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  updateScheduler(scheduleRequest: ScheduleRequest, SchedulerId: string){
    this.response = this.http.put(
      this.API_URL + '/UpdateSchedule/'+SchedulerId, 
      JSON.stringify(scheduleRequest), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  deleteScheduler(SchedulerId: string){
    this.response = this.http.delete(
      this.API_URL + '/RemoveSchedule/'+SchedulerId, 
     {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });
    return this.response;
  }

  getAllSchedulers(placeId: string){
    debugger;
    this.response = this.http.get(
      this.API_URL + '/GetAllScheduleByPlace/'+placeId, 
      {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      });

    return this.response;
  }
  
}
