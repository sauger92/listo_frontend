import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trip.service';
import { NgForm }   from '@angular/forms';



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  trips: any[];

  visibility = 'hidden';

  constructor(private tripService : TripService) { }

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



  


}
