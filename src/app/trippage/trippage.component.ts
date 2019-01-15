import { Component, OnInit, Input } from '@angular/core';
import { TripService } from '../services/trip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trippage',
  templateUrl: './trippage.component.html',
  styleUrls: ['./trippage.component.scss']
})
export class TrippageComponent implements OnInit {

  tripId: number;
  tripName: string;

  constructor(private tripService :TripService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.tripId = this.route.snapshot.params['tripId'];
    
    this.tripName = this.tripService.getTripById(+this.tripId).name;
    console.log(this.tripName);
  }

}