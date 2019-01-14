import { CalendarWeek } from './calendarWeek';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CalendarDate } from './calendarDate';

export class CalendarMonth {
    index: number;
    name: string;
    firstDay: CalendarDate;
    weeks: CalendarWeek[] = [];

    public constructor(weeks?: CalendarWeek[]) {
        this.firstDay = _.first(weeks).dates.find((day) => day.isCurent);
        this.index = this.firstDay.date.month();
        this.name = moment(this.index + 1, 'M').format('MMMM');
        this.weeks = weeks;
    }
}