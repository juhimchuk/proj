import * as moment from 'moment';
import * as _ from 'lodash';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';
import { CalendarType } from './enums/calendarType';

export class CalendarDate {
  date: moment.Moment;
  isSelected: boolean;
  isToday: boolean;
  isCurent: boolean;
  isDisabled: boolean;
  isHide: boolean;
  isWeekend: boolean;

  htmlTooltip: string;
  tooltipString: string;

  constructor(date: moment.Moment = moment(), currentMoment: moment.Moment, config: ICalendarConfig, isSelected?: boolean, tooltip?: string) {
    this.date = date;
    this.isToday = moment().isSame(date, 'day');
    this.isCurent = moment(date).isSame(currentMoment, config.calendar.calendarType);
    if (config.calendar.calendarType == CalendarType.Year) {
      this.isCurent = this.isCurent && moment(date).isSame(currentMoment, 'month');
    }
    this.isHide = config.calendar.isHideExtaDates && !this.isCurent;
    this.isSelected = isSelected;
    this.isDisabled = this.isDayDisabled(config.calendar.isBlockFutureDays);
    this.isWeekend = this.date.weekday() > 4;
    
    this.htmlTooltip = tooltip;
  }

  public getClasses(config: ICalendarConfig): string {
    const result: string[] = [config.day.cellClass]
    result.push(this.isSelected && !this.isHide ? config.day.selectClass : '');
    result.push(this.isDisabled ? config.day.disableClass : '');
    result.push(this.isCurent ? '' : config.day.irrelevantClass);
    result.push(this.isToday ? config.day.currentClass : '');
    result.push(config.calendar.isHideWeekend && this.isWeekend ? config.calendar.hideClass : '');
    return result.join(' ');
  }

  private isDayDisabled(isFutureDaysDisabled: boolean): boolean {
    const isFutureDay = isFutureDaysDisabled && moment(this.date).isAfter(moment())
    return this.isHide || isFutureDay;
  }
}