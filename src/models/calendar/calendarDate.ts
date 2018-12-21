import * as moment from 'moment';

export class CalendarDate {
  date: moment.Moment;
  selected?: boolean;
  today?: boolean;

  constructor(date?: moment.Moment, selected: boolean = false, today: boolean = false) {
    this.date = date;
    this.selected = selected;
    this.today = today;
  }
}