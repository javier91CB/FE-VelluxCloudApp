import { Component, OnInit } from '@angular/core';
import { HelperUserInfo } from '../../utilities/tools/helperUserInfo';
import { TokenModel } from '../../model/token/tokenModel';
import { Router } from '@angular/router';
import { UserInfoModel } from '../../model/users/userInfoModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Array<any> = [];
  tokenModel: TokenModel;
  userInfoModel: UserInfoModel;
  constructor(
    private router:Router) {
    this.items = [
      {name:  '../../../assets/images/img_mountains_wide.jpg'}
    ];
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
    else{
      this.router.navigate(['/login']);
    }
  }

}
