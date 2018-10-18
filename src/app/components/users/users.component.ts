import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { RegisterRequest } from '../../model/users/requestModel/registerRequest';
import { HelperUserInfo } from '../../utilities/tools/helperUserInfo';
import { UserInfoModel } from '../../model/users/userInfoModel';
import { TokenModel } from '../../model/token/tokenModel';
import { PlaceService } from '../../services/place/place.service';
import { CrossCuttingList } from '../../model/crosscuttingList';
import { ProfileService } from '../../services/profiles/profile.service';
import { ScheduleResponse } from 'src/app/model/schedule/response/scheduleResponse';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  arrayRegisterRequest:Array<RegisterRequest>;
  registerRequest:RegisterRequest;
  paginator: boolean;
  passwordNotMatches= false;
  loading: boolean;
  userInfoModel: UserInfoModel;
  tokenModel: any;
  userToEdit: RegisterRequest;
  Success:boolean;
  Fail:boolean;
  placeId: string;
  
  crossCuttingList: Array<CrossCuttingList>;
  crossCuttingListPermissions: Array<CrossCuttingList>;
  crossCuttingListSchedule: Array<CrossCuttingList>;
  isAct: false;
  arrayScheduleRequest: any[];

  constructor(private userService: UserService, 
    private placeService: PlaceService,
    private profileService: ProfileService,
    private scheduleService: SchedulerService ) {
    this.paginator = true;
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
    this.userToEdit = new RegisterRequest();
    this.getAllUser(this.placeId)
    this.getAllPlace(this.placeId)
    this.Success = false;
    this.Fail = false;
  }

  
  startTimer() {
    setInterval(() => {
      this.Success = false;
      this.Fail = false;
    },4000)
  }
  
  isActive(val){
    this.isAct = val;
  }

  getAllPlace(placeId)
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

  getAllPermissions(placeId)
  {
    var s = placeId.toString().slice(3,placeId.length);
    this.profileService.getAllPermissions(s).subscribe(
      (data) => {
        this.crossCuttingListPermissions = new Array<CrossCuttingList>();
        
        for(let _i = 0; _i < data.length; _i++)
        {
          var clist = new CrossCuttingList();
          clist.key = data[_i].id;
          clist.value = data[_i].name;
          this.crossCuttingListPermissions[_i] = clist;
        }
      },
      error => {
      });
debugger;

     this.scheduleService.getAllSchedulers(s).subscribe(
      (dataSchedule) => {
        this.crossCuttingListSchedule = new Array<CrossCuttingList>();
        
        for(let _is = 0; _is < dataSchedule.length; _is++)
        {
          var clist = new CrossCuttingList();
          clist.key = dataSchedule[_is].id;
          clist.value = dataSchedule[_is].schedulName;
          this.crossCuttingListSchedule[_is] = clist;
        }
      },
      error => {
      });
  }

  addUser(IsActive,Name,Apellido,Email,
    FechaNacimiento,Pais,Ciudad,Password
    ,RePassword,Perfil,Turno,selectedOption){

    var scheduleArray = new Array<string>();

    scheduleArray[0] = Turno;

    debugger;
    this.registerRequest = new RegisterRequest();
    this.registerRequest.firstName = Name; 
    this.registerRequest.lastName = Apellido;
    this.registerRequest.userName = Email;
    this.registerRequest.bornDate = FechaNacimiento;
    this.registerRequest.country = Pais;
    this.registerRequest.city = Ciudad;
    this.registerRequest.password = Password;
    this.registerRequest.position = Perfil;
    this.registerRequest.schedule = scheduleArray;
    this.registerRequest.nickName = Name + ' ' + Apellido;
    this.registerRequest.idPlace = selectedOption;
    this.registerRequest.isActive = IsActive == 'on' ? true : false;
    this.registerRequest.claims = null;

    console.log(JSON.stringify(this.registerRequest));
    if(Password == RePassword){
      this.userService.createUser(this.registerRequest).subscribe(
        (data) => {
          this.passwordNotMatches = false;
          this.Success = true;
          this.startTimer();

        },
        error => {
          this.Success = false;
          this.startTimer();
        });
    }
    else{
      this.passwordNotMatches = true;
    }
  }
  loadUserInfo(register){
    this.userToEdit = new RegisterRequest();
    this.userToEdit = register;
    
  }
  loadNewUserInfo(){
    this.userToEdit = new RegisterRequest();
  }
  editUser(IsActive,Name,Apellido,Email,
    FechaNacimiento,Pais,Ciudad,Password
    ,RePassword,Perfil,Turno,selectedOption,IdUser){
      this.registerRequest = new RegisterRequest();
      this.registerRequest.firstName = Name; 
      this.registerRequest.lastName = Apellido;
      this.registerRequest.userName = Email;
      this.registerRequest.bornDate = FechaNacimiento;
      this.registerRequest.country = Pais;
      this.registerRequest.city = Ciudad;
      this.registerRequest.password = Password;
      this.registerRequest.position = Perfil;
      this.registerRequest.schedule = Turno;
      this.registerRequest.nickName = Name + ' ' + Apellido;
      this.registerRequest.idPlace = selectedOption;
      this.registerRequest.isActive = IsActive == 'on' ? true : false;
      this.registerRequest.claims = null;
      if(Password == RePassword){
    this.userService.updateUser(this.registerRequest, IdUser).subscribe(
      (data) => {
        this.passwordNotMatches = false;
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Success = false;
        this.startTimer();
      });
    }
      else{
        this.passwordNotMatches = true;
      }
  }

  removeUser(userId){
    this.userService.deleteUser(userId).subscribe(
      (data) => {
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Success = false;
        this.startTimer();
      });
  }

  getAllUser(placeId){
    this.arrayRegisterRequest = Array<RegisterRequest>();
    this.userService.getAllUsers(placeId).subscribe(
      (data) => {
        this.arrayRegisterRequest = data;
        this.loading = false;
      },
      error => {
      });
  }
}
