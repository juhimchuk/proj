import { Component, Input } from '@angular/core';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import { CalendarConfig } from 'src/modules/calendars/config/calendar.config';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html'
})
export class CalendarDayComponent {
  @Input() calendarDate: CalendarDate;
  @Input() config: CalendarConfig;

  constructor() { }

  protected getDayClasses(): string {
    const classList: string[] = [];
    classList.push(this.calendarDate.isCurentMonth ? '' : this.config.day.irrelevantClass);
    classList.push(this.calendarDate.isToday ? this.config.day.currentClass : '');
    return classList.join(' ');
  }
}