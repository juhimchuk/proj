import * as moment from 'moment';
import * as _ from 'lodash';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';

export class CalendarDate {
  date: moment.Moment;
  isSelected: boolean;
  isToday: boolean;
  isCurentMonth: boolean;
  isDisabled: boolean;
  isHide: boolean;
  isWeekend: boolean;

  constructor(date: moment.Moment = moment(), currentMoment: moment.Moment, config: ICalendarConfig, isSelected?: boolean ) {
    this.date = date;
    this.isToday = moment().isSame(date, 'day');
    this.isCurentMonth = moment(date).isSame(currentMoment, 'month');
    this.isSelected = isSelected;
    this.isHide = config.calendar.isHideExtaDates && !this.isCurentMonth;
    this.isDisabled = this.isDayDisabled(config.calendar.isBlockFutureDays);
    this.isWeekend = this.date.weekday() > 4;
  }

  private isDayDisabled(isFutureDaysDisabled: boolean): boolean {
    const isFutureDay = isFutureDaysDisabled && moment(this.date).isAfter(moment())
    return this.isHide || isFutureDay;
  }
}