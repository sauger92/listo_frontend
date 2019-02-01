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
  trip_id : any [];
  TripImage : string;
  FinalDestination : string[];
  FinalDestinationarray : string[];
  visibility = 'hidden';
  

  isAuth = true; 
  
  

  constructor(private tripService : TripService, private authService : AuthService,  private router: Router) { }

  ngOnInit() {
    
    this.tripService.getTripFromServer().then(
      () => {
        this.trips = this.tripService.trips;
        console.log ("Les trips sont : " + JSON.stringify(this.tripService.trips[0]._id));
      } 
    );


    
    
  }



  onSubmit(form: NgForm) {
    this.visibility = 'hidden';  
    const name = form.value['name'];
    this.tripService.saveTripToServer(name);    
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

  getImageTrip (Destination : string)
  {
    if (Destination = "Paris")
    {
      this.TripImage = "assets/img/Paris.jpg"
    }
    else if (Destination = "Berlin")
    {
      this.TripImage = "assets/img/Berlin.jpg"
    }
    else if (Destination = "Londres")
    {
      this.TripImage = "assets/img/Londres.jpg"
    }
    else if (Destination = "Rome")
    {
      this.TripImage = "assets/img/Rome.jpg"
    }
    else
    {
      this.TripImage = "assets/img/basile.jpg"
    }

    return this.TripImage;

  }


/* Ondestinationfinal()
{
  for (var i = 0; i<this.tripService.trips.length; i++)
  {
    this.FinalDestination[i] = JSON.stringify(this.tripService.getTripById(this.tripService.trips[i]._id).destination.final_destination);
  } 
  return this.FinalDestination; 
}*/

}
