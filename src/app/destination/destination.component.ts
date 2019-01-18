import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';


@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  constructor() { }
  public handleAddressChange(address: Address) {
    console.log(address.address_components[0].long_name);
  }

  ngOnInit() {
  }

}
