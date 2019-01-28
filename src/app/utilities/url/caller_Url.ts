import { environment } from "src/environments/environment";

export class caller_Url{  
    static readonly callerHubUrl: string = environment.callerHubUrl.toString();
    // "https://vccallerccwebapi.azurewebsites.net/callerHub";
    static readonly callerUrl: string = environment.callerUrl.toString();
    //"https://vccallerccwebapi.azurewebsites.net/api/Buttons";

    // static readonly callerHubUrl = "https://vccallerdctwebapi.azurewebsites.net/callerHub";
    // static readonly callerUrl = "https://vccallerdctwebapi.azurewebsites.net/api/Buttons";

    // static readonly callerHubUrl = "http://localhost:52978/callerHub";
    // static readonly callerUrl = "http://localhost:52978/api/Buttons";
}