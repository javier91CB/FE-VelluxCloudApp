import { SchedulerModel } from "./schedulerModel";
import { PermissionModel } from "./permissionModel";

export class UserInfoModel {
    id: string;
    userName: string;
    nickName: string;
    firstName: string;
    lastName: string;
    claims: Array<PermissionModel>;
    schedule: Array<SchedulerModel>;
    bornDate: string;
    position: string;
    country: string;
    city: string;
    isActive :boolean;
    placeId: string;
}