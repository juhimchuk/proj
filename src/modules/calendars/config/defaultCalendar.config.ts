import * as moment from 'moment';
import { SelectMode } from 'src/models/calendar/enums/selectMode';
import { BlockMode } from 'src/models/calendar/enums/blockMode';
import { ICalendarConfig, ICalendarDayConfig, ICalendarMonthConfig, ICalendarWeekConfig, ICalendarFrameworkConfig } from './ICalendar.config';
import { CalendarType } from 'src/models/calendar/enums/calendarType';
import { SwitchMode } from 'src/models/calendar/enums/switchMode';

export class DefaultCalendarConfig implements ICalendarConfig {
    day: ICalendarDayConfig = new CalendarDayConfig();
    month: ICalendarMonthConfig = new CalendarMonthConfig();
    week: ICalendarWeekConfig = new CalendarWeekConfig();
    calendar: ICalendarFrameworkConfig = new CalendarFrameworkConfig();
    momentSettings: moment.Moment = this.getMomentCustomConfig();

    private getMomentCustomConfig(): moment.Moment {
        moment.updateLocale('en', {
            weekdaysMin: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            weekdaysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            week: { dow: 1, doy: 7 }
        });
        return moment();
    }
}

class CalendarDayConfig implements ICalendarDayConfig {
    cellClass: string = "col-sm-1 day-cell";
    disableClass: string = "day-disable";
    currentClass: string = "day-current";
    selectClass: string = "day-select";
    irrelevantClass: string = "day-irrelevant";
}

class CalendarMonthConfig implements ICalendarMonthConfig {
    bodyClass: string = "col-sm-7 month-body";
}

class CalendarWeekConfig implements ICalendarWeekConfig {
    nameRowClass: string = "col-sm-7 week-row";
    nameCellClass: string = "col-sm-1 day-cell week-name-cell";
    rowClass: string = "col-sm-7 week-row";
    extaRowClass: string = "";
}

class CalendarFrameworkConfig implements ICalendarFrameworkConfig {
    headerClass: string = "calendar-header";
    headerContentClass: string = "noselect";
    bodyClass: string = "col-sm-7 calendar-body noselect";
    footerClass: string = "calendar-footer";
    hideClass: string = "hide";
    switchClass: string = "col-sm-2 day-cell noselect";

    calendarType: CalendarType = CalendarType.Week;

    switchMode: SwitchMode = SwitchMode.Default;
    selectMode: SelectMode = SelectMode.Multi;
    blockMode: BlockMode = BlockMode.AfterToday;

    isHideExtaDates: boolean = true;
    isHideWeekend: boolean = false;
    isBlockFutureDays: boolean = this.blockMode == BlockMode.None;
    isSelecteble: boolean = this.selectMode != SelectMode.None;
}