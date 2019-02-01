import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { TripService } from '../services/trip.service';
import { AuthService } from '../services/auth.service';
import {GroupService } from '../services/group.service';



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
  valtmp : number;
  Votestmp : number;
  DestiMostPopular : number;
  FinalDestination : string; 
  visibility : any;
  visibility2 : any;

  // Prix Par ville API : 

  LogementDestination : any;
  TransportDestination : any;
  RestaurantDestination : any;
  BiereDestination : any;
  NightClubDestination : any;
  
  
  
  constructor(private tripService : TripService, private authService: AuthService, private groupService: GroupService) { 
    this.destinations = new Array<any>();
  }
  public handleAddressChange(address: Address) {
    console.log(address.address_components[0].long_name)
    this.tripService.addLocallyDestination(address.address_components[0].long_name, this.userId);
    
    this.tripService.saveTripDestination(address.address_components[0].long_name, this.tripId);
   

   
  }

 
  ngOnInit() {

    this.LogementDestination = 100 ;
    this.TransportDestination = 2 ;
    this.RestaurantDestination = 20;
    this.BiereDestination = 3;
    this.NightClubDestination = 7;

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

    this.FinalDestination = JSON.stringify(this.tripService.getTripById(this.tripId).destination.final_destination);
  
  }

  MostPopulardestination(destinationsarray: any[])
  {
    this.Votestmp  = 0;
    this.valtmp = 0;
    for (var i = 0; i < destinationsarray.length; i++)
    {
       if (this.Votestmp == destinationsarray[i].votes)
       {
         this.valtmp = i;
       }
       else if (this.Votestmp < destinationsarray[i].votes)
       {
        this.valtmp = i;
        this.Votestmp = destinationsarray[i].votes;
       }
       else if (this.Votestmp > destinationsarray[i].votes)
       {
         console.log("Ne rien faire");
       }
    }

    return this.valtmp;
  }

OnValidate()
  {
    this.DestiMostPopular = this.MostPopulardestination(this.destinations);
    console.log("Most popular destination " +  this.DestiMostPopular);
 
      this.tripService.DestinationValidation(this.tripId,this.destinations[this.DestiMostPopular].destination_name).then(
        () => {
        
      }
      );
  }

Ondestinationfinal()
{
  this.FinalDestination = JSON.stringify(this.tripService.getTripById(this.tripId).destination.final_destination);
  return this.FinalDestination; 
}

getVisibility(){
  if (this.groupService.AdminStatus == true)
  {
    this.visibility = 'visible';
  }
  else
  {
    this.visibility = 'hidden';
  }
  return this.visibility;
}

getSondageVisibility(Finaldestination : string){
  
  if (this.groupService.AdminStatus == true)
  {
    this.visibility2 = 'visible';
  }
  else
  {
    if (Finaldestination != '""')
    {
      
      this.visibility2 = 'hidden';
    }
    else if (Finaldestination == '""')
    {
      this.visibility2 = 'visible';
    }
    
  }
  return this.visibility2;
}


}
