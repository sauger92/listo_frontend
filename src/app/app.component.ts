import { Component } from '@angular/core';
import { TripService } from './services/trip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'listo';

  constructor(private appareilService: TripService) {
  
  }
  
  ngOnInit() {
    
  }
}
