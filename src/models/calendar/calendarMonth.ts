import { CalendarWeek } from './calendarWeek';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CalendarDate } from './calendarDate';
import { CalendarConfig } from 'src/modules/calendars/config/calendar.config';

export class CalendarMonth {
    private readonly config: CalendarConfig;
    private readonly currentMoment: moment.Moment;
    private readonly selectedDays: CalendarDate[] = [];

    number: number;
    name: string;
    firstDay: CalendarDate;
    weeks: CalendarWeek[] = [];

    public constructor(currentMoment: moment.Moment, config: CalendarConfig, selectedDays?: CalendarDate[]) {
        this.currentMoment = currentMoment;
        this.config = config;
        this.selectedDays = selectedDays;
        this.number = this.currentMoment.month() + 1;
        this.name = moment(this.number, 'M').format('MMMM');
        this.firstDay = new CalendarDate(moment(this.currentMoment).startOf('month'), this.currentMoment);
        this.weeks = this.splitByWeeks();
    }

    private getDates(): CalendarDate[] {
        const firstOfMonth = moment(this.currentMoment).startOf('month').day() - 1;
        const firstDayOfGrid = moment(this.currentMoment).startOf('month').subtract(firstOfMonth, 'days');
        const start = firstDayOfGrid.date();
        return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
                const day = moment(firstDayOfGrid).date(date);
                const isDaySelected = this.selectedDays.length && this.selectedDays.some((sDay) => moment(sDay.date).isSame(day));
                const calendarDay = new CalendarDate(day, this.currentMoment, isDaySelected, this.config.calendar.isHideExtaDates, this.config.calendar.isBlockFutureDays);
                if (isDaySelected) {
                    const selectedDayIndex = this.selectedDays.findIndex((sDay) => moment(sDay.date).isSame(day));
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