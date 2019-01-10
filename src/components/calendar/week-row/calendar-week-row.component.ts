import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { CalendarWeek } from 'src/models/calendar/calendarWeek';
import { CalendarConfig } from 'src/modules/calendars/config/calendar.config';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import { SelectDayEvent } from 'src/models/calendar/enums/selectDayEvent';
import { EventEmitterModel } from 'src/models/calendar/eventEmitterModel';

@Component({
    selector: 'calendar-week-row',
    templateUrl: './calendar-week-row.component.html'
})
export class CalendarWeekRowComponent {
    @Input() weekModel: CalendarWeek;
    @Input() config: CalendarConfig;
    @Input() selectMode: boolean;

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
        if (!day.isDisabled && this.selectMode) {
            const eventModel = new EventEmitterModel({ type: SelectDayEvent.FinishDragSelect, data: day });
            this.onSelectDay.emit(eventModel);
        }
    }

    protected getDayClasses(day: CalendarDate): string {
        const result: string[] = [this.config.day.cellClass]
        result.push(day.isSelected && !day.isHideDate ? this.config.day.selectClass : '');
        result.push(day.isDisabled ? this.config.day.disableClass : '');
        result.push(this.config.calendar.isHideWeekend && day.isWeekend ? this.config.day.hideDayClass : '');
        return result.join(' ');
    }
}