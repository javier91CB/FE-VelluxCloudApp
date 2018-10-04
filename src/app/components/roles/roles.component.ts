import { Component, OnInit } from '@angular/core';
import { RolesRequest } from '../../model/roles/requestModel/rolesRequest';
import { ProfileService } from '../../services/profiles/profile.service';
import { HelperUserInfo } from '../../utilities/tools/helperUserInfo';
import { UserInfoModel } from '../../model/users/userInfoModel';
import { TokenModel } from '../../model/token/tokenModel';
import { RolesResponse } from '../../model/roles/responseModel/rolesResponse';
import { RolModel } from '../../model/roles/rolModel';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  arrayRoles: Array<RolModel>;
  rolesToEdit: RolModel;
  userInfoModel: UserInfoModel;
  tokenModel: any;
  placeId:string;
  userId:string;
  Success:boolean;
  Fail:boolean;

  constructor(private RolesService: ProfileService) { }

  ngOnInit() {
    var _helperUserInfo = new HelperUserInfo();
    this.userInfoModel = new UserInfoModel();
    this.tokenModel = new TokenModel();
    var userInfo = _helperUserInfo.getUserInformation();
    if(userInfo != null) {
      this.tokenModel = userInfo;
      this.userInfoModel = this.tokenModel.userInfo;
    }
    this.placeId = this.tokenModel.userInfo.PlaceId;
    this.userId = this.tokenModel.userInfo.IdUser;
    this.rolesToEdit = new RolModel();
    this.getAllRoles(this.placeId);

    this.Success = false;
    this.Fail = false;
  }

  startTimer() {
    
    setInterval(() => {
      this.Success = false;
      this.Fail = false;
    },4000)
  }

  addRoles(isActive, name, read, write){
    var rolesRequest = new RolesRequest();
    rolesRequest.idPlace = this.placeId;
    rolesRequest.name = name;
    rolesRequest.permissions = read == 'on' ? 'R' : '';
    rolesRequest.permissions += write == 'on' ? ',W': '' ;
    rolesRequest.userId = this.userId;
    rolesRequest.isActive = isActive == 'on' ? true : false;

    console.log(JSON.stringify(rolesRequest));
      this.RolesService.createPermission(rolesRequest).subscribe(
        (data) => {
          this.Success = true;
          this.startTimer();
        },
        error => {
          this.Success = false;
          this.startTimer();
        });
    }

  loadRolesInfo(rolesToEdit){
    this.rolesToEdit = new RolModel();
    this.rolesToEdit = rolesToEdit;
  }

  loadNewRolesInfo(){
    this.rolesToEdit = new RolModel();
  }

  editRoles(isActive, name, read, write, roleId){
    var rolesRequest = new RolesRequest();
    rolesRequest.idPlace = this.placeId;
    rolesRequest.name = name;
    rolesRequest.permissions = read == 'on' ? 'R' : '';
    rolesRequest.permissions += write == 'on' ? ',W': '' ;
    rolesRequest.userId = this.userId;
    rolesRequest.isActive = isActive == 'on' ? true : false;
    this.RolesService.updatePermission(rolesRequest, roleId).subscribe(
      (data) => {
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Success = false;
        this.startTimer();
      });
  }

    removeRoles(RolesId){
    this.RolesService.deletePermission(RolesId).subscribe(
      (data) => {
        debugger;
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Success = false;
        this.startTimer();
      });
  }

  getAllRoles(placeId){
    this.RolesService.getAllPermissions(placeId).subscribe(
      (data) => {
        var rolesModel = new Array<RolModel>();
        
        for(var _i = 0; _i < data.length; _i++)
        {
          var roles = new RolModel();
          roles.id = data[_i].id;
          roles.name = data[_i].name;
          roles.read = data[_i].read;
          roles.write = data[_i].write;
          roles.idPlace = data[_i].idPlace;
          roles.isActive = data[_i].isActive;
          roles.userId = data[_i].userId;

          rolesModel[_i] = roles;
        }

        this.arrayRoles = rolesModel;
      },
      error => {
      });
  }
}
