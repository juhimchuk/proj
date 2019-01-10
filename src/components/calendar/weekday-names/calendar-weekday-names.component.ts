import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CalendarConfig } from 'src/modules/calendars/config/calendar.config';

@Component({
    selector: 'calendar-weekdays',
    templateUrl: './calendar-weekday-names.component.html'
})
export class CalendarWeekDayNamesComponent {
    @Input() config: CalendarConfig;

    weekdays: string[] = moment.weekdaysMin();

    constructor(){
    }

    private getClasses(index: number): string {
        const result: string[] = [this.config.week.nameClass];
        const isWeekend = index > 4;
        result.push(this.config.calendar.isHideWeekend && isWeekend ? this.config.day.hideDayClass : '');
        return result.join(' ');
    }
}