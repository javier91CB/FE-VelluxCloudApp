export class ScheduleResponse{
    id:string;
    schedulName: string;
    days: Array<string>;
    startHour: string;
    endHour: string;
    isActive: boolean;
    idPlace: string
}