import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { resolve, reject } from 'q';

@Injectable()
export class BudgetService{

    UserBudget : any;

    constructor(private httpClient: HttpClient) { }

    SaveBudgetInDataBase(trip_id : string, transportation: number, accommodation : number, on_the_spot : number, total : number)
    {
        const Mybudget = {
            transportation: 0,
            accommodation : 0,
            on_the_spot : 0,
            total: 0 
          };

          Mybudget.transportation = transportation ;
          Mybudget.accommodation = accommodation;
          Mybudget.on_the_spot = on_the_spot;
          Mybudget.total = total;

          return new Promise (
            (resolve, reject) => {
            this.httpClient
        .put('https://listo-ece.herokuapp.com/trips/'+trip_id+'/saveBudget', Mybudget, {withCredentials : true})
        .subscribe(
          () => {
                console.log("Budget register");
                resolve(true);
          },
          (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
            console.log("Budget Register NOT GOOD");
            resolve(true);
            
            }
        );
        }
        )
        
    }

    GetMybudgetFromDatabase(trip_id : string)
    {
        
        return new Promise (
            (resolve, reject) => {
            this.httpClient
          .get<any[]>('https://listo-ece.herokuapp.com/trips/'+trip_id+'/getBudget',{withCredentials : true})
          .subscribe(
            (response) => {   
            this.UserBudget = JSON.parse(JSON.stringify(response));
            console.log(JSON.parse(JSON.stringify(response)));             
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