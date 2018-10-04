import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { RegisterRequest } from '../../model/users/requestModel/registerRequest';
import { HelperUserInfo } from '../../utilities/tools/helperUserInfo';
import { UserInfoModel } from '../../model/users/userInfoModel';
import { TokenModel } from '../../model/token/tokenModel';

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
  userInfoModel: UserInfoModel;
  tokenModel: any;
  userToEdit: RegisterRequest;
  Success:boolean;
  Fail:boolean;

  constructor(private userService: UserService) {
    this.paginator = true;
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
    var placeId = this.tokenModel.userInfo.PlaceId;
    this.userToEdit = new RegisterRequest();
    this.getAllUser(placeId)

    this.Success = false;
    this.Fail = false;
  }

  
  startTimer() {
    setInterval(() => {
      this.Success = false;
      this.Fail = false;
    },4000)
  }
  
  addUser(IsActive,Name,Apellido,Email,FechaNacimiento,Pais,Ciudad,Password,RePassword,Perfil,Turno,Lugar){
    
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
    this.registerRequest.idPlace = Lugar;
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
  editUser(IsActive,Name,Apellido,Email,FechaNacimiento,Pais,Ciudad,Password,RePassword,Perfil,Turno,Lugar,userId){
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
      this.registerRequest.idPlace = Lugar;
      this.registerRequest.isActive = IsActive == 'on' ? true : false;
      this.registerRequest.claims = null;
      if(Password == RePassword){
    this.userService.updateUser(this.registerRequest, userId).subscribe(
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
      },
      error => {
      });
  }
}
