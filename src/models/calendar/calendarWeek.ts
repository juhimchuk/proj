import { CalendarDate } from './calendarDate';

export class CalendarWeek {
    dates: CalendarDate[] = [];
    firstDay: CalendarDate;
    lastDay: CalendarDate;
    index: number;
    isHide: boolean;

    constructor(dates?: CalendarDate[]) {
        if (dates.length > 1) {
            this.dates = dates;
            this.firstDay = dates.first();
            this.lastDay = dates.last();
            this.index = this.firstDay.date.week();
            this.isHide = !this.firstDay.isCurentMonth && !this.lastDay.isCurentMonth;
        }
    }
}