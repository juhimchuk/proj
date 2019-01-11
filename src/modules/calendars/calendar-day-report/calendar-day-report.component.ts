import { Component, Output, EventEmitter, HostListener, Input } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CalendarMonth } from 'src/models/calendar/calendarMonth';
import { ChangeMonthEvent } from 'src/models/calendar/enums/changeMonthEvent';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import { EventEmitterModel } from 'src/models/calendar/eventEmitterModel';
import { SelectDayEvent } from 'src/models/calendar/enums/selectDayEvent';
import { SelectMode } from 'src/models/calendar/enums/selectMode';
import { ICalendarConfig } from '../config/ICalendar.config';

@Component({
  selector: 'calendar-day-report',
  templateUrl: './calendar-day-report.component.html',
  styleUrls: ['./calendar-day-report.component.less']
})

export class CalendarDayReportComponent {
  @Input() config: ICalendarConfig;
  @Input() model: CalendarMonth;

  @Output() onSelectDays: EventEmitter<moment.Moment[]> = new EventEmitter();
  @Output() onSelectDay: EventEmitter<moment.Moment> = new EventEmitter();
  @Output() onChangeMonth: EventEmitter<moment.Moment> = new EventEmitter();

  selectMode: boolean;

  changeMonthHandler(changeType: ChangeMonthEvent) {
    if (this.config.calendar.SelectMode != SelectMode.None && this.selectMode) {
      this.finishDragSelect();
    }
    switch (changeType) {
      case ChangeMonthEvent.Current: {
        this.model.currentMoment = this.config.momentSettings;
        break;
      }
      case ChangeMonthEvent.Next:
      case ChangeMonthEvent.Previous: {
        this.model.currentMoment = moment(this.model.currentMoment).add(changeType, 'months');
        break;
      }
    }
    this.onChangeMonth.emit(this.model.currentMoment);
  }

  selectDaysHandler(event: EventEmitterModel<CalendarDate>) {
    switch (event.type) {
      case SelectDayEvent.InitSelect: {
        this.initDragSelect(event.data);
        break;
      }
      case SelectDayEvent.Select: {
        this.dragSelect(event.data);
        break;
      }
      case SelectDayEvent.FinishDragSelect: {
        this.finishDragSelect(event.data);
        break;
      }
    }
  }

  @HostListener('document:mouseup', ['$event']) private mouseUpHandler() {
    if (this.selectMode) {
        this.finishDragSelect();
    }
  }

  

  //#region Select region.
  private initDragSelect(day: CalendarDate): void {
    this.model.clearSelectedDays();
    if (!this.config.calendar.isSelecteble) {
      return;
    }
    day.isSelected = true;
    this.model.selectedDays = [day];
    this.selectMode = true;
  }

  private dragSelect = (day: CalendarDate): void => {
    if (this.config.calendar.SelectMode == SelectMode.Multi) {
      this.model.selectedDays = this.model.clearSelectedDays(0);
      var selected = this.getSelectedDaysBetween(this.model.selectedDays, day);
      this.model.selectedDays.concat(selected)
    } else {
      this.initDragSelect(day);
    }
  }

  private finishDragSelect(day?: CalendarDate): void {
    switch (this.config.calendar.SelectMode) {
      case SelectMode.Single: {
        this.onSelectDay.emit(this.model.selectedDays.first().date);
        break;
      }
      case SelectMode.Multi: {
        var selectedDates = _.map(this.model.selectedDays, (day: CalendarDate): moment.Moment => {
          return day.date;
        });
        selectedDates = _.sortBy(selectedDates, (day) => day.format() );
        this.onSelectDays.emit(selectedDates);
        break;
      }
    }
    this.selectMode = false;
  }

  private getSelectedDaysBetween(selectList: CalendarDate[], selectedDay: CalendarDate): CalendarDate[] {
    const initDay = _.head(selectList);
    const daysDifference = selectedDay.date.diff(initDay.date, 'days');
    const daysToSelect = this.getDaysToSelect(this.model, initDay, daysDifference);
    daysToSelect.forEach((day) => {
      selectList.pushUniq(day);
      day.isSelected = true;
    })
    return daysToSelect;
  }

  private getDaysToSelect(model: CalendarMonth, startDay: CalendarDate, daysDifference: number, resultArray: CalendarDate[] = []): CalendarDate[] {
    if (Math.abs(daysDifference) == 0) {
      return resultArray;
    }
    const MathAct = daysDifference > 0 ? 1 : -1;
    const nearDayDate = moment(startDay.date).add(MathAct, 'day');
    const focusWeek = model.weeks.find((week) => week.index == nearDayDate.week());
    const nearDay = focusWeek.dates.find((day) => day.date.isSame(nearDayDate));
    if (nearDay.isCurentMonth) {
      resultArray.pushUniq(nearDay);
    }
    daysDifference > 0 ? daysDifference-- : daysDifference++;
    return this.getDaysToSelect(model, nearDay, daysDifference, resultArray);
  }
  //#endregion
}