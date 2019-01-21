import { AuthService } from './../services/auth.service';
import { GroupService } from './../services/group.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  users: any[];
  group: any[];
  


  constructor(private authService : AuthService, private groupService : GroupService ) {}

  ngOnInit() {
    this.users = this.authService.users;
    this.group = this.groupService.Groupusers;
  }

  email()
  {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const UserEmail = form.value['UserEmailgroup'];
    
    if (this.authService.findUserbyEmail(UserEmail)==true)
    {
      console.log("l'utilisateur rentré est dans la BDD");
      this.groupService.addUserInGroup(UserEmail);
      console.log("l'utilisateur rentré , accepté dans le groupe");
      //SEND MAIL : REJOINDRE GROUPE
    }
    else
    {
      console.log("l'utilisateur n'est pas rentré est dans la BDD");
      //SEND MAIL : Créer un nouveaux Compte
    }


    //this.groupService.addUserInGroup(Username);

  }

}
