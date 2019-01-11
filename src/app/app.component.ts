import { Component } from '@angular/core';
import * as moment from 'moment';
import { DefaultCalendarConfig } from 'src/modules/calendars/config/defaultCalendar.config';
import { CalendarMonth } from 'src/models/calendar/calendarMonth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'TimeTrackerAngularRedux';

  calendarConfig = new DefaultCalendarConfig();
  calendarModel: CalendarMonth;
  private selectedDays: moment.Moment[];

  constructor(){
    this.calendarModel = new CalendarMonth(this.calendarConfig);
  }

  monthChangeHandler(monthMoment: moment.Moment) {
    console.log('month', monthMoment.month())
    this.calendarModel = new CalendarMonth(this.calendarConfig, monthMoment, null, this.selectedDays);
  }

  daySelectHandler(day: moment.Moment) {
    this.selectedDays = [day]
    console.log('day', day.date())
  }

  daysSelectHandler(days: moment.Moment[]) {
    this.selectedDays = days;
    console.log('days', days.length);
  }
}
