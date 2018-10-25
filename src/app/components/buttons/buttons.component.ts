import { Component, OnInit } from '@angular/core';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { HelperUserInfo } from 'src/app/utilities/tools/helperUserInfo';
import { UserInfoModel } from 'src/app/model/users/userInfoModel';
import { TokenModel } from 'src/app/model/token/tokenModel';
import { CrossCuttingList } from 'src/app/model/crosscuttingList';
import { RegisterRequest } from 'src/app/model/users/requestModel/registerRequest';
import { PlaceService } from 'src/app/services/place/place.service';
import { UserService } from 'src/app/services/user/user.service';
import { ScheduleModel } from 'src/app/model/schedule/scheduleModel';
import { ButtonRequest } from 'src/app/model/buttons/requestModel/buttonRequest';
import { ScheduleResponse } from 'src/app/model/schedule/response/scheduleResponse';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
fileToUpload : File = null;
fileBottons:any;
show = true;
Success:boolean;
Fail:boolean;
placeId: string;
tokenModel: any;
userInfoModel: UserInfoModel;
arrayRegisterRequest: any[];
scheduler: Array<ScheduleModel>;
loading: boolean;
buttonNew: ButtonRequest;
crossCuttingList: CrossCuttingList[];
crossCuttingListSchedule: any[];
crossCuttingListUsers: any[];

  constructor(
    private buttonsService: ButtonsService,
    private placeService: PlaceService,
    private userService: UserService,
    private schedulerService: SchedulerService) { 
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
    this.getAllUser(this.placeId)
    this.getAllPlace()
    this.getAllButtons(this.placeId)
    this.getAllSchedule(this.placeId)
    this.Success = false;
    this.Fail = false;
  }

  getAllUser(placeId){
    this.arrayRegisterRequest = Array<RegisterRequest>();
    this.userService.getAllUsers(placeId).subscribe(
      (data) => {
        debugger;
        this.crossCuttingListUsers = new Array<CrossCuttingList>();
        
        for(let _i = 0; _i < data.length; _i++)
        {
          var clist = new CrossCuttingList();
          clist.key = data[_i].id;
          clist.value = data[_i].nickName;
          this.crossCuttingListUsers[_i] = clist;
        }
        var clistDefault = new CrossCuttingList();
        clistDefault.key = '000000000000000';
        clistDefault.value = 'Seleccione....';
        this.crossCuttingListUsers.unshift(clistDefault);
      },
      error => {
      });
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
        var clistDefault = new CrossCuttingList();
        clistDefault.key = '000000000000000';
        clistDefault.value = 'Seleccione....';
        this.crossCuttingList.unshift(clistDefault);
      },
      error => {
      });
  }

  getAllButtons(placeId){
    this.buttonsService.getAllSchedulers(placeId).subscribe(
      (data) => {
    var array = new Array<ScheduleModel>();
         for(let _i=0; _i < data.length; _i++){
          var item = new ScheduleModel();
          item.id = data[_i].id;
          item.idButton = data[_i].idButton;
          item.owner = data[_i].owner;
          item.schedule = data[_i].schedule;
          item.placeId = data[_i].placeId;
          array[_i] = item;
         } 
        this.scheduler = array;
        this.loading = false;
        },
        error => {
          this.Success = false;
          this.startTimer();
        });
  }

  startTimer() {
    setInterval(() => {
      this.Success = false;
      this.Fail = false;
    },4000)
  }

  handleFileInput(File: FileList ){
      this.fileToUpload = File.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) =>{
      this.fileBottons = event.target.result;
      }
    reader.readAsDataURL(this.fileToUpload)
    this.buttonsService.postFile(this.fileToUpload).subscribe(
      (data) => {
        
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Success = false;
        this.startTimer();
      });
  }

  showDetails(){
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
  }

  createButton(BotonName, Owner, Schedule, Place){
    debugger;
    var buttonRequest = new ButtonRequest();
    buttonRequest.idButton = BotonName;
    buttonRequest.owner = this.crossCuttingListUsers.find(x=>x.key === Owner).value;
    buttonRequest.placeId = Place;
    buttonRequest.schedule = this.crossCuttingListSchedule.find(x=>x.key === Schedule).value;
    this.buttonsService.createButton(buttonRequest).subscribe(
      (data) => {
        this.getAllButtons(this.placeId);
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Success = false;
        this.startTimer();
      });
  }

  updateButton(button){
    debugger;
    var buttonRequest = new ButtonRequest();
    buttonRequest.idButton = button.idButton;
    buttonRequest.owner = button.owner;
    buttonRequest.placeId = button.placeId;
    buttonRequest.schedule = button.schedule;

    this.buttonsService.updateButton(buttonRequest, button.id).subscribe(
      (data) => {
        this.getAllButtons(this.placeId);
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Success = false;
        this.startTimer();
      });
  }

  removeButton(buttonId){
    this.buttonsService.removeButton(buttonId).subscribe(
      (data) => {
        this.getAllButtons(this.placeId);
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Success = false;
        this.startTimer();
      });
  }

  loadNewButtonInfo(){
    this.buttonNew = new ButtonRequest();
  }

  getAllSchedule(placeId){
    this.schedulerService.getAllSchedulers(placeId).subscribe(
      (dataSchedule) => {
        this.crossCuttingListSchedule = Array<ScheduleResponse>();    
        for(let _is = 0; _is < dataSchedule.length; _is++)
        {
          var clist = new CrossCuttingList();
          clist.key = dataSchedule[_is].id;
          clist.value = dataSchedule[_is].schedulName;
          this.crossCuttingListSchedule[_is] = clist;
        }
        var clistDefault = new CrossCuttingList();
        clistDefault.key = '000000000000000';
        clistDefault.value = 'Seleccione....';
        this.crossCuttingListSchedule.unshift(clistDefault);
      },
      error => {
      });
  }
} 
