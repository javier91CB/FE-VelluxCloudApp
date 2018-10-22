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
import * as CryptoJS from 'crypto-js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  key: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9eyJpc3MiOiJhdXRoMCJ9AbIJTDMFc7yUa5MhvcP03nJPyCPzZtQcGEpzWfOkEF"
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
  selectedPlace:string;
  selecRol:string;
  selecSchedule:string;

  crossCuttingList: Array<CrossCuttingList>;
  crossCuttingListPermissions: Array<CrossCuttingList>;
  crossCuttingListSchedule: Array<CrossCuttingList>;
  isAct: boolean;
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

  getAllPermissions(placeId)
  {
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

  addUser(IsActive,Name,Apellido,Email,
    FechaNacimiento,Pais,Ciudad,Password
    ,RePassword,Perfil,Turno,selectedOption){

    var OutputP1 = CryptoJS.AES.encrypt(Password.trim(), this.key.trim()).toString();
    var OutputP2 = CryptoJS.AES.encrypt(RePassword.trim(), this.key.trim()).toString();

    this.registerRequest = new RegisterRequest();
    this.registerRequest.firstName = Name; 
    this.registerRequest.lastName = Apellido;
    this.registerRequest.userName = Email;
    this.registerRequest.bornDate = FechaNacimiento;
    this.registerRequest.country = Pais;
    this.registerRequest.city = Ciudad;
    this.registerRequest.password = OutputP1;
    this.registerRequest.position = Perfil;
    this.registerRequest.idSchedule = Turno;
    this.registerRequest.nickName = Name + ' ' + Apellido;
    this.registerRequest.idPlace = selectedOption;
    this.registerRequest.isActive = this.isAct;
    this.registerRequest.claims = null;
    console.log(JSON.stringify(this.registerRequest));
    if( OutputP1 == OutputP2 ){
      this.userService.createUser(this.registerRequest).subscribe(
        (data) => {
          this.passwordNotMatches = false;
          this.Success = true;
          this.getAllUser(this.placeId);
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
  loadUserInfo(register){
    var datePipe = new DatePipe('en-US');
    this.userToEdit = new RegisterRequest();
    this.userToEdit = register;
    this.selectedPlace = this.userToEdit.idPlace;
    this.getAllPermissions(this.selectedPlace)
    this.selecRol = this.userToEdit.position;
    this.selecSchedule = this.userToEdit.idSchedule;
    this.userToEdit.bornDate = datePipe.transform(this.userToEdit.bornDate, 'yyyy-MM-dd');
  }
  loadNewUserInfo(){
    this.userToEdit = new RegisterRequest();
    this.userToEdit.isActive = true;
  }
  editUser(IsActive,Name,Apellido,Email,
    FechaNacimiento,Pais,Ciudad,Password
    ,RePassword,Perfil,Turno,selectedOption,IdUser){
      if(Password == RePassword){
      var OutputP = CryptoJS.AES.encrypt(Password.trim(), this.key.trim()).toString();
      this.registerRequest = new RegisterRequest();
      this.registerRequest.firstName = Name; 
      this.registerRequest.lastName = Apellido;
      this.registerRequest.userName = Email;
      this.registerRequest.bornDate = FechaNacimiento;
      this.registerRequest.country = Pais;
      this.registerRequest.city = Ciudad;
      this.registerRequest.password = OutputP;
      this.registerRequest.position = Perfil;
      this.registerRequest.idSchedule = Turno;
      this.registerRequest.nickName = Name + ' ' + Apellido;
      this.registerRequest.idPlace = selectedOption;
      this.registerRequest.isActive = this.isAct;
      this.registerRequest.claims = null;
    this.userService.updateUser(this.registerRequest, IdUser).subscribe(
      (data) => {
        this.passwordNotMatches = false;
        this.Success = true;
        this.getAllUser(this.placeId);
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

  removeUser(userId){
    this.userService.deleteUser(userId).subscribe(
      (data) => {
        this.Success = true;
        this.getAllUser(this.placeId);
        this.startTimer();
      },
      error => {
        this.Fail = true;
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
