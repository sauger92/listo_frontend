import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { TripService } from '../services/trip.service';



@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  
  @Input() tripId: string;
  destinations: any[];
  
  constructor(private tripService : TripService) { 
    this.destinations = new Array();
  }
  public handleAddressChange(address: Address) {
    const destination = {
      destination_name: '',
      users_id : '',
      _id : ''
    }
    destination.destination_name = address.address_components[0].long_name;
    console.log(address.address_components[0].long_name);
    this.destinations.push(destination);
    console.log(this.destinations);
    this.tripService.saveTripDestination(address.address_components[0].long_name, this.tripId);
  }

  validate(destination:string){
    console.log(destination);
  }

  ngOnInit() {
    this.tripService.getDataFromServer(this.tripId).then(
      () => {
        this.destinations = this.tripService.desttination_survey;
        console.log (this.tripService.desttination_survey)
      } 
    );
  }

}
