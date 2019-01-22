import { Component, OnInit, Input } from '@angular/core';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  @Input() destination: string;
  @Input() tripId: string;

  constructor(private tripService : TripService) { 
  }

  ngOnInit() {
  }
  validate(){
    this.tripService.saveTripDestination(this.destination, this.tripId);
  }

}
