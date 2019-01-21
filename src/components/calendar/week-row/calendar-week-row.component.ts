import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { CalendarWeek } from 'src/models/calendar/calendarWeek';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import { SelectDayEventType } from 'src/models/calendar/enums/selectDayEventType';
import { EventEmitterModel } from 'src/models/calendar/eventEmitterModel';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';

@Component({
    selector: 'calendar-week-row',
    templateUrl: './calendar-week-row.component.html'
})
export class CalendarWeekRowComponent {
    @Input() readonly weekModel: CalendarWeek;
    @Input() readonly config: ICalendarConfig;
    @Input() readonly isSelectMode: boolean;

    @Output() onSelectDay: EventEmitter<EventEmitterModel<CalendarDate>> = new EventEmitter();
    @Output() onHoverDay: EventEmitter<CalendarDate> = new EventEmitter();

    constructor() { }

    // Drag select section
    mouseDownHandler(day: CalendarDate): void{
        if (!day.isDisabled && !this.isSelectMode) {
            const eventModel = new EventEmitterModel({ type: SelectDayEventType.InitSelect, data: day });
            this.onSelectDay.emit(eventModel);
        }
    }

    mouseOverHandler(day: CalendarDate): void{
        this.onHoverDay.emit(day);
        if (!day.isDisabled && this.isSelectMode) {
            const eventModel = new EventEmitterModel({ type: SelectDayEventType.Select, data: day });
            this.onSelectDay.emit(eventModel);
        }
    }

    mouseUpHandler(day: CalendarDate): void{
        if (this.isSelectMode) {
            const eventModel = new EventEmitterModel({ type: SelectDayEventType.FinishDragSelect, data: day });
            this.onSelectDay.emit(eventModel);
        }
    }

    mouseLeaveHandler(){
        this.onHoverDay.emit();
    }
}