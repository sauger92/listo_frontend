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
  @Input() userVote: number;
  @Input() votes: number;
  votesTotal:number;
  @Input() userId:string;


  constructor(private tripService : TripService) { 
  }

  ngOnInit() {
    this.tripService.calculateTotalDestinationVotes();
    this.votesTotal = this.tripService.total_votes;
  }
  validate(){
    console.log("validate");

    this.tripService.addLocallyDestination(this.destination, this.userId);
    this.tripService.saveTripDestination(this.destination, this.tripId);
  }
  getColor(){
    console.log(this.userVote)
    if(this.userVote ==0){
        return 'blue';
    }else {
      return 'grey';
    }

  }
  getWidth(){
    return Math.round(100 * this.votes/this.tripService.total_votes);
  
  }

}
