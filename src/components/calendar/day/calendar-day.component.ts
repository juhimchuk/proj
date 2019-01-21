import { Component, Input, AfterContentInit, ElementRef } from '@angular/core';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html'
})
export class CalendarDayComponent implements AfterContentInit {
  @Input() calendarDate: CalendarDate;
  @Input() config: ICalendarConfig;

  constructor(private element: ElementRef) { }

  ngAfterContentInit(){
    this.calendarDate.tooltipModel.leftPosition = this.element.nativeElement.offsetLeft;
    this.calendarDate.tooltipModel.topPosition = this.element.nativeElement.offsetTop;
    console.log(this.element);
  }
}