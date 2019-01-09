import { Component, OnInit, ViewChild } from '@angular/core';
import { MessagingService } from './services/shared/messaging.service';
import { MenuComponent } from './components/menu/menu.component';
import { QualificationComponent } from './components/tools/qualification/qualification.component';
import { observable, fromEvent } from 'rxjs';
import { RegisterRequest } from './model/users/requestModel/registerRequest';
import { HelperUserInfo } from './utilities/tools/helperUserInfo';
import { UserInfoModel } from './model/users/userInfoModel';
import { TokenModel } from './model/token/tokenModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  // @ViewChild('QualificationComponent') childOne:QualificationComponent;
  // @ViewChild('MenuComponent') childTwo:MenuComponent;
  
  title = 'app';
  userToEdit: any;
  userInfoModel: any;
  tokenModel: any;

  constructor(private messagingService: MessagingService,
    private router: Router){
  }

  ngOnInit() {
    this.userToEdit = new RegisterRequest();
    var _helperUserInfo = new HelperUserInfo();
    this.userInfoModel = new UserInfoModel();
    this.tokenModel = new TokenModel();
    var userInfo = _helperUserInfo.getUserInformation();
    if(userInfo == null || userInfo == undefined) {
      this.router.navigate(['/home']);
    }
    this.messagingService.receiveMessage();
  }
}
