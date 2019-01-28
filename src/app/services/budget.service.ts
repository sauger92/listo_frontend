import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { resolve, reject } from 'q';
import { parse } from 'querystring';

@Injectable()
export class BudgetService{


    MyLogement : number;
    MyTransport : number;
    MyLoisir : number;
    MyTotal : number;

    MoyenneTotal : number;
    MoyenneLoisir : number;
    MoyenneLogement : number;
    MoyenneTransport : number;

    AverageBudget : any;

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
          .get<any>('https://listo-ece.herokuapp.com/trips/'+trip_id+'/getBudget',{withCredentials : true})
          .subscribe(
            (response) => {   
            console.log("Response: "+JSON.stringify(response));
            console.log("SM Response: "+response);
            
            this.MyTransport = parseInt(JSON.stringify(response.myBudget.transportation));
            this.MyLogement = parseInt(JSON.stringify(response.myBudget.accommodation));
            this.MyLoisir = parseInt(JSON.stringify(response.myBudget.on_the_spot));
            this.MyTotal = parseInt(JSON.stringify(response.myBudget.total));

            this.MoyenneTransport = parseInt(JSON.stringify(response.meanBudget.transportation)); 
            this.MoyenneLogement =parseInt(JSON.stringify(response.meanBudget.accommodation));
            this.MoyenneLoisir = parseInt(JSON.stringify(response.meanBudget.on_the_spot));
            this.MoyenneTotal = parseInt(JSON.stringify(response.meanBudget.total));
     
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