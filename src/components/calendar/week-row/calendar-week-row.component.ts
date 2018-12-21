import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { CalendarWeek } from 'src/models/calendar/calendarWeek';

@Component({
    selector: 'calendar-week-row',
    templateUrl: './calendar-week-row.component.html'
})
export class CalendarWeekRowComponent{
    @Input() weekModel: CalendarWeek;
}