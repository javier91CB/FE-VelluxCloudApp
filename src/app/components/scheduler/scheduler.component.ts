import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../../services/scheduler/scheduler.service';
import { ScheduleRequest } from '../../model/schedule/request/scheduleRequest';
import { PlaceService } from 'src/app/services/place/place.service';
import { CrossCuttingList } from 'src/app/model/crosscuttingList';
import { RolModel } from '../../model/roles/rolModel';
import { UserInfoModel } from '../../model/users/userInfoModel';
import { HelperUserInfo } from '../../utilities/tools/helperUserInfo';
import { TokenModel } from '../../model/token/tokenModel';
import { ScheduleResponse } from 'src/app/model/schedule/response/scheduleResponse';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  loading: boolean;
  mond :boolean;
  tues :boolean;
  wedn :boolean;
  thur :boolean;
  frid :boolean;
  satu :boolean;
  sund :boolean;

  Monday :boolean;
  Tuesday :boolean;
  Wednesday :boolean;
  Thursday :boolean;
  Friday :boolean;
  Saturday :boolean;
  Sunday :boolean;

  
  startT :string;
  endT :string;

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
  arrayScheduleRequest : Array<ScheduleResponse>
  isAct: false;
  schedulerToEdit: ScheduleRequest;
  schedulerToEditUpload: ScheduleResponse;

  constructor(
    private schedulerService: SchedulerService,
    private placeService: PlaceService) {
      this.loading = true;
     }

  ngOnInit() {
    var _helperUserInfo = new HelperUserInfo();
    this.userInfoModel = new UserInfoModel();
    this.tokenModel = new TokenModel();
    var userInfo = _helperUserInfo.getUserInformation();
    if(userInfo != null) {
      this.tokenModel = userInfo;
      this.userInfoModel = this.tokenModel.userInfo;
    }
    this.placeId = this.tokenModel.userInfo.placeId;
    this.userId = this.tokenModel.userInfo.id;
    this.rolesToEdit = new RolModel();
    this.getAllPlace()
    this.getAllSchedule(this.placeId);
    this.Success = false;
    this.Fail = false;
  }

  loadNewScheduleInfo(){
    this.schedulerToEdit = new ScheduleRequest();
  }

  loadScheduleInfo(register){
    this.schedulerToEditUpload = new ScheduleResponse();
    this.schedulerToEditUpload = register;
    this.Monday = register.days[0].length > 0;
    this.Tuesday = register.days[1].length > 0;
    this.Wednesday = register.days[2].length > 0;
    this.Thursday = register.days[3].length > 0;
    this.Friday = register.days[4].length > 0;
    this.Saturday = register.days[5].length > 0;
    this.Sunday = register.days[6].length > 0;
  }

  startTimer() {
    
    setInterval(() => {
      this.Success = false;
      this.Fail = false;
    },10000)
  }

  getAllPlace()
  {
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
        this.loading = false;
      },
      error => {
      });
  }

  isActive(val){
    this.isAct = val;
  }

  monday(val){
    this.mond = val;
  }

  tuesday(val){
    this.tues = val;
  }

  wednesday(val){
    this.wedn = val;
  }

  thursday(val){
    this.thur = val;
  }

  friday(val){
    this.frid = val;
  }

  saturday(val){
    this.satu = val;
  }

  sunday(val){
    this.sund = val;
  }
  
  startTime(val){
    this.startT = val;
  }

  endTime(val){
    this.endT = val;
  }

  updateSchedul(Id, IsActive, NameSchedule,
    StrHour, EndHour, selectedOption){
      var request = new ScheduleRequest();
      request.days = new Array<string>();
      request.isActive = this.isAct;
      request.schedulName = NameSchedule;
      request.endHour = this.endT;
      request.startHour = this.startT;
      request.days[0] = this.mond ? 'Monday' : '';
      request.days[1] = this.thur ? 'Tuesday' : '';
      request.days[2] = this.wedn ? 'Wednesday' : '';
      request.days[3] = this.thur ? 'Thursday' : '';
      request.days[4] = this.frid ? 'Friday' : '';
      request.days[5] = this.satu ? 'Saturday' : '';
      request.days[6] = this.sund ? 'Sunday' : '';
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
        var request = new ScheduleRequest();
        request.days = new Array<string>();
        request.isActive = IsActive == 'on' ? true : false;
        request.schedulName = NameSchedule;
        request.endHour = this.endT;
        request.startHour = this.startT;
        request.days[0] = this.mond ? 'Monday' : '';
        request.days[1] = this.thur ? 'Tuesday' : '';
        request.days[2] = this.wedn ? 'Wednesday' : '';
        request.days[3] = this.thur ? 'Thursday' : '';
        request.days[4] = this.frid ? 'Friday' : '';
        request.days[5] = this.satu ? 'Saturday' : '';
        request.days[6] = this.sund ? 'Sunday' : '';
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

      getAllSchedule(placeId){
        this.arrayScheduleRequest = Array<ScheduleResponse>();
        this.schedulerService.getAllSchedulers(placeId).subscribe(
          (data) => {
            this.arrayScheduleRequest = data;
          },
          error => {
          });
      }
}
