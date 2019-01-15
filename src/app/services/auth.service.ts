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
        },
        {
            id : 3,
            name : 'Simon2',
            email : 'simon2@gmail.com',
            password : 'dkr3'
        },
        {
            id : 4,
            name : 'Simon3',
            email : 'simon3@gmail.com',
            password : 'dkr3'
        }
    ];

    constructor(private httpClient: HttpClient) { }


    LoginAcceptation = false; 
    LoginStatue = false; 
    Userfind = false; 
    
    addUser(name: string, email: string, password: string) {
        const UserObject = {
          username: '',
          email : '',
          password : ''
        };
        UserObject.username = name;
        UserObject.email = email;
        UserObject.password = password;

        //this.users.push(UserObject);

        return new Promise (
            (resolve, reject) => {
            this.httpClient
        .post('https://listo-ece.herokuapp.com/users/register', UserObject, {withCredentials : true})
        .subscribe(
          () => {
                console.log("Register GOOD");
                resolve(true);
          },
          (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
            console.log("Register NOT GOOD");
            resolve(true);
            
            }
        );
        }
        ) 
      }

    //

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
        .post('https://listo-ece.herokuapp.com/users/login', UserObject, {withCredentials : true})
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

    //Fonction pour verifier si il y a un user donné existe bien dans la BDD 

    findUserbyUsername(UserEmail_load: string)
        {
    for (let user in this.users)
        {
            console.log(this.users);
            console.log(user);

            if(UserEmail_load == this.users[user].email){
                
                console.log("USER PRESENT IN THE DATABASE");
                this.Userfind =true;
                console.log(this.Userfind); 
                return this.Userfind;
                
            } 
            else
            {
                console.log("USER NOT PRESENT IN THE DATABASE");
                this.Userfind =false;
                console.log(this.Userfind);
            }
        }

        }

    

    unlogUser()
    {
        this.LoginStatue = false;
    }


    // FONCTION FOR ACCOUNT PAGE and MODIFY USER

    ChangeInfoUser(name: string, email: string, password: string) {
        const UserObject = {
          username: '',
          email : '',
          password : ''
        };
        UserObject.username = name;
        UserObject.email = email;
        UserObject.password = password;
        
        return new Promise (
            (resolve, reject) => {
            this.httpClient
        .put('https://listo-ece.herokuapp.com/users/editUser', UserObject, {withCredentials : true})
        .subscribe(
          () => {
                console.log("User change");
                resolve(true);
          },
          (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
            console.log("User NOT Change");
            resolve(true);
            
            }
        );
        }
        )
        
        
    }

    
    
    }