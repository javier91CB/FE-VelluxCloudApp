import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debug } from 'util';
import { HelperUserInfo } from '../../utilities/tools/helperUserInfo';
import { UserInfoModel } from '../../model/users/userInfoModel';
import { TokenModel } from '../../model/token/tokenModel';
import { RolModel } from '../../model/roles/rolModel';
import { PlaceRequest } from '../../model/Place/requestModel/placeRequest';
import { PlaceResponse } from '../../model/Place/responseModel/placeResponse';
import { PlaceService } from '../../services/place/place.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showMoreSubmenu: boolean;
  showAdminSubmenu: boolean;
  showAdminClaim: boolean;
  hidenTitleAdmin: boolean;
  Success: boolean;
  Fail: boolean;
  userInfoModel: UserInfoModel;
  tokenModel: any;
  placeId: any;
  userId: any;
  rolesToEdit: any;
  arrayPlace: Array<PlaceResponse>;
  placeToEdit: any;
  
  constructor(public router: Router,
    private placeService:PlaceService) {}

  ngOnInit() {
    this.showMoreSubmenu = false;
    this.showAdminSubmenu = false;
    this.showAdminClaim = true;
    this.hidenTitleAdmin = false;

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
    this.Success = false;
    this.Fail = false;
  }
  
  startTimer() {
    setInterval(() => {
      this.Success = false;
      this.Fail = false;
    },5000)
  }
  
  activeMenuMore() {
    if (!this.showMoreSubmenu) {
      if (this.showAdminClaim && window.screen.width <= 566) {
        this.showAdminSubmenu = true;
        this.hidenTitleAdmin = true;
      }
      if (this.showAdminClaim && window.screen.width >= 566) {
        this.showAdminSubmenu = false;
        this.hidenTitleAdmin = true;
      }
        this.showMoreSubmenu = true;
    } else {
      this.showMoreSubmenu = false;
      this.showAdminSubmenu = false;
      this.hidenTitleAdmin = false;
    }
  }

  activeMenuAdmin() {
    if (!this.showAdminSubmenu) {
      this.showAdminSubmenu = true;
      if (window.screen.width >= 566) {
        this.showMoreSubmenu = false;
      }
    } else {
      this.showMoreSubmenu = false;
      this.showAdminSubmenu = false;
    }
  }

  OnQuit() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
  
  addPlace(namePlace, city, country, isActive){
    debugger;
    var datePipe = new DatePipe('en-US');
    var placeRequest = new PlaceRequest();

    placeRequest.placeName = namePlace;
    placeRequest.city = city;
    placeRequest.country = country;
    placeRequest.createDate = datePipe.transform(new Date().toUTCString(), 'dd/MM/yyyy');
    placeRequest.userCreate = this.userInfoModel.id;
    placeRequest.updateDate = datePipe.transform(new Date().toUTCString(), 'dd/MM/yyyy');
    placeRequest.userUpdate = this.userInfoModel.id;
    placeRequest.isActive = isActive == 'on' ? true : false;
    placeRequest.idPlace = null;

    console.log(JSON.stringify(placeRequest));
      this.placeService.createPlace(placeRequest).subscribe(
        (data) => {
          this.Success = true;
          this.startTimer();
        },
        error => {
          this.Success = false;
          this.startTimer();
        });
    }

  loadPlaceInfo(placeToEdit){
    this.placeToEdit = new PlaceResponse();
    this.placeToEdit = placeToEdit;
  }

  loadNewPlaceInfo(){
    this.placeToEdit = new PlaceResponse();
  }

  editPlace(placeId, city, country, createDate, placeName,updateDate,  userCreate, userUpdate, isActive){
    var placeRequest = new PlaceRequest();
    placeRequest.idPlace = placeId;
    placeRequest.city = city;
    placeRequest.country = country;
    placeRequest.createDate = createDate;
    placeRequest.placeName = placeName;
    placeRequest.updateDate = updateDate;
    placeRequest.userCreate = userCreate;
    placeRequest.userUpdate = userUpdate;
    placeRequest.isActive = isActive == 'on' ? true : false;
    this.placeService.updatePlace(placeRequest, placeId).subscribe(
      (data) => {
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Success = false;
        this.startTimer();
      });
  }

    removePlace(placeId){
    this.placeService.deletePlace(placeId).subscribe(
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

  getAllPlace(placeId){
    debugger;
    this.placeService.getAllPlaces().subscribe(
      (data) => {
        this.arrayPlace = new Array<PlaceResponse>();
        this.arrayPlace = data;
      },
      error => {
      });
  }

}
