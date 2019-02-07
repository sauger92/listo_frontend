import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { TripService } from './services/trip.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'listo';
  isAuth : boolean;
  visibility : any

  constructor(private appareilService: TripService,private authService:AuthService, private router: Router) {
  
  }
  
  ngOnInit() {
    this.isAuth = this.authService.LoginStatue;
  }

  Deconexion(){
    this.authService.unlogUser();
    this.isAuth = this.authService.LoginStatue;
    if (this.isAuth == false)
    {
      console.log("Deconnexion de l'utilisateur");
      this.router.navigate(['/login']);
    } 
  
  }

  getVisibility()
  {
    if(this.authService.LoginStatue == false)
    {
      this.visibility = 'hidden'
    }
    else if (this.authService.LoginStatue == true) 
    {
      this.visibility = 'visible';
    }
    return this.visibility;
  }
  getVisibility2()
  {
    if(this.authService.LoginStatue == false)
    {
      this.visibility = 'visible'
    }
    else if (this.authService.LoginStatue == true) 
    {
      this.visibility = 'hidden';
    }
    return this.visibility;
  }


}
