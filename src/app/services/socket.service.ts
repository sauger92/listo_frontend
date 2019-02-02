import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

import { Event } from '../model/event.model';


import * as socketIo from 'socket.io-client';
import {Message} from '../model/message.model'
import { TripService } from './trip.service';

const SERVER_URL = 'https://listo-ece.herokuapp.com/chat';

@Injectable()
export class SocketService {
    private socket;
    constructor(private tripService: TripService){

    }

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
        this.socket.on('message', function(data) {
            console.log(data);
          })
      
    }

    public send(message: Message): void {
        this.socket.emit('message', message.message,message.tripId,message.topic,message.from);
      
    }
    public newUser(bip: any){
        this. socket.emit('nouveau_client', bip.tripId,bip.topic);
    }

    public onMessage(): Observable<any> {
        console.log("message recu");
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => observer.next(data));
            
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}