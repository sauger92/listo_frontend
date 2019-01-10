import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  @Input() userEmail: string;
  @Input() userName: string;
  @Input() userPassword : string;

  constructor(private authService :AuthService) { }

  ngOnInit() {
  }

}
