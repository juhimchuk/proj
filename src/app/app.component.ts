import { Component } from '@angular/core';
import * as moment from 'moment';
import { DefaultCalendarConfig } from 'src/modules/calendars/config/defaultCalendar.config';
import { CalendarModel } from 'src/models/calendar/calendarModel';
import { CalendarType } from 'src/models/calendar/enums/calendarType';
import { EmployeeStatisticService } from 'src/services/apiServices/employeeStatistic/employee-statistic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [EmployeeStatisticService]
})
export class AppComponent {
  title = 'TimeTrackerAngularRedux';

  calendarConfig = new DefaultCalendarConfig();
  calendarModel: CalendarModel;
  selectedDays: moment.Moment[] = [moment()];

  constructor(private statisticService: EmployeeStatisticService) {
    this.calendarModel = new CalendarModel(this.calendarConfig);

    this.statisticService.getEmployeeStatisticByWeek(moment()).subscribe((model) => { 
      console.log(model) 
    })

    this.statisticService.getEmployeeStatisticByMonth(moment().subtract(1, 'month')).subscribe((model) => { 
      console.log(model) 
    })
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
  test(type: CalendarType) {
    this.calendarConfig.calendar.calendarType = type;
    this.calendarModel = new CalendarModel(this.calendarConfig);
  }
}
