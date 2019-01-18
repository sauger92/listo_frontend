import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';

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