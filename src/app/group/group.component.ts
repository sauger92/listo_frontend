import { AuthService } from './../services/auth.service';
import { GroupService } from './../services/group.service';
import { Component,Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  users: any[];
  group: any[];
  avatar: string[];
  @Input() tripId: string;
  visibility : any;

  


  constructor(private authService : AuthService,private tripService: TripService, private groupService : GroupService ) {
      this.avatar = new Array<string>();
  }

  ngOnInit() {
    this.users = this.authService.users;
    this.tripService.GetTripInfo(this.tripId).then(
      ()=>{

      }
    );


    this.groupService.GetTripAdmin(this.tripId).then(
      () => {
        console.log ("Admin define");
      } 
    );

    this.groupService.affichageUserInGroup(this.tripId).then(
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

  onDelete(form: NgForm) {
    const UserEmail = form.value['UserEmailgroup'];
    this.groupService.RemoveUserFromTrip(this.tripId,UserEmail).then(
      () => {
        console.log("In DeleteUser in group");
      });
  }

  getVisibility(){
    if (this.groupService.AdminStatus == true)
    {
      this.visibility = 'visible';
    }
    else
    {
      this.visibility = 'hidden';
    }
    return this.visibility;
  }





}
