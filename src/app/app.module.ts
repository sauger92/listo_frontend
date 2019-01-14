import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { TripComponent } from './trip/trip.component';
import {TripService} from './services/trip.service';
import { RegistrationComponent } from './registration/registration.component';

import {AuthService} from './services/auth.service';
import {UserComponent} from './user/user.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {AuthGuard} from './services/authguard.service';

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component' 

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'registration/login', redirectTo: 'login' },
  { path: 'login/registration', redirectTo: 'registration' },
  { path: 'overview', canActivate: [AuthGuard], component: OverviewComponent },
  { path: '', component: LoginComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TripComponent,
    RegistrationComponent,
    UserComponent,
    LoginComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,                              
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TripService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
