import { Component, OnInit, Inject } from '@angular/core';
import { HelperUserInfo } from 'src/app/utilities/tools/helperUserInfo';
import { UserInfoModel } from 'src/app/model/users/userInfoModel';
import { TokenModel } from 'src/app/model/token/tokenModel';
import { RegisterRequest } from 'src/app/model/users/requestModel/registerRequest';
import { DatePipe } from '@angular/common';
import { CrossCuttingList } from 'src/app/model/crosscuttingList';
import { UserService } from 'src/app/services/user/user.service';
import { PlaceService } from 'src/app/services/place/place.service';
import { ProfileService } from 'src/app/services/profiles/profile.service';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfoModel: any;
  tokenModel: any;
  userToEdit: any;
  selectedPlace: any;
  selecRol: any;
  selecSchedule: any;
  registerRequest: RegisterRequest;
  passwordNotMatches: boolean;
  Success: boolean;
  Fail: boolean;
  crossCuttingListPermissions: any[];
  crossCuttingListSchedule: CrossCuttingList[];
  crossCuttingList: any;

  constructor(
    private userService: UserService, 
    private placeService: PlaceService,
    private profileService: ProfileService,
    private scheduleService: SchedulerService) {}

  ngOnInit() {
    this.userToEdit = new RegisterRequest();
    var _helperUserInfo = new HelperUserInfo();
    this.userInfoModel = new UserInfoModel();
    this.tokenModel = new TokenModel();
    var userInfo = _helperUserInfo.getUserInformation();
    if(userInfo != null) {
      this.tokenModel = userInfo;
      this.userInfoModel = this.tokenModel.userInfo;
      this.getAllPermissions(this.userInfoModel.placeId);
      this.getUserInfo(this.userInfoModel.id);
    }
    this.Success = false;
    this.Fail = false;
    this.getAllPlace();
  }

  startTimer() {
    setInterval(() => {
      this.Success = false;
      this.Fail = false;
    },4000)
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
        clistDefault.value = 'Seleccione...';
        this.crossCuttingList.unshift(clistDefault);
      },
      error => {
      });
  }

  loadUserInfo(){
    var datePipe = new DatePipe('en-US');
    this.selecRol = this.userToEdit.position;
    this.selectedPlace = this.userToEdit.idPlace;
    this.selecSchedule = this.userToEdit.idSchedule;
    this.userToEdit.bornDate = datePipe.transform(this.userToEdit.bornDate, 'yyyy-MM-dd');
  }

  editUser(Name,Apellido,Email,
    FechaNacimiento,Pais,Ciudad,Password
    ,RePassword,Perfil,Turno,selectedOption){
      if(Password == RePassword){
      this.registerRequest = new RegisterRequest();
      this.registerRequest.firstName = Name; 
      this.registerRequest.lastName = Apellido;
      this.registerRequest.userName = Email;
      this.registerRequest.bornDate = FechaNacimiento;
      this.registerRequest.country = Pais;
      this.registerRequest.city = Ciudad;
      this.registerRequest.password = Password;
      this.registerRequest.position = Perfil;
      this.registerRequest.idSchedule = Turno;
      this.registerRequest.nickName = Name + ' ' + Apellido;
      this.registerRequest.idPlace = selectedOption;
      this.registerRequest.isActive = true;
      this.registerRequest.claims = null;
    this.userService.updateUser(this.registerRequest, this.userInfoModel.id).subscribe(
      (data) => {
        this.passwordNotMatches = false;
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Fail = true;
        this.startTimer();
      });
    }
      else{
        this.passwordNotMatches = true;
      }
  }

  getUserInfo(userId){
    this.userService.getUserById(userId).subscribe((data) => {
      this.userToEdit = data;
    },
    error => {
    })
  }

  getAllPermissions(place)
  {
    var placeId = place;
    if(place.length > 36){
      placeId = place.slice(3,place.length);
    }
    this.profileService.getAllPermissions(placeId).subscribe(
      (data) => {
        this.crossCuttingListPermissions = new Array<CrossCuttingList>();
        
        for(let _i = 0; _i < data.length; _i++)
        {
          var clist = new CrossCuttingList();
          clist.key = data[_i].id;
          clist.value = data[_i].name;
          this.crossCuttingListPermissions[_i] = clist;
        }

        var clistDefault = new CrossCuttingList();
        clistDefault.key = '000000000000000';
        clistDefault.value = 'Seleccione....';
        this.crossCuttingListPermissions.unshift(clistDefault);

      },
      error => {
      });

     this.scheduleService.getAllSchedulers(placeId).subscribe(
      (dataSchedule) => {
        this.crossCuttingListSchedule = new Array<CrossCuttingList>();
        
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

