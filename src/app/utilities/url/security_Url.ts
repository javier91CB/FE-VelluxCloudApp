import { environment } from "src/environments/environment";

export class Security_Url{
    static readonly permissionUrl: string = environment.permissionUrl.toString();
    // "https://vcsecurityccwebapi.azurewebsites.net/api/Permission"
    static readonly placeUrl: string = environment.placeUrl.toString();
    // "https://vcsecurityccwebapi.azurewebsites.net/api/Place"
    static readonly userUrl: string = environment.userUrl.toString();
    //"https://vcsecurityccwebapi.azurewebsites.net/api/User"
    static readonly schedulerUrl: string = environment.schedulerUrl.toString();
    // "https://vcsecurityccwebapi.azurewebsites.net/api/Scheduler"

    // static readonly permissionUrl = "https://vcsecuritydctwebapi.azurewebsites.net/api/Permission"
    // static readonly placeUrl = "https://vcsecuritydctwebapi.azurewebsites.net/api/Place"
    // static readonly userUrl = "https://vcsecuritydctwebapi.azurewebsites.net/api/User"
    // static readonly schedulerUrl = "https://vcsecuritydctwebapi.azurewebsites.net/api/Scheduler"
}