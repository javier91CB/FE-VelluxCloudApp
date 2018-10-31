import { SchedulerModel } from "./schedulerModel";

export class UserInfoModel {
    id: string;
    userName: string;
    nickName: string;
    firstName: string;
    lastName: string;
    claims: string;
    schedule: Array<SchedulerModel>;
    bornDate: string;
    position: string;
    country: string;
    city: string;
    isActive :boolean;
    placeId: string;
}