// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase : {
    apiKey: "AIzaSyDBnF-QVzmsFcVhQjS87pguOun9BxSSxKM",
    authDomain: "ivory-ego-219700.firebaseapp.com",
    databaseURL: "https://ivory-ego-219700.firebaseio.com",
    projectId: "ivory-ego-219700",
    storageBucket: "ivory-ego-219700.appspot.com",
    messagingSenderId: "1037131669515"
  },
  enableLogo: "false",
  backgroudImage: "../../../assets/images/login.jpg",
  callerHubUrl : "https://vccallerccwebapi.azurewebsites.net/callerHub",
  callerUrl : "https://vccallerccwebapi.azurewebsites.net/api/Buttons",
  notificationUrl : "https://vcnotificationccwebapi.azurewebsites.net/api/SendGrid",
  permissionUrl : "https://vcsecurityccwebapi.azurewebsites.net/api/Permission",
  placeUrl : "https://vcsecurityccwebapi.azurewebsites.net/api/Place",
  userUrl : "https://vcsecurityccwebapi.azurewebsites.net/api/User",
  schedulerUrl : "https://vcsecurityccwebapi.azurewebsites.net/api/Scheduler"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
