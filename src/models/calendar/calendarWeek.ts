import { CalendarDate } from './calendarDate';

export class CalendarWeek {
    dates: CalendarDate[] = [];
    firstDay: CalendarDate;
    lastDay: CalendarDate;
    index: number;
    isHideWeek: boolean;

    constructor(dates?: CalendarDate[]) {
        if (dates.length > 1) {
            this.dates = dates;
            this.firstDay = dates[0];
            this.lastDay = dates[dates.length - 1];
            this.index = this.firstDay.date.week();
            this.isHideWeek = this.firstDay.isHideDate && this.lastDay.isHideDate;
        }
    }
}