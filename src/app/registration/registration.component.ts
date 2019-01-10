import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  users: any[];

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.users = this.authService.users;
  }
  
  onSubmit(form: NgForm) {
    console.log(form.value);
    const Username = form.value['name'];
    const Email = form.value['email'];
    const Password = form.value['Userpassword'];
    this.authService.addUser(Username,Email,Password);
  }

}
