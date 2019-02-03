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
  @Input() tripState : number;

  TripImage : string; 


  constructor(private tripService :TripService) { 

  }
  
  ngOnInit() {
  }

  getWidth(){
    return this.tripState;
  }
}
