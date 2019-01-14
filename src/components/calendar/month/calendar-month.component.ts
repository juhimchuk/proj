import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarMonth } from 'src/models/calendar/calendarMonth';
import { SwitchTypeEvent } from 'src/models/calendar/enums/switchTypeEvent';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import { EventEmitterModel } from 'src/models/calendar/eventEmitterModel';
import { SelectDayEvent } from 'src/models/calendar/enums/selectDayEvent';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';
import { CalendarWeek } from 'src/models/calendar/calendarWeek';

@Component({
  selector: 'calendar-month',
  templateUrl: './calendar-month.component.html'
})

export class CalendarMonthComponent {
  private readonly _changeTypes = SwitchTypeEvent;

  @Input() monthModel: CalendarMonth;
  @Input() config: ICalendarConfig;
  @Input() selectMode: boolean;

  @Output() onChangeMonth: EventEmitter<SwitchTypeEvent> = new EventEmitter();
  @Output() onSelectDay: EventEmitter<EventEmitterModel<CalendarDate>> = new EventEmitter();

  changeMonth(changeType: SwitchTypeEvent): void {
    this.onChangeMonth.emit(changeType);
  }

  selectDayHandler(event: EventEmitterModel<CalendarDate>): void {
    this.onSelectDay.emit(event);
    if (!event.data.isCurent && event.type != SelectDayEvent.Select && event.type != SelectDayEvent.FinishDragSelect) {
      this.checkCurrentMonth(event.data);
    }
  }

  private checkCurrentMonth(day: CalendarDate): void {
    const isMonthAfter = moment(day.date).isAfter(this.monthModel.firstDay.date, "month");
    const eventType = isMonthAfter ? SwitchTypeEvent.Next : SwitchTypeEvent.Previous;
    this.onChangeMonth.emit(eventType);
  }
}