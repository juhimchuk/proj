import { Component } from '@angular/core';
import * as moment from 'moment';
import { DefaultCalendarConfig } from 'src/modules/calendars/config/defaultCalendar.config';
import { CalendarMonth } from 'src/models/calendar/calendarMonth';
import { SelectMode } from 'src/models/calendar/enums/selectMode';
import { CalendarModel } from 'src/models/calendar/calendarModel';
import { CalendarType } from 'src/models/calendar/enums/calendarType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'TimeTrackerAngularRedux';

  calendarConfig = new DefaultCalendarConfig();
  calendarModel: CalendarModel;
  private selectedDays: moment.Moment[];

  constructor(){
    this.calendarModel = new CalendarModel(this.calendarConfig);
  }

  monthChangeHandler(monthMoment: moment.Moment) {
    console.log('year', monthMoment.year(), 'month', monthMoment.month(), 'week', monthMoment.week())
    this.calendarModel = new CalendarModel(this.calendarConfig, monthMoment, null, this.selectedDays);
  }

  daySelectHandler(day: moment.Moment) {
    this.selectedDays = [day]
    console.log('day', day.date())
  }

  daysSelectHandler(days: moment.Moment[]) {
    this.selectedDays = days;
    console.log('days', days.length);
  }

  private _calendarTypes = CalendarType;
  test(type: CalendarType){
    this.calendarConfig.calendar.calendarType = type;
    this.calendarModel = new CalendarModel(this.calendarConfig);
  }
}
