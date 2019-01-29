import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { validateConfig } from '@angular/router/src/config';
import { TripService } from '../services/trip.service';
import { AuthService } from '../services/auth.service';

const colors: any = {
  red: {
    primary: '#ad2121'
  },
  blue: {
    primary: '#1e90ff'
  },
  yellow: {
    primary: '#e3bc08'
  },
  bla: {
    primary: '#e3bc08'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit{
  @Input() tripId: string;
  userId: string;
  userName: string; 

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.bla,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'An event with no end date',
      color: colors.red
    },
    
  ];

  refresh: Subject<any> = new Subject();

  

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private tripService: TripService, private authService: AuthService) {}

  ngOnInit(){
    this.authService.FindUserInfo().then(
      () => {
        this.userId=this.authService.UserInfo._id;
        this.userName = this.authService.UserInfo.username;
        this.tripService.getDatesFromServer(this.tripId, this.userId).then(
          (value) => {
            
         
            this.events = this.tripService.date_survey;
            console.log(  this.events);
            this.refresh.next();
    
            
            } 
        );
      }
    );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.tripService.addNewDate(startOfDay(new Date()), endOfDay(new Date()), this.getRandomColor(), this.tripId , this.userName);
    this.events = this.tripService.date_survey;
    this.refresh.next();
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  removeEvent(index: number){
    console.log(this.events[index]); 
    
    this.tripService.removeDate(String(this.events[index].id), this.tripId);
    this.events.splice(index, 1);  
    this.refresh.next()
  }
  editData(index: number){
    this.tripService.editData(String(this.events[index].id),this.events[index].start, this.events[index].end, this.events[index].color.primary, this.tripId, index);
     this.events = this.tripService.date_survey;
    this.refresh.next()
  }


}
