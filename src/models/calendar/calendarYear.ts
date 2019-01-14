import * as _ from 'lodash';
import { CalendarMonth } from './calendarMonth';
import { CalendarDate } from './calendarDate';

export class CalendarYear {
    months: CalendarMonth[] = [];
    firstDay: CalendarDate;
    index: number;

    constructor(months?: CalendarMonth[]) {
        if (months.length > 1) {
            this.months = months;
            this.firstDay = _.first(months).firstDay;
            this.index = this.firstDay.date.year();
        }
    }
}