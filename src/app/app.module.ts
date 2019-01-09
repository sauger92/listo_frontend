import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { TripComponent } from './trip/trip.component';
import {TripService} from './services/trip.service';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    TripService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
