import * as moment from 'moment';
import * as _ from 'lodash';

export class CalendarDate {
  date: moment.Moment;
  isSelected: boolean;
  isToday: boolean;
  isCurentMonth: boolean;
  isDisabled: boolean;
  isHideDate: boolean;
  isWeekend: boolean;

  constructor(date: moment.Moment = moment(), currentMoment: moment.Moment, isSelected?: boolean, isHideExtaDays?: boolean, isFutureDaysDisabled?: boolean) {
    this.date = date;
    this.isToday = moment().isSame(date, 'day');
    this.isCurentMonth = moment(date).isSame(currentMoment, 'month');
    this.isSelected = isSelected;
    this.isHideDate = isHideExtaDays && !this.isCurentMonth;
    this.isDisabled = this.isDayDisabled(isFutureDaysDisabled);
    this.isWeekend = this.date.weekday() > 4;
  }

  private isDayDisabled(isFutureDaysDisabled: boolean): boolean {
    const isFutureDay = isFutureDaysDisabled && moment(this.date).isAfter(moment())
    return this.isHideDate || isFutureDay;
  }
}