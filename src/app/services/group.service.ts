import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve, reject } from 'q';

@Injectable()
export class GroupService{
    
    Groupusers = [
        {
            id : 0,
            useremail: 'jjkjkj@gmail.com',
        },
        {
            id : 0,
            useremail: 'j@gmail.com',
        },
        {
            id : 0,
            useremail: 'j78@gmail.com',
        }
    ];

    constructor(private httpClient: HttpClient) { }

    Group : any[];

    addUserInGroup(name: string) {
        const UserObject = {
          id : 0,
          useremail: '',
        };
        UserObject.useremail = name;
        UserObject.id = this.Groupusers [(this.Groupusers .length - 1)].id + 1;
        this.Groupusers.push(UserObject);
    }

    affichageUserInGroup(trip_id : string)
    {
        return new Promise (
            (resolve, reject) => {
            this.httpClient
          .get<any[]>('https://listo-ece.herokuapp.com/trips/'+trip_id+'/getGroup',{withCredentials : true})
          .subscribe(
            (response) => {   
            this.Group = response;
            console.log(response);
            
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