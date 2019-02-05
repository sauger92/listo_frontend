import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-groupuser',
  templateUrl: './groupuser.component.html',
  styleUrls: ['./groupuser.component.scss']
})
export class GroupuserComponent implements OnInit {

  @Input() userName: string;
  @Input() avatar: number;
  avatarPath: string; 

  constructor(private authService :AuthService) {console.log(this.avatar); }

  ngOnInit() {
    this.avatarPath = "level"+this.avatar+".png";

  }

}
