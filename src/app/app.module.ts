import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { TripComponent } from './trip/trip.component';
import {TripService} from './services/trip.service';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import {AuthService} from './services/auth.service';
import {UserComponent} from './user/user.component'; 


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TripComponent,
    RegistrationComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    TripService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
