import { Component, Input, AfterContentInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarDate } from 'src/models/calendar/calendarDate';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.less']
})
export class CalendarDayComponent implements AfterContentInit {
  @Input() calendarDate: CalendarDate;

  constructor() {
    console.log(this.calendarDate)
  }

  ngAfterContentInit(){
  }
}