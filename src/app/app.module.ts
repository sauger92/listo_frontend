import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

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
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component';
import { TrippageComponent } from './trippage/trippage.component';
import { GroupComponent } from './group/group.component';
import { DestinationComponent } from './destination/destination.component';
import { DateComponent } from './date/date.component';
import { BudgetComponent } from './budget/budget.component';
import { ListComponent } from './list/list.component' 
import { HttpClientModule } from '@angular/common/http';

import {GroupService} from './services/group.service';
import { GroupuserComponent } from './groupuser/groupuser.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { AccountPageComponent } from './account-page/account-page.component'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SurveyComponent } from './survey/survey.component';
import {ListService} from './services/list.service';
import {BudgetService} from './services/budget.service';
import { CalendarComponent } from './calendar/calendar.component';

import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChatComponent } from './chat/chat.component'
import { SocketService } from './services/socket.service';
import { MessageComponent } from './message/message.component';
import { BadgesComponent } from './badges/badges.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'registration/login', redirectTo: 'login' },
  { path: 'login/registration', redirectTo: 'registration' },
  { path: 'overview', component: OverviewComponent },
  { path: '', component: LoginComponent },
  {path: 'overview/:tripId', component: TrippageComponent},
  { path: 'account', component: AccountPageComponent },
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
    FourOhFourComponent,
    TrippageComponent,
    GroupComponent,
    DestinationComponent,
    DateComponent,
    BudgetComponent,
    ListComponent,
    GroupuserComponent,
    EditUserComponent,
    InfoUserComponent,
    AccountPageComponent,
    SurveyComponent,
    CalendarComponent,
    ChatComponent,
    MessageComponent,
    BadgesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GooglePlaceModule,
    HttpClientModule,                              
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TripService,
    AuthService,
    AuthGuard,
    GroupService,
    ListService,
    BudgetService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
