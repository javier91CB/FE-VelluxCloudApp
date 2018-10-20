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
import { AES } from 'crypto-js';

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

    this.registerRequest = new RegisterRequest();
    this.registerRequest.firstName = Name; 
    this.registerRequest.lastName = Apellido;
    this.registerRequest.userName = Email;
    this.registerRequest.bornDate = FechaNacimiento;
    this.registerRequest.country = Pais;
    this.registerRequest.city = Ciudad;
    this.registerRequest.password = AES.encrypt(Password, this.key).ciphertext.toString();
    this.registerRequest.position = Perfil;
    this.registerRequest.idSchedule = Turno;
    this.registerRequest.nickName = Name + ' ' + Apellido;
    this.registerRequest.idPlace = selectedOption;
    this.registerRequest.isActive = this.isAct ? true : false;
    this.registerRequest.claims = null;
debugger;
    console.log(JSON.stringify(this.registerRequest));
    var p1 = AES.encrypt(Password, this.key).ciphertext.toString();
    var p2 = AES.encrypt(RePassword, this.key).ciphertext.toString();
    if( p1 == p2 ){
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
    debugger;
    this.userToEdit = new RegisterRequest();
    this.userToEdit = register;
    this.selectedPlace = this.userToEdit.idPlace;
    this.getAllPermissions(this.selectedPlace)
    this.selecRol = this.userToEdit.position;
    this.selecSchedule = this.userToEdit.idSchedule;
    this.isAct = this.userToEdit.isActive;
  }
  loadNewUserInfo(){
    this.userToEdit = new RegisterRequest();
    this.userToEdit.isActive = true;
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
      this.registerRequest.password = AES.encrypt(Password, this.key).ciphertext.toString();
      this.registerRequest.position = Perfil;
      this.registerRequest.idSchedule = Turno;
      this.registerRequest.nickName = Name + ' ' + Apellido;
      this.registerRequest.idPlace = selectedOption;
      this.registerRequest.isActive = this.isAct ? true : false;
      this.registerRequest.claims = null;
      debugger;
      var p1 = AES.encrypt(Password, this.key).ciphertext.toString();
      var p2 = AES.encrypt(RePassword, this.key).ciphertext.toString();
      if(p1 == p2){
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
