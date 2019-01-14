import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';
import { SwitchTypeEvent } from 'src/models/calendar/enums/switchTypeEvent';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';
import { SwitchMode } from 'src/models/calendar/enums/switchMode';

@Component({
  selector: 'calendar-header',
  templateUrl: './calendar-header.component.html'
})

export class CalendarHeaderComponent {
  private readonly _switchTypes = SwitchTypeEvent;
  private readonly _switchModes = SwitchMode;

  @Input() config: ICalendarConfig;

  @Output() onClick: EventEmitter<SwitchTypeEvent> = new EventEmitter();

  private clickHandler(clickEventType: SwitchTypeEvent): void {
    this.onClick.emit(clickEventType);
  }
}