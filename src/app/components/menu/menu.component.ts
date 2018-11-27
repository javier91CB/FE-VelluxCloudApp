import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
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
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() dataShared:boolean = false;

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
  notificationCount: number;
  isActiveNotification: boolean;
  globalMenu: boolean;
  
  constructor(public router: Router,
    private placeService:PlaceService) {
    }
  
  ngOnInit() {
    var _helperUserInfo = new HelperUserInfo();
    this.userInfoModel = new UserInfoModel();
    this.tokenModel = new TokenModel();
    var userInfo = _helperUserInfo.getUserInformation();
    if(userInfo != null) {
      this.tokenModel = userInfo;
      this.userInfoModel = this.tokenModel.userInfo;
      this.placeId = this.tokenModel.userInfo.placeId;
      this.userId = this.tokenModel.userInfo.id;
      this.rolesToEdit = new RolModel();
      this.showAdminClaim = this.userInfoModel.claims.indexOf('W') >= 0;
    }
    this.getAllPlace();
    this.Success = false;
    this.Fail = false;
    this.isActiveNotification = false;
    this.startCheckNotification();
  }
  
  startTimer() {
    setInterval(() => {
      this.Success = false;
      this.Fail = false;
    },5000)
  }

  startCheckNotification() {
    setInterval(() => {
      var listPush = JSON.parse(localStorage.getItem("notificationPush"));
      if(listPush != null){
        this.isActiveNotification = true;
        this.notificationCount = listPush.length;
      }
      else{
        this.notificationCount = 0;
        this.isActiveNotification = false;
      }
    },1000)
  }
  
  activeMenuMore() {
    debugger;
    if (!this.showMoreSubmenu) {
      if (this.showAdminClaim && window.screen.width <= 566) {
        this.showAdminSubmenu = true;
        this.hidenTitleAdmin = true;
        this.globalMenu = true;
      }
      if (this.showAdminClaim && window.screen.width >= 566) {
        this.showAdminSubmenu = false;
        this.hidenTitleAdmin = true;
        this.globalMenu = true;
      }
        this.showMoreSubmenu = true;
    } else {
      this.showMoreSubmenu = false;
      this.showAdminSubmenu = false;
      this.hidenTitleAdmin = false;
      this.globalMenu = false;
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
    localStorage.clear();
    sessionStorage.clear();
    this.showAdminClaim = false;
    this.showMoreSubmenu = false;
    this.hidenTitleAdmin = false;
    this.router.navigate(['/login']);
  }
  
  addPlace(namePlace, city, country){
    var datePipe = new DatePipe('en-US');
    var placeRequest = new PlaceRequest();

    placeRequest.placeName = namePlace;
    placeRequest.city = city;
    placeRequest.country = country;
    placeRequest.createDate = datePipe.transform(new Date().toUTCString(), 'yyyy-MM-dd');
    placeRequest.userCreate = this.userInfoModel.id;
    placeRequest.updateDate = datePipe.transform(new Date().toUTCString(), 'yyyy-MM-dd');
    placeRequest.userUpdate = this.userInfoModel.id;
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

  editPlace(value){
    var placeRequest = new PlaceRequest();
    placeRequest.idPlace = value.placeId;
    placeRequest.city = value.city;
    placeRequest.country = value.country;
    placeRequest.createDate = value.createDate;
    placeRequest.placeName = value.placeName;
    placeRequest.updateDate = value.updateDate;
    placeRequest.userCreate = value.userCreate;
    placeRequest.userUpdate = value.userUpdate;
    this.placeService.updatePlace(placeRequest, value.id).subscribe(
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
        this.getAllPlace();
        this.Success = true;
        this.startTimer();
      },
      error => {
        this.Success = false;
        this.startTimer();
      });
  }

  getAllPlace(){
    this.placeService.getAllPlaces().subscribe(
      (data) => {
        this.arrayPlace = new Array<PlaceResponse>();
        this.arrayPlace = data;
      },
      error => {
      });
  }

  toggleCloseMenu(){
    debugger;
    this.globalMenu = false;
  }

  showDetails(){
    var acc = document.getElementsByClassName("accordion-details");
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
}
