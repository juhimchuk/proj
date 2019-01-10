import { Component, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CalendarMonth } from 'src/models/calendar/calendarMonth';
import { CalendarConfig } from '../config/calendar.config';
import { ChangeMonthEvent } from 'src/models/calendar/enums/changeMonthEvent';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import { EventEmitterModel } from 'src/models/calendar/eventEmitterModel';
import { SelectDayEvent } from 'src/models/calendar/enums/selectDayEvent';
import { SelectMode } from 'src/models/calendar/enums/selectMode';

@Component({
  selector: 'calendar-day-report',
  templateUrl: './calendar-day-report.component.html',
  styleUrls: ['./calendar-day-report.component.less'],
  providers: [CalendarConfig]
})

export class CalendarDayReportComponent {
  @Output() onSelectDays: EventEmitter<CalendarDate[]> = new EventEmitter();
  @Output() onSelectDay: EventEmitter<CalendarDate> = new EventEmitter();

  currentMoment: moment.Moment = this.config.momentSettings;
  calendarModel: CalendarMonth;

  selectMode: boolean;
  selectedDays: CalendarDate[] = [];

  constructor(private config: CalendarConfig) {
    this.initCalendarModel();
  }

  changeMonthHandler(changeType: ChangeMonthEvent) {
    switch (changeType) {
      case ChangeMonthEvent.Current: {
        this.currentMoment = this.config.momentSettings;
        break;
      }
      default: {
        this.currentMoment = moment(this.currentMoment).add(changeType, 'months');
        break;
      }
    }
    this.initCalendarModel();
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
      default: {
        break;
      }
    }
  }

  mouseLeaveHandler(): void {
    if (this.selectMode) {
      this.finishDragSelect();
    }
  }

  private initCalendarModel(): void {
    this.calendarModel = new CalendarMonth(this.currentMoment, this.config, this.selectedDays);
  }

  //#region Select region.
  private initDragSelect(day: CalendarDate): void {
    this.getClearSelectedDays(this.selectedDays);
    day.isSelected = true;
    this.selectedDays = [day];
    if (this.config.calendar.SelectMode == SelectMode.Multi) {
      this.selectMode = true;
    }
  }

  private dragSelect = (day: CalendarDate): void => {
    if (this.config.calendar.SelectMode == SelectMode.Multi) {
      this.selectedDays = this.getClearSelectedDays(this.selectedDays, 0);
      var selected = this.getSelectedDaysBetween(this.selectedDays, day);
      this.selectedDays.concat(selected)
    }
  }

  private finishDragSelect(day?: CalendarDate): void {
    switch (this.config.calendar.SelectMode) {
      case SelectMode.Single: {
        this.onSelectDay.emit(this.selectedDays[0]);
        break;
      }
      case SelectMode.Multi: {
        this.onSelectDays.emit(this.selectedDays);
        break;
      }
    }
    this.selectMode = false;
  }

  private getClearSelectedDays(list: CalendarDate[], exceptIndex?: number): CalendarDate[] {
    list.forEach((day, index) => day.isSelected = false);

    const exceptDay = list[exceptIndex];
    if (exceptDay && this.config.calendar.SelectMode == SelectMode.Multi) {
      exceptDay.isSelected = true;
      list = [exceptDay];
    } else {
      list = []
    }
    return list;
  }

  private getSelectedDaysBetween(selectList: CalendarDate[], selectedDay: CalendarDate): CalendarDate[] {
    const initDay = _.head(selectList);
    const daysDifference = selectedDay.date.diff(initDay.date, 'days');
    const daysToSelect = this.getDaysToSelect(this.calendarModel, initDay, daysDifference);
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