import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve, reject } from 'q';


@Injectable()
export class ListService{

    TodoList: any;
    BringList: any;


    constructor(private httpClient: HttpClient) { }
    
    AddTaskinDataBase( Task:string, Responsable: string, Listtype: string, Difficulté : number, TripId : string)
    {
        const ListObject = {
            description: '',
            difficulty: 0,
            status: false,
            userInvolved: "" 
          };

          ListObject.description = Task;
          ListObject.difficulty= Difficulté;
          ListObject.userInvolved = Responsable;
          console.log("List Object : " + JSON.stringify(ListObject));
          
          return new Promise (
              (resolve, reject) => {
              this.httpClient
          .put('https://listo-ece.herokuapp.com/trips/'+ TripId +'/'+ Listtype +'/add', ListObject, {withCredentials : true})
          .subscribe(
            () => {
                  console.log("List Save");
                  resolve(true);
            },
            (err: HttpErrorResponse) => {
              console.log(JSON.parse(JSON.stringify(err)));
              console.log("List Not save");
              resolve(true);
              
              }
          );
          }
          )   
    }
    
    GetListinDataBase(TripId : string, Listtype: string)
    {
        if (Listtype == "toDoList")
        {
            return new Promise (
                (resolve, reject) => {
                this.httpClient
              .get<any[]>('https://listo-ece.herokuapp.com/trips/'+TripId+'/'+Listtype+'/get',{withCredentials : true})
              .subscribe(
                (response) => {   
                this.TodoList = response;         
                console.log('response: ', response);
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
        else if (Listtype == "bringList")
        {
            return new Promise (
                (resolve, reject) => {
                this.httpClient
              .get<any[]>('https://listo-ece.herokuapp.com/trips/'+ TripId+'/'+ Listtype +'/get',{withCredentials : true})
              .subscribe(
                (response) => {   
                this.BringList = response;         
                console.log('response: ', response);
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

    DeleteItemsListinDataBase(TripId : string, Listtype: string, ItemId: string)
    {
        if (Listtype == "toDoList")
        {
            return new Promise (
                (resolve, reject) => {
                this.httpClient
              .delete<any[]>('https://listo-ece.herokuapp.com/trips/'+TripId+'/'+ Listtype+'/'+ItemId+'/delete',{withCredentials : true})
              .subscribe(
                () => {           
                    console.log("Todo list Items Delete "); 
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
        else if (Listtype == "bringList")
        {
            return new Promise (
                (resolve, reject) => {
                this.httpClient
              .delete<any[]>('https://listo-ece.herokuapp.com/trips/'+TripId+'/'+Listtype+'/'+ItemId+'/delete',{withCredentials : true})
              .subscribe(
                () => {   
                console.log("Bring list Items Delete ");        
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

   ModifyItemsListinDataBase_Done(TripId : string, Listtype: string, ItemId: string, Task:string, Responsable: string, Difficulté : number, StatusChange:boolean)
    { 
        const ListObject = {
            description: '',
            difficulty: 0,
            status: false,
            usersInvolved: "" 
          };


        ListObject.description = Task;
        ListObject.difficulty = Difficulté;
        ListObject.usersInvolved = Responsable;
        ListObject.status = StatusChange;



        if (Listtype == "toDoList")
        {
            return new Promise (
                (resolve, reject) => {
                this.httpClient
              .put('https://listo-ece.herokuapp.com/trips/'+TripId+'/'+ Listtype+'/'+ItemId+'/modify', ListObject, {withCredentials : true})
              .subscribe(
                () => {           
                    console.log("Todo list Items Modify "); 
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
        else if (Listtype == "bringList")
        {
            return new Promise (
                (resolve, reject) => {
                this.httpClient
              .put('https://listo-ece.herokuapp.com/trips/'+TripId+'/'+Listtype+'/'+ItemId+'/modify',ListObject,{withCredentials : true})
              .subscribe(
                () => {   
                console.log("Bring list Items Modify ");        
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

}
