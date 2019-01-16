import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-groupuser',
  templateUrl: './groupuser.component.html',
  styleUrls: ['./groupuser.component.scss']
})
export class GroupuserComponent implements OnInit {

  @Input() userEmail: string;

  constructor(private authService :AuthService) { }

  ngOnInit() {
  }

}
