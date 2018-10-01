import { UserInfoModel } from "../users/userInfoModel";

export class TokenModel{
    userInfo: UserInfoModel;
    expirationDate: Date;
    isExpired: boolean;
}