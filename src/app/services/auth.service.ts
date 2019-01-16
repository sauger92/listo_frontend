import { UserComponent } from './../user/user.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve, reject } from 'q';


@Injectable()
export class AuthService{

    users = [
        {
            id : 1,
            name : 'Simon',
            email : 'simon@gmail.com',
            password : 'dkr'
        },
        {
            id : 2,
            name : 'Samerlipopette',
            email : 'sam@gmail.com',
            password : 'dkr2'
        }
    ];

    constructor(private httpClient: HttpClient) { }


    LoginAcceptation = false; 
    LoginStatue = false; 
    
    addUser(name: string, email: string, password: string) {
        const UserObject = {
          id: 0,
          name: '',
          email : '',
          password : ''
        };
        UserObject.name = name;
        UserObject.email = email;
        UserObject.id = this.users[(this.users.length - 1)].id + 1;
        UserObject.password = password;
        this.users.push(UserObject);
      }

    logUser(email: string, password: string){
        const UserObject = {
            email : '',
            password : ''
          };

        UserObject.email = email;
        UserObject.password = password;

        return new Promise (
            (resolve, reject) => {
            this.httpClient
        .post('https://listo-ece.herokuapp.com/users/login', UserObject)
        .subscribe(
          () => {
                console.log("CONNECTION GOOD");
                this.LoginAcceptation = true;
                console.log(this.LoginAcceptation); 
                this.LoginStatue = true;
                resolve(true);
          },
          (err: HttpErrorResponse) => {
            console.log("CONNECTION NOT GOOD");
            this.LoginAcceptation = false; 
            console.log(this.LoginAcceptation);
            resolve(true);
            
            }
        );
        }
        )


            
             
        

          
              
        
    }

    

    unlogUser()
    {
        this.LoginStatue = false;
    }
    
    }