import { Component, OnInit, Input } from '@angular/core';
import { isUndefined } from 'util';

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

  constructor() { }

  ngOnInit() {
  }
  returnIfIsUser(){
    return this.isUser;
  }

}
