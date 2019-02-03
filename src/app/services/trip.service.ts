import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { resolve } from 'url';
import { CalendarEvent } from 'calendar-utils';
import { endOfDay } from 'date-fns';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { GroupService } from './group.service';
import { ChatComponent } from '../chat/chat.component';
import { stringify } from 'querystring';

interface Trip{
    name: string
}

@Injectable()
export class TripService {

trips : any[];
userId : string;
date_survey: CalendarEvent[];
date_id: String[];
destination_survey: any[];O
total_votes: number;
DestinationFinal : string;
validationbyAdmin : boolean;
chat_destination: any[];
chat_list: any[];
chat_calendar: any[];

//Items 
WineBottleDestination : any;
TransportDestination : any ;
RestaurantDestination : any;
BiereDestination : any;
McdonaldDestination : any;
Currency : any;



getTripById(_id: string) {
    const trip = this.trips.find(
      (s) => {
        return s._id === _id;
      }
    );
    return trip;
}

constructor(private httpClient: HttpClient, private authService: AuthService, private groupService: GroupService) {
  this.destination_survey = new Array<any>();
  this.date_survey = new Array<CalendarEvent>();
  this.date_id = new Array<String>();
  this.total_votes=0;
  this.validationbyAdmin = false;
  this.chat_destination= new Array<any>();
  this.chat_list= new Array<any>();
  this.chat_calendar= new Array<any>();
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
  
  addNewDate(start: Date, end :Date, dateColor: string ,trip_id: string, userName: string){
    const date = {
      custom_id: trip_id+ String(Math.floor(Math.random() * 10000000) + 1),
      start_date : start,
      end_date : end,
      color : dateColor
    };
    const colors: any = {
      color: {
        primary: date.color
      }
    };
    this.date_id.push (date.custom_id,)
    this.date_survey.push({
      title: userName,
      start: date.start_date,
      end: date.end_date,
      color: colors.color  
    });

      this.httpClient
      .post('https://listo-ece.herokuapp.com/trips/'+trip_id+'/date/addData',date , {withCredentials : true})
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
          }
      );


  }

  getDatesFromServer(trip_id: string, userId: string){
    
    
    this.userId = userId;
    return new Promise (
      (resolve, reject) => {
      this.httpClient
    .get<any[]>('https://listo-ece.herokuapp.com/trips/'+trip_id+'/date/getData',{withCredentials : true})
    .subscribe(
      (response) => {
          console.log (response);
         this.datesSurveyBuilder(response, trip_id);
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

  datesSurveyBuilder(date: any[], trip_id: string){
      
    for(var j = 0; j<date.length; j++){
      const colors: any = {
        color: {
          primary: date[j].color
        }
      };
      for(var i = 0; i<this.groupService.Group.length; i++){
        if(this.groupService.Group[i]._id == date[j].users_id){
          var name = this.groupService.Group[i].username;
        }
      }
      this.date_id.push(date[j].custom_id);
      this.date_survey.push({
        title: name,
        start: new Date(Date.parse(date[j].start_date)),
        end: new Date(Date.parse(date[j].end_date)),
        color: colors.color  
      });
    } 
     
  }


  removeDate(id: string, trip_id: string ){
    const date = {
      custom_id: id
    };
    this.httpClient
    .put('https://listo-ece.herokuapp.com/trips/'+trip_id+'/date/deleteData', date, {withCredentials : true})
    .subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (err: HttpErrorResponse) => {
          console.log(JSON.parse(JSON.stringify(err)));
        }
    );

      }

    editData(id: string, start: Date, end: Date, color: string, trip_id: string, index: number){
        const date = {
          custom_id: id,
          start_date: start,
          end_date: end,
          color: color
        };
        this.date_survey[index].start = start;
        this.date_survey[index].end = end;
        this.date_survey[index].color.primary = color;
        console.log(date);

        this.httpClient
        .put('https://listo-ece.herokuapp.com/trips/'+trip_id+'/date/editData', date, {withCredentials : true})
        .subscribe(
          () => {
            console.log('Enregistrement terminé !');
          },
          (err: HttpErrorResponse) => {
              console.log(JSON.parse(JSON.stringify(err)));
            }
        );
        
      }

      DestinationValidation (trip_id: string, Tripdestination : string)
      {
        const destination = {
          destination_name: '' 
        };

        destination.destination_name = Tripdestination;
        this.validationbyAdmin = true;

        return new Promise (
          (resolve, reject) => {
        this.httpClient
        .post('https://listo-ece.herokuapp.com/trips/'+trip_id+'/destination/validateData',destination , {withCredentials : true})
        .subscribe(
          () => {
            console.log('Destination Fixé : ' + destination.destination_name);
            this.DestinationFinal = destination.destination_name;
            console.log('this.DestinationFinal FIXE: ', this.DestinationFinal);
          },
          (err: HttpErrorResponse) => {
              console.log(JSON.parse(JSON.stringify(err)));
            }
          
        );
        
          });
      
    }

    DateValidation(trip_id: string, DateDebut : string, DateFin : string)
    {
      const Finaldate = {
        start_date: '',
        end_date: '' 
      };

      Finaldate.start_date = DateDebut;
      Finaldate.end_date = DateFin;

      return new Promise (
        (resolve, reject) => {
      this.httpClient
      .post('https://listo-ece.herokuapp.com/trips/'+trip_id+'/dates/validateData',Finaldate , {withCredentials : true})
      .subscribe(
        () => {
          console.log( "Le sejour ce fera du " + Finaldate.start_date + "au" + Finaldate.end_date); 
        },
        (err: HttpErrorResponse) => {
            console.log(JSON.parse(JSON.stringify(err)));
          }
        
      );
      
        });
    }
    getChat(trip_id: string, username: string, topic : string){
      this.chat_destination= new Array<any>();
      this.chat_list= new Array<any>();
      this.chat_calendar= new Array<any>();

    return new Promise (
      (resolve, reject) => {
      this.httpClient
    .get<any[]>('https://listo-ece.herokuapp.com/trips/'+trip_id+'/'+topic+'/getChat',{withCredentials : true})
    .subscribe(
      (response) => {
          console.log (response);
         this.chatBuilder(response, username, topic);
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
  chatBuilder(response: any[], username: string, topic: string){
    console.log(topic);
    for(var i=0; i<response.length; i++){
      var isUser = false;
      
      if(username === response[i].sender){
        isUser = true;
      }
        
      switch(topic) {
        case "destination" : {
          console.log("coucou");
          this.chat_destination.push({
            username: response[i].sender,
            isUser: isUser,
            message: response[i].content,
            date: new Date(Date.parse(response[i].date))
          } );
          break; 
        }
        case "list" : {
          this.chat_list.push({
            username: response[i].sender,
            isUser: isUser,
            message: response[i].content,
            date: new Date(Date.parse(response[i].date))
          } );
          break; 
        }
        case "calendar" : {
          this.chat_calendar.push({
            username: response[i].sender,
            isUser: isUser,
            message: response[i].content,
            date: new Date(Date.parse(response[i].date))
          } );}
          break; 

      }
     
    }
    }
  
}

    GetPriceItemByDestination (DestinationList : string)
    {
      return new Promise (
        (resolve, reject) => {
        this.httpClient
      .get<any[]>('https://listo-ece.herokuapp.com/trips/123/getPriceItemByDestination/'+DestinationList,{withCredentials : true})
      .subscribe(
        (response) => {
            
            console.log ("response For Price Item: " + response);
            console.log ("response For Price Item: " + JSON.stringify(response[0]));

            this.WineBottleDestination = JSON.stringify(response[0].prices[3].average_price); 
            this.TransportDestination = JSON.stringify(response[0].prices[4].average_price);
            this.RestaurantDestination = JSON.stringify(response[0].prices[0].average_price);
            this.BiereDestination = JSON.stringify(response[0].prices[2].average_price);
            this.McdonaldDestination = JSON.stringify(response[0].prices[1].average_price); 
            this.Currency = JSON.stringify(response[0].currency);
            
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


