import { Component, OnInit } from '@angular/core';
import { HelperUserInfo } from 'src/app/utilities/tools/helperUserInfo';
import { UserInfoModel } from 'src/app/model/users/userInfoModel';
import { TokenModel } from 'src/app/model/token/tokenModel';
import { RegisterRequest } from 'src/app/model/users/requestModel/registerRequest';
import { PlaceService } from 'src/app/services/place/place.service';
import { CrossCuttingList } from 'src/app/model/crosscuttingList';
import { ReportRequest } from 'src/app/model/report/requestModel/reportRequest';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { caller_Url } from 'src/app/utilities/url/caller_Url';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  userInfoModel: UserInfoModel;
  loading: boolean;
  tokenModel: TokenModel;
  placeId: string;
  crossCuttingList: any[];
  selectedOption:any;
  private endpoint = caller_Url.callerUrl;

  constructor(
    private placeService: PlaceService,
    private buttonsService: ButtonsService) { 
      this.loading = false;
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
    this.getAllPlace(this.placeId)
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

  downloadReport(StartDate, EndDate, PlaceId){
    this.loading = true;
    var place = PlaceId.toString().slice(3,PlaceId.length);
    var namePlaceValue = this.crossCuttingList.find(x=> x.key==place).value;
    var reportRequest = new ReportRequest();
    reportRequest.startDateReport = StartDate;
    reportRequest.endDateReport = EndDate;
    reportRequest.siteName = namePlaceValue;
    reportRequest.siteId = place;

    var offset = new Date().getTimezoneOffset()/60;
    console.log(offset);
    var response =
      this.endpoint + '/ReportBySite/'
      +reportRequest.startDateReport+'/'
      +reportRequest.endDateReport+'/'
      +reportRequest.siteId+'/'
      +reportRequest.siteName+'/'
      +offset;
      this.loading = false;
      return window.location.href=response;
  }

  viewReport(StartDate, EndDate, PlaceId){
    var place = PlaceId.toString().slice(3,PlaceId.length);
    var namePlaceValue = this.crossCuttingList.find(x=> x.key==place).value;
    var reportRequest = new ReportRequest();
    reportRequest.startDateReport = StartDate;
    reportRequest.endDateReport = EndDate;
    reportRequest.siteName = namePlaceValue;
    reportRequest.siteId = place;

    var response =
      this.endpoint + '/ReportBySite/'
      +reportRequest.startDateReport+'/'
      +reportRequest.endDateReport+'/'
      +reportRequest.siteId+'/'
      +reportRequest.siteName;
      
      return window.location.href= 'https://docs.google.com/viewerng/viewer?url=' + response;
  }
}
