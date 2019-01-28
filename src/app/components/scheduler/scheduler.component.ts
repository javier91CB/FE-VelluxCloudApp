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
import { ScheduleAuxModel } from 'src/app/model/schedule/scheduleAuxModel';

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
  arrayScheduleRequest : Array<ScheduleAuxModel>
  isAct: false;
  schedulerToEdit: ScheduleRequest;
  schedulerToEditUpload: ScheduleAuxModel;
  selectedOption: any;

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
    this.schedulerToEditUpload = new ScheduleAuxModel();
    this.getAllSchedule(this.placeId);
    this.getAllPlace()
    this.Success = false;
    this.Fail = false;
  }

  loadNewScheduleInfo(){
    debugger;
    this.schedulerToEdit = new ScheduleResponse();
  }

  loadScheduleInfo(register){
    debugger;
    this.schedulerToEditUpload = register;
    this.selectedOption = this.placeId;
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

  updateSchedul(schedule,selectedOption){
      var request = new ScheduleRequest();
      request.days = new Array<string>();
      request.isActive = schedule.isActive;
      request.schedulName = schedule.schedulName;
      request.endHour = schedule.endHour;
      request.startHour = schedule.startHour;
      request.days[0] = schedule.monday ? 'Monday' : '';
      request.days[1] = schedule.tuesday ? 'Tuesday' : '';
      request.days[2] = schedule.wednesday ? 'Wednesday' : '';
      request.days[3] = schedule.thursday ? 'Thursday' : '';
      request.days[4] = schedule.friday ? 'Friday' : '';
      request.days[5] = schedule.saturday ? 'Saturday' : '';
      request.days[6] = schedule.sunday ? 'Sunday' : '';
      request.idPlace = selectedOption

      this.schedulerService.updateScheduler(request, schedule.id).subscribe(
        (data) => {
          this.getAllSchedule(this.placeId);
          this.Success = true;
          this.startTimer();
        },
        error => {
          this.Success = false;
          this.startTimer();
        });

    }

    createSchedul(IsActive, NameSchedule,selectedOption){
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
            this.getAllSchedule(this.placeId);
            this.Success = true;
            this.startTimer();
          },
          error => {
            this.Success = false;
            this.startTimer();
          });
      }

      getAllSchedule(placeId){
        this.schedulerService.getAllSchedulers(placeId).subscribe(
          (data) => {
            var arraySchedule = Array<ScheduleAuxModel>();
            for(var _i = 0; _i < data.length; _i++)
            {
              var schedule = new ScheduleAuxModel();
              schedule.id = data[_i].id;
              schedule.schedulName = data[_i].schedulName;
              schedule.startHour = data[_i].startHour;
              schedule.endHour = data[_i].endHour;
              schedule.isActive = data[_i].isActive;
              schedule.monday    = data[_i].days[0] == 'Monday';
              schedule.tuesday   = data[_i].days[1] == 'Tuesday';
              schedule.wednesday = data[_i].days[2] == 'Wednesday';
              schedule.thursday  = data[_i].days[3] == 'Thursday';
              schedule.friday    = data[_i].days[4] == 'Friday';
              schedule.saturday  = data[_i].days[5] == 'Saturday';
              schedule.sunday    = data[_i].days[6] == 'Sunday';
              
              arraySchedule[_i] = schedule;
            }
            this.loading = false;
            this.arrayScheduleRequest = arraySchedule;
          },
          error => {
          });
      }

      removeSchedule(id){
        this.schedulerService.deleteScheduler(id).subscribe(
          (data) => {
            this.getAllSchedule(this.placeId);
            this.loading = false;
          },
          error => {
          });
      }
}
