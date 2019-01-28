import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { resolve } from 'url';

interface Trip{
    name: string
}

@Injectable()
export class TripService {

trips : any[];
userId : string;
date_survey: any[];
destination_survey: any[];
total_votes: number;


getTripById(_id: string) {
    const trip = this.trips.find(
      (s) => {
        return s._id === _id;
      }
    );
    console.log("trip"+trip);
    return trip;
}

constructor(private httpClient: HttpClient, private authService: AuthService) {
  this.destination_survey = new Array<any>();
  this.total_votes=0;
 }


saveTripToServer(name: string) {
    const tripObject = {
        name: ''
      };
      tripObject.name = name;
    this.httpClient
      .post('https://listo-ece.herokuapp.com/trips/createTrip',tripObject , {withCredentials : true})
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
          }
      );
      
}
saveTripDate(fromDate: NgbDate, toDate: NgbDate, trip_id : string ){
    const date = {
            "start_year": 0,
            "start_month": 0,
            "start_day": 0,
            
            "end_year": 0,
            "end_month": 0,
            "end_day": 0
      };
      date.start_day = fromDate.day;
      date.start_month = fromDate.month;
      date.start_year = fromDate.year;
      
      date.end_day = toDate.day;
      date.end_month = toDate.month;
      date.end_year = toDate.year;
      console.log(date);
      this.httpClient
      .post('https://listo-ece.herokuapp.com/trips/'+trip_id+'/dates/addData',date , {withCredentials : true})
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
          }
      );
      

}

saveTripDestination(destination_name: string, trip_id: string ){
  
    const tripDestination = {
        destination_name: ''
      };
      tripDestination.destination_name = destination_name;
    this.httpClient
      .post('https://listo-ece.herokuapp.com/trips/'+trip_id+'/destination/addData',tripDestination , {withCredentials : true})
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
          }
      );
}

addLocallyDestination(destination_name: string, userId: string){
  console.log(this.destination_survey);
  const destination = {
    destination_name: '',
    users_id : '',
    _id : ''
  }
  const dest = {
    destination_name: '',
    votes: 1,
    user_vote: true
  }

  destination.destination_name = destination_name;
  dest.destination_name =  destination_name;
  destination.users_id = userId;

  if(!this.eleContainsInArray(destination.destination_name, 1)){
    console.log("coucou")
    this.destination_survey.push(dest);
    }
    this.total_votes++;
}


getTripFromServer() {
    
    return new Promise (
        (resolve, reject) => {
        this.httpClient
      .get<any[]>('https://listo-ece.herokuapp.com/overview',{withCredentials : true})
      .subscribe(
        (response) => {
            console.log (response);
            this.trips = response;
            resolve(true);
        },
        (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
            resolve(true);
          }
        
      );
        }
    );
        
}
getDataFromServer(trip_id: string, userId: string){
  console.log(userId);
  this.userId = userId;
  return new Promise (
    (resolve, reject) => {
    this.httpClient
  .get<any[]>('https://listo-ece.herokuapp.com/trips/'+trip_id+'/destination/getData',{withCredentials : true})
  .subscribe(
    (response) => {
        console.log (response);
       this.destinationSurveyBuilder(response)
        resolve(this.destination_survey);
    },
    (err: HttpErrorResponse) => {
        console.log(JSON.parse(JSON.stringify(err)));
        resolve(true);
      }
    
  );
    }
);
}
destinationSurveyBuilder(destination: any[]){

  if(destination != null && destination.length >0){
    for(var i =0; i<destination.length; i++){
      const dest = {
        destination_name: '',
        votes: 1,
        user_vote: 0
      }
      if(destination[i].users_id == this.userId){

        dest.user_vote = 1;
      }
      if(!this.eleContainsInArray(destination[i].destination_name, dest.user_vote)){
        dest.destination_name =  destination[i].destination_name;
        this.destination_survey.push(dest);
      }
    }

  }
  


}

eleContainsInArray(element : string, user_vote: number){
  
  if(this.destination_survey != null && this.destination_survey.length >0){
      for(var i=0;i<this.destination_survey.length;i++){
          if(this.destination_survey[i].destination_name == element)
          {
            if(user_vote){
              this.destination_survey[i].user_vote = 1;
            }
            
            this.destination_survey[i].votes = this.destination_survey[i].votes + 1;
           
            return true;
          }   
      }
  }
  return false;
} 
calculateTotalDestinationVotes(){
  
  this.total_votes=0;
    for (var i=0; i<this.destination_survey.length; i++){
      this.total_votes = this.total_votes+ this.destination_survey[i].votes;
     
    }
  
  }



}