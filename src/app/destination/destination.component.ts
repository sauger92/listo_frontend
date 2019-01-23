import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { TripService } from '../services/trip.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  
  @Input() tripId: string;
  destinations: any[];
  votes_total :number;
  userId : string;
  
  constructor(private tripService : TripService, private authService: AuthService) { 
    this.destinations = new Array<any>();
  }
  public handleAddressChange(address: Address) {
    console.log(address.address_components[0].long_name)
    this.tripService.addLocallyDestination(address.address_components[0].long_name, this.userId);
    
    this.tripService.saveTripDestination(address.address_components[0].long_name, this.tripId);
   

   
  }

 
  ngOnInit() {
    this.authService.FindUserInfo().then(
      () => {
        this.userId=this.authService.UserInfo._id;
        this.tripService.getDataFromServer(this.tripId, this.userId).then(
          (value) => {
            console.log(this.tripService.destination_survey);
    
            this.destinations = this.tripService.destination_survey;
            this.votes_total = 0;
            
        this.tripService.calculateTotalDestinationVotes();    
        this.votes_total = this.tripService.total_votes;
            } 
        );
      }
    );
   
    
    
    
  }
  

}
