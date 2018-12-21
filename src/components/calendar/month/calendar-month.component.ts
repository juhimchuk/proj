import { Component } from '@angular/core';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CalendarWeek } from 'src/models/calendar/calendarWeek';

@Component({
  selector: 'calendar-month',
  templateUrl: './calendar-month.component.html'
})
export class CalendarMonthComponent {
  title = 'TimeTrackerAngularRedux';
  date: CalendarDate= new CalendarDate(moment());
  dates: CalendarWeek[] = this.splitByWeeks(moment());

  getDates(currentMoment: moment.Moment): CalendarDate[] {
    console.log(currentMoment)
    const firstOfMonth = moment(currentMoment).startOf('month').day()-1;
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const day = moment(firstDayOfGrid).date(date);
              return new CalendarDate(day);
            });
  }

  splitByWeeks(currentMoment: moment.Moment): CalendarWeek[]{
    const monthDays = this.getDates(currentMoment);
    return _.chunk(monthDays, 7).map(dayList => { return new CalendarWeek(dayList) });
  }
}