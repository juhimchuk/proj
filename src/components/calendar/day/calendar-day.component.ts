import { Component, Input } from '@angular/core';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html'
})
export class CalendarDayComponent {
  @Input() calendarDate: CalendarDate;
  @Input() config: ICalendarConfig;

  constructor() { }
}