import { Component, OnInit } from '@angular/core';
import { RolesRequest } from '../../model/roles/requestModel/rolesRequest';
import { ProfileService } from '../../services/profiles/profile.service';
import { HelperUserInfo } from '../../utilities/tools/helperUserInfo';
import { UserInfoModel } from '../../model/users/userInfoModel';
import { TokenModel } from '../../model/token/tokenModel';
import { RolesResponse } from '../../model/roles/responseModel/rolesResponse';
import { RolModel } from '../../model/roles/rolModel';
import { CrossCuttingList } from '../../model/crosscuttingList';
import { PlaceService } from '../../services/place/place.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  loading: boolean;
  arrayRoles: Array<RolModel>;
  rolesToEdit: RolModel;
  userInfoModel: UserInfoModel;
  tokenModel: any;
  placeId:string;
  userId:string;
  Success:boolean;
  Fail:boolean;
  crossCuttingList: Array<CrossCuttingList>;
  isWriter: false;
  isReader: false;
  isAct: false;

  constructor
    (private RolesService: ProfileService,
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
    debugger;
    this.placeId = this.tokenModel.userInfo.placeId;
    this.userId = this.tokenModel.userInfo.id;
    this.rolesToEdit = new RolModel();
    this.getAllRoles(this.placeId);
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
  reader(val){
    this.isReader = val;
  }

  write(val){
    this.isWriter = val;
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

  addRoles(isActive, name, read, write, place){
    var rolesRequest = new RolesRequest();
    rolesRequest.idPlace = place;
    rolesRequest.name = name;
    rolesRequest.permissions = this.isReader ? 'R' : '';
    rolesRequest.permissions += this.isWriter ? 'W': '' ;
    rolesRequest.userId = this.userId;
    rolesRequest.isActive = this.isAct;

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

  editRoles(isActive, name, read, write, roleId, place){
    var rolesRequest = new RolesRequest();
    rolesRequest.idPlace = place;
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
        this.loading = false;
        this.arrayRoles = rolesModel;
      },
      error => {
      });
  }
}
