import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trip.service';
import { NgForm }   from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  trips: any[];

  visibility = 'hidden';

  isAuth = true; 
  

  constructor(private tripService : TripService, private authService : AuthService,  private router: Router) { }

  ngOnInit() {
    this.trips = this.tripService.trips;
  }

  onSubmit(form: NgForm) {
    this.visibility = 'hidden';  
    const name = form.value['name'];
    this.tripService.addTrip(name);

  }

  addTrip(){
    this.visibility = 'visible';
  }

  getVisibility(){
    return this.visibility;
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

}
