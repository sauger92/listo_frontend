import { Component, OnInit, Input } from '@angular/core';
import { TripService } from '../services/trip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trippage',
  templateUrl: './trippage.component.html',
  styleUrls: ['./trippage.component.scss']
})
export class TrippageComponent implements OnInit {

  tripId: string;
  tripName: string;
  calendar: string;
  destination: string;
  list: string;
  isClicked: boolean;


  constructor(private tripService :TripService,
    private route: ActivatedRoute) { 
      this.calendar="calendar";
      this.destination="destination";
      this.list = "list";
      this.isClicked = false;
    }

  ngOnInit() {
    this.tripId = this.route.snapshot.params['tripId'];
    this.tripName = this.tripService.getTripById(this.tripId).name;

    console.log("TRIP ID: " + this.tripId );

  }

scrollTo (attrs : any)
{
var el = document.getElementById(attrs.href);
el.scrollIntoView();
}
conclude(){
  this.isClicked = true;
this.tripService.conclude(this.tripId);
alert("Félicitations Capitaine vous avez gérez ce voyage d'une main de maître. Un messager avertira tes compagnons d'aventure.");

}





}
