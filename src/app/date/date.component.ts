import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input() datePicker: string;

  constructor() { }
  onSubmit() {
    console.log(this.datePicker);
  }

  ngOnInit() {
  }
  getDate(){
    console.log(this.datePicker);
  }

}
