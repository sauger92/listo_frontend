import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    console.log(form.value);
    const Username = form.value['Newname'];
    const Email = form.value['Newemail'];
    const Password = form.value['Newpassword'];
    const Password2 = form.value['Newpassword2'];

    if (Password == Password2)
    {
      if(confirm('Etes-vous sûr de vouloir changer vos parametre ?')) {
        console.log("Info Changé")
        this.authService.ChangeInfoUser(Username,Email,Password);
      } else {
        return null;
      }
    }
    else
    {
      console.log("les mots de passes ne sont pas pareils")
    }
  }

}
