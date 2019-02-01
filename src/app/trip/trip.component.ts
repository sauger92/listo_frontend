import { Component, Input, OnInit } from '@angular/core';
import {TripService} from '../services/trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  @Input() tripId: string;
  @Input() tripName: string;
  @Input() DestinationFinal : string; 
  @Input() SourceImg : string;

  TripImage : string; 


  constructor(private tripService :TripService) { 

  }
  
  ngOnInit() {
  }


  getImageTrip (Destination : string)
  {
    console.log("La destination final est: " + Destination);

    if (Destination == "Paris")
    {
      this.TripImage = "assets/img/Paris.jpg"
    }
    else if (Destination == "Berlin")
    {
      this.TripImage == "assets/img/Berlin.jpg"
    }
    else if (Destination == "Londres")
    {
      this.TripImage = "assets/img/Londres.jpg"
    }
    else if (Destination == "Rome")
    {
      this.TripImage = "assets/img/Rome.jpg"
    }
    else
    {
      this.TripImage = "assets/img/basile.jpg"
    }

    return this.TripImage;

  }
}
