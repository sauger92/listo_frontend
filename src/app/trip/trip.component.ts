import { Component, Input, OnInit } from '@angular/core';
import {TripService} from '../services/trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  @Input() tripId: number;
  @Input() tripName: string;



  constructor(private tripService :TripService) { 

  }
  
  ngOnInit() {
  } 

}
