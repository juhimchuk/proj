import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { CalendarWeek } from 'src/models/calendar/calendarWeek';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import { SelectDayEvent } from 'src/models/calendar/enums/selectDayEvent';
import { EventEmitterModel } from 'src/models/calendar/eventEmitterModel';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';

@Component({
    selector: 'calendar-week-row',
    templateUrl: './calendar-week-row.component.html'
})
export class CalendarWeekRowComponent {
    @Input() readonly weekModel: CalendarWeek;
    @Input() readonly config: ICalendarConfig;
    @Input() readonly selectMode: boolean;

    @Output() onSelectDay: EventEmitter<EventEmitterModel<CalendarDate>> = new EventEmitter();

    constructor() { }

    // Drag select section
    mouseDownHandler(day: CalendarDate): void{
        if (!day.isDisabled && !this.selectMode) {
            const eventModel = new EventEmitterModel({ type: SelectDayEvent.InitSelect, data: day });
            this.onSelectDay.emit(eventModel);
        }
    }

    mouseOverHandler(day: CalendarDate): void{
        if (!day.isDisabled && this.selectMode) {
            const eventModel = new EventEmitterModel({ type: SelectDayEvent.Select, data: day });
            this.onSelectDay.emit(eventModel);
        }
    }

    mouseUpHandler(day: CalendarDate): void{
        if (this.selectMode) {
            const eventModel = new EventEmitterModel({ type: SelectDayEvent.FinishDragSelect, data: day });
            this.onSelectDay.emit(eventModel);
        }
    }
}