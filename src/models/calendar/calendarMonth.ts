import { CalendarWeek } from './calendarWeek';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CalendarDate } from './calendarDate';
import { ICalendarConfig } from 'src/modules/calendars/config/ICalendar.config';
import { SelectMode } from './enums/selectMode';

export class CalendarMonth {
    private readonly config: ICalendarConfig;
    private readonly selectedDates: moment.Moment[];
    selectedDays: CalendarDate[];
    currentMoment: moment.Moment;
    number: number;
    name: string;
    firstDay: CalendarDate;
    weeks: CalendarWeek[] = [];

    public constructor(config: ICalendarConfig, momentSetup?: moment.Moment, selectedDays: CalendarDate[] = [], selectedDates: moment.Moment[] = []) {
        this.config = config;
        this.currentMoment = momentSetup || config.momentSettings;
        this.selectedDays = selectedDays || [];
        this.selectedDates = selectedDates;
        this.number = this.currentMoment.month() + 1;
        this.name = moment(this.number, 'M').format('MMMM');
        this.firstDay = new CalendarDate(moment(this.currentMoment).startOf('month'), this.currentMoment, this.config);
        this.weeks = this.splitByWeeks();
    }

    public clearSelectedDays(exceptIndex?: number): CalendarDate[] {
        this.selectedDays.forEach((day) => day.isSelected = false);
        const exceptDay = this.selectedDays[exceptIndex];

        if (exceptDay && this.config.calendar.SelectMode == SelectMode.Multi) {
            exceptDay.isSelected = true;
            this.selectedDays = [exceptDay];
        } else {
            this.selectedDays = []
        }
        return this.selectedDays;
    }

    private getDates(): CalendarDate[] {
        var firstOfMonth = moment(this.currentMoment).startOf('month').day() - 1;
        console.log(moment().startOf('week').week())
        
        // Jury-rig: locale setting;
        if(firstOfMonth < 0) firstOfMonth = 6;

        const firstDayOfGrid = moment(this.currentMoment).startOf('month').subtract(firstOfMonth, 'days');
        const start = firstDayOfGrid.date();
        return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
                const day = moment(firstDayOfGrid).date(date);

                var isDaySelected = this.selectedDays.length && this.selectedDays.some((sDay) => moment(sDay.date).isSame(day));
                isDaySelected = !isDaySelected && this.selectedDates.length && this.selectedDates.some((sDay) => moment(sDay).isSame(day));

                const calendarDay = new CalendarDate(day, this.currentMoment, this.config, isDaySelected);
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

    private splitByWeeks(): CalendarWeek[] {
        const monthDays = this.getDates();
        return _.chunk(monthDays, 7).map(dayList => { return new CalendarWeek(dayList) });
    }
}