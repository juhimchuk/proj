import * as moment from 'moment';
import { SelectMode } from 'src/models/calendar/enums/selectMode';

export class CalendarConfig {
    day: CalendarDayConfig = new CalendarDayConfig();
    month: CalendarMonthConfig = new CalendarMonthConfig();
    week: CalendarWeekConfig = new CalendarWeekConfig();
    calendar: CalendarFrameworkConfig = new CalendarFrameworkConfig();
    momentSettings: moment.Moment = this.getMomentCustomConfig();

    private getMomentCustomConfig(): moment.Moment {
        moment.updateLocale('en', {
            weekdaysMin: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            week: { dow: 1, doy: 4 }
        });
        moment().startOf('week').isoWeekday(1);
        return moment();
    }
}

class CalendarDayConfig {
    cellClass: string = "col-sm-1 day-cell";
    disableClass: string = "day-disable";
    currentClass: string = "day-current";
    selectClass: string = "day-select";
    irrelevantClass: string = "day-irrelevant";
    hideDayClass: string = "day-hide";
}

class CalendarMonthConfig {
    headerClass: string = "";
    bodyClass: string = "col-sm-7 month-body";
    switchrowClass: string = "row col-sm-7";
    switchClass: string = "col-sm-2 day-cell";
    titleClass: string = "row col-sm-1 month-title";
}

class CalendarWeekConfig {
    nameClass: string = "col-sm-1  day-cell";
    rowClass: string = "col-sm-7 week-row";
    extaRowClass: string = "";
}

class CalendarFrameworkConfig {
    bodyClass: string = "noselect";
    isSelecteble: boolean = true;
    isBlockFutureDays: boolean = false;
    isHideExtaDates: boolean = false;
    isHideWeekend: boolean = false;
    SelectMode: SelectMode = 1;
}