import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../../services/scheduler/scheduler.service';
import { ScheduleRequest } from '../../model/schedule/request/scheduleRequest';
import { PlaceService } from 'src/app/services/place/place.service';
import { CrossCuttingList } from 'src/app/model/crosscuttingList';
import { RolModel } from '../../model/roles/rolModel';
import { UserInfoModel } from '../../model/users/userInfoModel';
import { HelperUserInfo } from '../../utilities/tools/helperUserInfo';
import { TokenModel } from '../../model/token/tokenModel';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  horary : Array<string>;
  Success:boolean;
  Fail:boolean;
  crossCuttingList: Array<CrossCuttingList>;

  arrayRoles: Array<RolModel>;
  rolesToEdit: RolModel;
  userInfoModel: UserInfoModel;
  tokenModel: any;
  placeId:string;
  userId:string;
  
  constructor(
    private schedulerService: SchedulerService,
    private placeService: PlaceService) { }

  ngOnInit() {
    var _helperUserInfo = new HelperUserInfo();
    this.userInfoModel = new UserInfoModel();
    this.tokenModel = new TokenModel();
    var userInfo = _helperUserInfo.getUserInformation();
    if(userInfo != null) {
      this.tokenModel = userInfo;
      this.userInfoModel = this.tokenModel.userInfo;
    }
    debugger;
    this.placeId = this.tokenModel.userInfo.placeId;
    this.userId = this.tokenModel.userInfo.id;
    this.rolesToEdit = new RolModel();
    this.getAllPlace()
    this.Success = false;
    this.Fail = false;
  }

  startTimer() {
    
    setInterval(() => {
      this.Success = false;
      this.Fail = false;
    },4000)
  }

  getAllPlace()
  {
    debugger;
    this.placeService.getAllPlaces().subscribe(
      (data) => {
        this.crossCuttingList = new Array<CrossCuttingList>();
        
        for(let _i = 0; _i < data.length; _i++)
        {
          var clist = new CrossCuttingList();
          clist.key = data[_i].id;
          clist.value = data[_i].placeName;
          this.crossCuttingList[_i] = clist;
        }
      },
      error => {
      });
  }

  updateSchedul(Id, IsActive, NameSchedule,Monday,Tuesday,
    Wednesday, Thursday, Friday, Saturday, Sunday,
    StrHour, EndHour, selectedOption){
      debugger;
      var request = new ScheduleRequest();
      request.days = new Array<string>();
      request.isActive = IsActive == 'on' ? true : false;
      request.schedulName = NameSchedule;
      request.endHour = EndHour;
      request.startHour = StrHour;
      request.days[0] = Monday == 'on' ? '1' : '';
      request.days[1] = Tuesday == 'on' ? '2' : '';
      request.days[2] = Wednesday == 'on'  ? '3' : '';
      request.days[3] = Thursday == 'on' ? '4' : '';
      request.days[4] = Friday == 'on' ? '5' : '';
      request.days[5] = Saturday == 'on' ? '6' : '';
      request.days[6] = Sunday == 'on' ? '7' : '';
      request.idPlace = selectedOption

      this.schedulerService.updateScheduler(request, Id).subscribe(
        (data) => {
          this.Success = true;
          this.startTimer();
        },
        error => {
          this.Success = false;
          this.startTimer();
        });

    }


    createSchedul(IsActive, NameSchedule,Monday,Tuesday,
      Wednesday, Thursday, Friday, Saturday, Sunday,
      StrHour, EndHour, selectedOption){
debugger;
        var request = new ScheduleRequest();
        request.days = new Array<string>();
        request.isActive = IsActive == 'on' ? true : false;
        request.schedulName = NameSchedule;
        request.endHour = EndHour;
        request.startHour = StrHour;
        request.days[0] = Monday == 'on' ? '1' : '';
        request.days[1] = Tuesday == 'on' ? '2' : '';
        request.days[2] = Wednesday == 'on'  ? '3' : '';
        request.days[3] = Thursday == 'on' ? '4' : '';
        request.days[4] = Friday == 'on' ? '5' : '';
        request.days[5] = Saturday == 'on' ? '6' : '';
        request.days[6] = Sunday == 'on' ? '7' : '';
        request.idPlace = selectedOption
  
        this.schedulerService.createScheduler(request).subscribe(
          (data) => {
            this.Success = true;
            this.startTimer();
          },
          error => {
            this.Success = false;
            this.startTimer();
          });
      }

}
