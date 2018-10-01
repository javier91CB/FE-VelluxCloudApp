import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../../model/users/userInfoModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from '../../model/token/tokenModel';
import { TokenKey } from '../../model/token/responseModel/token';

export class HelperUserInfo  implements OnInit {

    private userInfo: UserInfoModel;
    tokenInfo: any;
    tokenKey: TokenKey;

    constructor() { }
  
    ngOnInit() {
    }

    setUserInformation(tokenKey: TokenKey){
        localStorage.setItem('access_token', JSON.stringify(tokenKey));
    }

    getUserInformation(){
        this.tokenKey = new TokenKey();
        var accessToken = localStorage.getItem('access_token');
        return this.getDecodedAccessToken(accessToken);
    }

    getDecodedAccessToken(token: string): any {
        
        this.userInfo = new UserInfoModel();
        this.tokenInfo = new TokenModel();
        const helper = new JwtHelperService();
        this.userInfo = helper.decodeToken(token);

        const expirationDate = helper.getTokenExpirationDate(token);
        const isExpired = helper.isTokenExpired(token);

        this.tokenInfo.userInfo = this.userInfo;
        this.tokenInfo.expirationDate = expirationDate;
        this.tokenInfo.isExpired = isExpired;

        return this.tokenInfo;
      }
}