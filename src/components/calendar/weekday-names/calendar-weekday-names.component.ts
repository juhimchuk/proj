import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';

@Component({
    selector: 'calendar-weekdays',
    templateUrl: './calendar-weekday-names.component.html'
})
export class CalendarWeekDayNamesComponent {
    @Input() config: ICalendarConfig;

    weekdays: string[] = moment.weekdaysMin();

    constructor(){
    }

    private getClasses(index: number): string {
        const result: string[] = [this.config.week.nameCellClass];
        result.push(this.config.day.disableClass);
        const isWeekend = index > 4;
        result.push(this.config.calendar.isHideWeekend && isWeekend ? this.config.calendar.hideClass : '');
        return result.join(' ');
    }
}