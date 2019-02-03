import { Component } from '@angular/core';

// import { ModalService } from '@myServices/modal.service';


@Component({
  selector: 'new-trip',
  templateUrl: './new-trip.componentt.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent  {

 
  constructor() { }

  public close() {
    // this.modalService.destroy();
  }
 
}