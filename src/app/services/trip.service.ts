import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Trip{
    name: string
}

@Injectable()
export class TripService{
trips = [
    {
        id : 1,
        name : 'Gros Trip'
    },
    {
        id : 2,
        name : 'Samerlipopette'
    }
];
test = {    name: "samerliopopette"
};



addTrip(name: string) {
    const tripObject = {
      id: 0,
      name: '',
    };
    tripObject.name = name;
    tripObject.id = this.trips[(this.trips.length - 1)].id + 1;
    this.trips.push(tripObject);
}
getTripById(id: number) {
    const trip = this.trips.find(
      (s) => {
        return s.id === id;
      }
    );
    return trip;
}

constructor(private httpClient: HttpClient) { }


saveTripToServer() {
    this.httpClient
      .post('https://listo-ece.herokuapp.com/trips/createTrip', this.test)
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
    this.httpClient
      .get<any[]>('https://listo-ece.herokuapp.com/trips/5c3dc1f42022010023b72554')
      .subscribe(
        (response) => {
          console.log (response);
        },
        (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
          }
      );
}


}