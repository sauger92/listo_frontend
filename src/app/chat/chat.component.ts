import { Component, OnInit, Input } from '@angular/core';
import { Action } from '../model/action.model';
import { User } from '../model/user.model';
import { Message } from '../model/message.model';
import { SocketService } from '../services/socket.service';
import { Event } from '../model/event.model';
import { AuthService } from '../services/auth.service';
  import { TripService } from '../services/trip.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  @Input() tripId: string;
  @Input() topic: string;
  userName: string;
  userId: string;
  chats: any[];
  

  constructor(private socketService: SocketService, private tripService: TripService, private authService: AuthService) {
    this.chats = new Array<any>();
  }

  ngOnInit(): void {
    console.log("tripID : "+this.tripId);
    this.authService.FindUserInfo().then(
      () => {
        this.userId=this.authService.UserInfo._id;
        this.userName = this.authService.UserInfo.username;
        this.tripService.getChat(this.tripId, this.userName,this.topic).then(
          () => {
            
            switch(this.topic) {
              case "destination" : {
                this.chats = this.tripService.chat_destination;
                break;

              }
              case "list" : {
                this.chats = this.tripService.chat_list;
                break;

              }
              case "budget" : {
                this.chats = this.tripService.chat_budget;
                break;

              }
              case "calendar" : {
                this.chats = this.tripService.chat_calendar;
                break;

              }
            }
            this.initIoConnection();
             console.log(this.chats);
          
      }
      );
    }
    );
   
    
  }

  private initIoConnection(): void {
    this.socketService.initSocket();
    
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: any) => {
        console.log(message);
        
        this.tripService.chatBuilder([message], this.userName, this.topic);
        switch(this.topic) {
          case "destination" : {
            this.chats = this.tripService.chat_destination;
            break;
          }
          case "list" : {
            this.chats = this.tripService.chat_list;
            break;

          }
          case "calendar" : {
            this.chats = this.tripService.chat_calendar;
            break;

          }
          case "budget" : {
            this.chats = this.tripService.chat_budget;
            break;

          }
        }
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
        this.socketService.newUser({
          topic: this.topic,
          tripId: this.tripId
        });
      });
      
    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public sendMessage(form: NgForm): void {
    var message = form.value['name'];
    console.log(message);
    if (!message) {
      return;
    }
      console.log(this.topic);
    this.socketService.send({
      from: this.userId,
      message: message,
      topic: this.topic,
      tripId: this.tripId
    });
    const data =[{
      sender: this.userName,
      content : message,
      date: new Date()
    }];
    this.chatBuilderLocally(data, this.userName, this.topic);

    this.messageContent = null;
  }

  chatBuilderLocally(response: any[], username: string, topic: string){
    console.log(topic);
    for(var i=0; i<response.length; i++){
      var isUser = false;
      
      if(username === response[i].sender){
        isUser = true;
      }
    
      this.chats.push({
        username: response[i].sender,
        isUser: isUser,
        message: response[i].content,
        date: new Date(Date.parse(response[i].date))
      } );
         
        
    }
    }
  

}