import { CalendarDate } from './calendarDate';

export class CalendarWeek {
    dates: CalendarDate[] = [];
    firstDay: CalendarDate;
    lastDay: CalendarDate;

    constructor(dates?: CalendarDate[]) {
        if (dates.length > 1) {
            this.dates = dates;
            this.firstDay = dates[0];
            this.lastDay = dates[dates.length - 1]
        }
    }
}