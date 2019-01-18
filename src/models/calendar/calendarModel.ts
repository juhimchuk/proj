import { CalendarDate } from './calendarDate';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CalendarYear } from './calendarYear';
import { CalendarMonth } from './calendarMonth';
import { CalendarWeek } from './calendarWeek';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';
import { CalendarType } from './enums/calendarType';
import { SelectMode } from './enums/selectMode';

export class CalendarModel {
    private readonly _selectedDates: moment.Moment[];

    currentMoment: moment.Moment;
    config: ICalendarConfig;

    data: CalendarYear | CalendarMonth | CalendarWeek;
    selectedDays: CalendarDate[];

    constructor(config: ICalendarConfig, momentSetup?: moment.Moment, selectedDays: CalendarDate[] = [], selectedDates: moment.Moment[] = []) {
        this.config = config;
        this.currentMoment = momentSetup || config.momentSettings;
        this.selectedDays = selectedDays || [];
        this._selectedDates = selectedDates;
        this.data = this.getDataModel();
    }

    private getDataModel(): CalendarYear | CalendarMonth | CalendarWeek {
        var model: CalendarYear | CalendarMonth | CalendarWeek;

        switch (this.config.calendar.calendarType) {
            case CalendarType.Week: {
                model = new CalendarWeek(this.getDates(this.currentMoment, 7, CalendarType.Week));
                break;
            }
            case CalendarType.Year: {
                model = new CalendarYear(this.getMonthsOfYear(this.currentMoment));
                break;
            }
            default: {
                model = new CalendarMonth(this.getWeeksOfMonth(this.currentMoment));
                break;
            }
        }
        return model;
    }

    public clearSelectedDays(exceptIndex?: number): CalendarDate[] {
        this.selectedDays.forEach((day) => day.isSelected = false);
        const exceptDay = this.selectedDays[exceptIndex];

        if (exceptDay && this.config.calendar.selectMode == SelectMode.Multi) {
            exceptDay.isSelected = true;
            this.selectedDays = [exceptDay];
        } else {
            this.selectedDays = []
        }
        return this.selectedDays;
    }

    private getMonthsOfYear(momentSettings: moment.Moment): CalendarMonth[] {
        var yearWeeks: CalendarMonth[] = [];
        var monthMoment = moment(momentSettings).startOf(CalendarType.Year);
        for (let index = 0; index < 12; index++) {
            yearWeeks.push(new CalendarMonth(this.getWeeksOfMonth(monthMoment)));
            monthMoment.add(1, 'month');
        }
        return yearWeeks;
    }

    private getWeeksOfMonth(momentSettings: moment.Moment): CalendarWeek[] {
        const monthDays = this.getDates(momentSettings);
        return _.chunk(monthDays, 7).map(dayList => { return new CalendarWeek(dayList) });
    }

    private getDates(momentSettings: moment.Moment, count?: number, calendarType?: CalendarType): CalendarDate[] {
        const daysCount = count || 42;
        var firstOfMonth = moment(momentSettings).startOf(calendarType || 'month').day() - 1;

        // Jury-rig: locale setting;
        if (firstOfMonth < 0) firstOfMonth = 6;

        const firstDayOfGrid = moment(momentSettings).startOf(calendarType || 'month').subtract(firstOfMonth, 'days');
        const start = firstDayOfGrid.date();
        return _.range(start, start + daysCount)
            .map((date: number): CalendarDate => {
                const day = moment(firstDayOfGrid).date(date);

                var isDaySelected = this.selectedDays.length && this.selectedDays.some((sDay) => moment(sDay.date).isSame(day));
                isDaySelected = !isDaySelected && this._selectedDates.length && this._selectedDates.some((sDay) => moment(sDay).isSame(day));

                const calendarDay = new CalendarDate(day, momentSettings, this.config, isDaySelected, "<div class='day-tooltiptext'><h1>test</h1></div>");
                if (isDaySelected) {
                    const selectedDayIndex = this.selectedDays.findIndex((sDay) => moment(sDay.date).isSame(day));
                    if (selectedDayIndex < 0) {
                        this.selectedDays.push(calendarDay)
                    }
                    this.selectedDays[selectedDayIndex] = calendarDay;
                }
                return calendarDay;
            });
    }
}