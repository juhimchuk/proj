import { Component, Output, EventEmitter, HostListener, Input } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CalendarMonth } from 'src/models/calendar/calendarMonth';
import { SwitchTypeEvent } from 'src/models/calendar/enums/switchTypeEvent';
import { CalendarDate } from 'src/models/calendar/calendarDate';
import { EventEmitterModel } from 'src/models/calendar/eventEmitterModel';
import { SelectDayEvent } from 'src/models/calendar/enums/selectDayEvent';
import { SelectMode } from 'src/models/calendar/enums/selectMode';
import { CalendarType } from 'src/models/calendar/enums/calendarType';
import { CalendarModel } from 'src/models/calendar/calendarModel';
import { CalendarWeek } from 'src/models/calendar/calendarWeek';
import { CalendarYear } from 'src/models/calendar/calendarYear';

@Component({
  selector: 'calendar',
  templateUrl: './calendar-manager.component.html',
  styleUrls: ['./calendar-manager.component.less']
})

export class CalendarManagerComponent {
  private readonly _calendarTypes = CalendarType;

  @Input() model: CalendarModel;

  @Output() onSelectDays: EventEmitter<moment.Moment[]> = new EventEmitter();
  @Output() onSelectDay: EventEmitter<moment.Moment> = new EventEmitter();
  @Output() onChangeCalendar: EventEmitter<moment.Moment> = new EventEmitter();

  private selectMode: boolean;

  clickCalendarChangeHandler(changeType: SwitchTypeEvent) {
    if (this.model.config.calendar.selectMode != SelectMode.None && this.selectMode) {
      this.finishDragSelect();
    }
    switch (changeType) {
      case SwitchTypeEvent.Center: {
        this.model.currentMoment = this.model.config.momentSettings;
        break;
      }
      case SwitchTypeEvent.Next:
      case SwitchTypeEvent.Previous: {

        this.model.currentMoment = moment(this.model.currentMoment).add(changeType, this.model.config.calendar.calendarType);
        break;
      }
    }
    this.onChangeCalendar.emit(this.model.currentMoment);
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
    if (!this.model.config.calendar.isSelecteble) {
      return;
    }
    day.isSelected = true;
    this.model.selectedDays = [day];
    this.selectMode = true;
  }

  private dragSelect = (day: CalendarDate): void => {
    if (this.model.config.calendar.selectMode == SelectMode.Multi) {
      this.model.selectedDays = this.model.clearSelectedDays(0);
      var selected = this.getSelectedDaysBetween(this.model.selectedDays, day);
      this.model.selectedDays.concat(selected)
    } else {
      this.initDragSelect(day);
    }
  }

  private finishDragSelect(day?: CalendarDate): void {
    switch (this.model.config.calendar.selectMode) {
      case SelectMode.Single: {
        this.onSelectDay.emit(_.first(this.model.selectedDays).date);
        break;
      }
      case SelectMode.Multi: {
        var selectedDates = _.map(this.model.selectedDays, (day: CalendarDate): moment.Moment => {
          return day.date;
        });
        selectedDates = _.sortBy(selectedDates, (day) => day.format());
        this.onSelectDays.emit(selectedDates);
        break;
      }
    }
    this.selectMode = false;
  }

  private getSelectedDaysBetween(selectList: CalendarDate[], selectedDay: CalendarDate): CalendarDate[] {
    const initDay = _.first(selectList);
    const daysDifference = selectedDay.date.diff(initDay.date, 'days');
    const daysToSelect = this.getDaysToSelect(this.model.data as CalendarYear | CalendarWeek | CalendarMonth, initDay, daysDifference);
    daysToSelect.forEach((day) => {
      selectList.pushUniq(day);
      day.isSelected = true;
    })
    return daysToSelect;
  }

  private getDaysToSelect(model: CalendarYear | CalendarMonth | CalendarWeek, startDay: CalendarDate, daysDifference: number, resultArray: CalendarDate[] = []): CalendarDate[] {
    if (Math.abs(daysDifference) == 0) {
      return resultArray;
    }
    const MathAct = daysDifference > 0 ? 1 : -1;
    const nearDayDate = moment(startDay.date).add(MathAct, 'day');
    const focusMonth = model instanceof CalendarMonth
      ? model as CalendarMonth
      : this.getMonthToSelect(model as CalendarYear, nearDayDate);
    const focusWeek = model instanceof CalendarWeek
      ? model as CalendarWeek 
      : this.getWeekToSelect(focusMonth, nearDayDate);
    const nearDay = focusWeek.dates.find((day) => day.date.isSame(nearDayDate));
    if (nearDay.isCurent) {
      resultArray.pushUniq(nearDay);
    }
    daysDifference > 0 ? daysDifference-- : daysDifference++;
    return this.getDaysToSelect(model, nearDay, daysDifference, resultArray);
  }

  private getWeekToSelect(model: CalendarMonth, nearDayDate: moment.Moment): CalendarWeek {
    return model.weeks.find((week) => week.index == nearDayDate.week());
  }

  private getMonthToSelect(model: CalendarYear, nearDayDate: moment.Moment): CalendarMonth {
    return model.months.find((month) => month.index == nearDayDate.month());
  }
  //#endregion
}