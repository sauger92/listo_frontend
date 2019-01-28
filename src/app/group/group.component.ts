import { AuthService } from './../services/auth.service';
import { GroupService } from './../services/group.service';
import { Component,Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  users: any[];
  group: any[];
  @Input() tripId: string;
  


  constructor(private authService : AuthService, private groupService : GroupService ) {}

  ngOnInit() {
    this.users = this.authService.users;
    this.groupService.AffichageUserInGroup(this.tripId).then(
      () => {
        console.log (this.groupService.Group);
        this.group = this.groupService.Group;
      } 
    );

    
    
  }
 
  onSubmit(form: NgForm) {
    console.log(form.value);
    const UserEmail = form.value['UserEmailgroup'];

    this.authService.AddUserInGroup(this.tripId,UserEmail).then(
      () => {
        console.log("In AddUserInGroup");
      });

  }

}
