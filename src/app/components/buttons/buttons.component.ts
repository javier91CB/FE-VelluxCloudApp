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
crossCuttingList: CrossCuttingList[];
arrayRegisterRequest: any[];
scheduler: Array<ScheduleModel>;
loading: boolean;

  constructor(
    private buttonsService: ButtonsService,
    private placeService: PlaceService,
    private userService: UserService,) { 
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
    this.getAllPlace(this.placeId)
    this.getAllButtons(this.placeId)
    this.Success = false;
    this.Fail = false;
  }

  getAllUser(placeId){
    this.arrayRegisterRequest = Array<RegisterRequest>();
    this.userService.getAllUsers(placeId).subscribe(
      (data) => {
        this.arrayRegisterRequest = data;
      },
      error => {
      });
  }

  getAllPlace(placeId)
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
} 
