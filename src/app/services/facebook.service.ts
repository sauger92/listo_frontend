import {BehaviorSubject} from 'rxjs';


declare const FB: any;
declare global {
    var FBAuthStatus: string;
  } 


export class Facebook {
  private appId: string

  public response = new BehaviorSubject<boolean>(false);
  public data = this.response.asObservable();
  
  

  constructor(appId: string) {
    this.appId = appId

    this.init();
  }

  
  init() {
    let js,
      id = '214198979530134',
      ref = document.getElementsByTagName('script')[0];

    if (document.getElementById(id)) {
      return;
    }

    js = document.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/sdk.js";

    ref.parentNode.insertBefore(js, ref);

    js.onload = results => {
      this.initSDK()
    }
  }

  initSDK() {
    FB.init({
      appId: this.appId,
      xfbml: true,
      version: 'v2.5'
    })
    this.setCallback()
  }


  setCallback() {
    FB.getLoginStatus(response => {
      this.response.next(response)
    });
  }

  login() {
    
    FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Good to see you, ' + response.name + '.');
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    });
  }

  logout() {
    FB.logout();
  }

  AuthStatus()
  {
    FB.getLoginStatus(function(response) {
        
        if (response.status === 'connected') {

          // The user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token 
          // and signed request each expire.
          this.FBAuthStatus = response.status;
          var uid = response.authResponse.userID;
          var accessToken = response.authResponse.accessToken;
          console.log("Connected");
          
        } 
        else if (response.status === 'authorization_expired') {
          // The user has signed into your application with
          // Facebook Login but must go through the login flow
          // again to renew data authorization. You might remind
          // the user they've used Facebook, or hide other options
          // to avoid duplicate account creation, but you should
          // collect a user gesture (e.g. click/touch) to launch the
          // login dialog so popup blocking is not triggered.
          this.FBAuthStatus = response.status ;
          console.log("authorization_expired");
        }

        else if (response.status === 'not_authorized') {
          // The user hasn't authorized your application.  They
          // must click the Login button, or you must call FB.login
          // in response to a user gesture, to launch a login dialog.
          this.FBAuthStatus = response.status;
          console.log("ELSEIF not_authorized: "+ this.FBAuthStatus);
        }

        else {
          // The user isn't logged in to Facebook. You can launch a
          // login dialog with a user gesture, but the user may have
          // to log in to Facebook before authorizing your application.
          this.FBAuthStatus = 'not_log';
        }
        console.log("end of status fonction: "+ this.FBAuthStatus);
       });

       
       

    
  }

}
