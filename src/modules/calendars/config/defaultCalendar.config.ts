import * as moment from 'moment';
import { SelectMode } from 'src/models/calendar/enums/selectMode';
import { BlockMode } from 'src/models/calendar/enums/blockMode';
import { ICalendarConfig, ICalendarDayConfig, ICalendarMonthConfig, ICalendarWeekConfig, ICalendarFrameworkConfig } from './ICalendar.config';

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

class CalendarMonthConfig implements ICalendarMonthConfig{
    headerClass: string = "";
    bodyClass: string = "col-sm-7 month-body";
    switchrowClass: string = "row col-sm-7";
    switchClass: string = "col-sm-2 day-cell";
    titleClass: string = "row col-sm-1 month-title";
}

class CalendarWeekConfig implements ICalendarWeekConfig {
    nameClass: string = "col-sm-1  day-cell";
    rowClass: string = "col-sm-7 week-row";
    extaRowClass: string = "";
}

class CalendarFrameworkConfig implements ICalendarFrameworkConfig {
    bodyClass: string = "noselect";
    hideClass: string = "hide";
    
    isHideExtaDates: boolean = true;
    isHideWeekend: boolean = false;
    SelectMode: SelectMode = SelectMode.Multi;
    BlockMode: BlockMode = BlockMode.AfterToday;

    isBlockFutureDays: boolean = this.BlockMode == BlockMode.AfterToday;
    isSelecteble: boolean = this.SelectMode != SelectMode.None;
}