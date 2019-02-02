import { Component, OnInit, Input } from '@angular/core';

import { interval } from 'rxjs';
import { getTime } from 'date-fns';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
@Input() userName: string;
@Input() content: string;
@Input() date: Date;
@Input() isUser: boolean;
time: string;
timeSpent: number;

  constructor() {
    this.timeSpent=0;
   }

  ngOnInit() {
    this.time = this.getTime();
    const counter = interval(60000);
    counter.subscribe(
      (value) => {
        this.timeSpent = value;
        this.time = this.getTime();
      },
    );
  }
  returnIfIsUser(){
    return this.isUser;
  }
  getTime(){
    var unit = "";
    var heure =0;
    var day = 0;
    var number =0;
    var diff = Math.abs(this.date.getTime() - new Date().getTime() );
    var min = diff/60000 +this.timeSpent;
    unit = "min";
    number = min;

    if(min>60){
      heure = min/60;
      unit = "hour";
      number = heure;
    }
    if(heure>24){
      day =  heure/24;
      unit = "day";
      number = day;
    }
    
    return String(Math.abs(Math.round(number)))+" "+unit+" ago";

  }

}
