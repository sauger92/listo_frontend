import { Component, OnInit, Input } from '@angular/core';
import { Action } from '../model/action.model';
import { User } from '../model/user.model';
import { Message } from '../model/message.model';
import { SocketService } from '../services/socket.service';
import { Event } from '../model/event.model';
import { AuthService } from '../services/auth.service';
import { UserComponent } from '../user/user.component';
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
  userName: string;
  userId: string;
  chats: any[];
  

  constructor(private socketService: SocketService, private tripService: TripService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.FindUserInfo().then(
      () => {
        this.userId=this.authService.UserInfo._id;
        this.userName = this.authService.UserInfo.username;
        this.tripService.getChat(this.tripId, this.userName, "destination").then(
          () => {
            this.chats = this.tripService.chat;
            this.initIoConnection();
            
          
      }
      );
    }
    );
   
    
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        console.log(message);
        this.messages.push(message);
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
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
      console.log(message);
    this.socketService.send({
      from: this.userId,
      message: message,
      topic: "destination",
      tripId: this.tripId
    });

    this.messageContent = null;
  }

}