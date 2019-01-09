import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trip.service';



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  trips: any[];

  constructor(private tripService : TripService) { }

  ngOnInit() {
    this.trips = this.tripService.trips;
  }


}
