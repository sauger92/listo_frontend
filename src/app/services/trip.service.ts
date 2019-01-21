import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

interface Trip{
    name: string
}

@Injectable()
export class TripService{
trips : any[];

getTripById(_id: string) {
    const trip = this.trips.find(
      (s) => {
        return s._id === _id;
      }
    );
    console.log("trip"+trip);
    return trip;
}

constructor(private httpClient: HttpClient) { }


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
saveTripDate(fromDate: NgbDate, toDate: NgbDate ){
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
      

}
saveTripDestination(destination_name: string, trip_id: string ){
    const tripDestination = {
        destination_name: ''
      };
      tripDestination.destination_name = destination_name;
    this.httpClient
      .post('https://listo-ece.herokuapp.com/trips/'+trip_id+'/addDestination',tripDestination , {withCredentials : true})
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
          }
      );
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


}