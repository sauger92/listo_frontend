import { Component,Input, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  @Input() InfoUserEmail: string;
  @Input() InfoUserName: string;
  @Input() InfoUserPassword : string;

  users: any[];

  constructor(private authService :AuthService) { }

  ngOnInit() {
    this.users = this.authService.users;
    this.InfoUserName = this.users[2].name;
    this.InfoUserEmail = this.users[2].email; 
    this.InfoUserPassword = this.users[2].password; 
  }
  

}
