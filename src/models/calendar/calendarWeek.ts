import { CalendarDate } from './calendarDate';
import * as _ from 'lodash';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';

export class CalendarWeek {
    dates: CalendarDate[] = [];
    firstDay: CalendarDate;
    lastDay: CalendarDate;
    index: number;
    isHide: boolean;

    constructor(dates?: CalendarDate[]) {
        if (dates.length > 1) {
            this.dates = dates;
            this.firstDay = _.first(dates);
            this.lastDay = dates.last();
            this.index = this.firstDay.date.week();
            this.isHide = !this.firstDay.isCurent && !this.lastDay.isCurent;
        }
    }

    public getClasses(config: ICalendarConfig): string {
        var result: string[] = [config.week.rowClass];
        result.push(this.isHide ? config.calendar.hideClass : '');
        return result.join(' ');
    }
}