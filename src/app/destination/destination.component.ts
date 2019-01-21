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
  destination: string = "";

  constructor(private tripService : TripService) { 

  }
  public handleAddressChange(address: Address) {
    
    console.log(address.address_components[0].long_name);
    this.destination= this.destination.concat("\n", address.address_components[0].long_name );
    
    this.tripService.saveTripDestination(address.address_components[0].long_name, this.tripId);
  }

  ngOnInit() {
  }

}
