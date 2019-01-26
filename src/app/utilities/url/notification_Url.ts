import { environment } from "src/environments/environment";

export class notification_Url{
    static readonly notificationUrl: string = environment.notificationUrl.toString();
    //"https://vcnotificationccwebapi.azurewebsites.net/api/SendGrid"
    
    //static readonly notificationUrl = "https://vcnotificationdctwebapi.azurewebsites.net/api/SendGrid"
}