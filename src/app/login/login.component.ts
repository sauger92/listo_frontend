import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: any[];
  

  constructor(private authService : AuthService, private router: Router) {
    
   }

  ngOnInit() {
    this.users = this.authService.users;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const Email = form.value['email'];
    const Password = form.value['Userpassword'];
    this.rootUser(Email,Password);

  }

  rootUser(email: string, password: string){
    this.authService.logUser(email,password).then(
      () => {
        if (this.authService.LoginAcceptation){
          this.router.navigate(['/overview']);
      }else{
        this.router.navigate(['/registration']);
      }
    }
    );

}

}
