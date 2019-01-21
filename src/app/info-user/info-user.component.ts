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
  user: any;

  constructor(private authService :AuthService) { }

  ngOnInit() {
    this.users = this.authService.users;

    this.authService.FindUserInfo().then(
      () => {
        console.log (this.authService.UserInfo)
        this.InfoUserName = this.authService.UserInfo.username; 
        this.InfoUserEmail = this.authService.UserInfo.email; 
        this.InfoUserPassword = this.authService.UserInfo.password; 
      } 
    );
 
  }
  

}
