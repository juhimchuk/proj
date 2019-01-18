import * as moment from 'moment';
import { SelectMode } from 'src/models/calendar/enums/selectMode';
import { BlockMode } from 'src/models/calendar/enums/blockMode';
import { CalendarType } from 'src/models/calendar/enums/calendarType';
import { SwitchMode } from 'src/models/calendar/enums/switchMode';

export interface ICalendarConfig {
    day: ICalendarDayConfig;
    month: ICalendarMonthConfig;
    week: ICalendarWeekConfig;
    calendar: ICalendarFrameworkConfig;
    momentSettings: moment.Moment;
}

export interface ICalendarDayConfig {
    cellClass: string;
    disableClass: string;
    currentClass: string;
    selectClass: string;
    irrelevantClass: string;
}

export interface ICalendarMonthConfig {
    bodyClass: string;
}

export interface ICalendarWeekConfig {
    nameRowClass: string;
    nameCellClass: string;
    rowClass: string;
    extaRowClass: string;
}

export interface ICalendarFrameworkConfig {
    headerClass: string;
    headerContentClass: string;
    bodyClass: string;
    hideClass: string;
    switchClass: string;

    isTooltipAllowed: boolean
    isHideExtaDates: boolean;
    isHideWeekend: boolean;
    isBlockFutureDays: boolean;
    isSelecteble: boolean;

    switchMode: SwitchMode;
    selectMode: SelectMode;
    blockMode: BlockMode;

    calendarType: CalendarType;
}