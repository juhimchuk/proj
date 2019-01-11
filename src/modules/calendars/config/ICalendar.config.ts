import * as moment from 'moment';
import { SelectMode } from 'src/models/calendar/enums/selectMode';
import { BlockMode } from 'src/models/calendar/enums/blockMode';

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
    headerClass: string;
    bodyClass: string;
    switchrowClass: string;
    switchClass: string;
    titleClass: string;
}

export interface ICalendarWeekConfig {
    nameClass: string;
    rowClass: string;
    extaRowClass: string;
}

export interface ICalendarFrameworkConfig {
    bodyClass: string;
    hideClass: string;
    isHideExtaDates: boolean;
    isHideWeekend: boolean;
    SelectMode: SelectMode;
    BlockMode: BlockMode;
    isBlockFutureDays: boolean;
    isSelecteble: boolean;
}