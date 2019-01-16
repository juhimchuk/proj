import * as moment from 'moment';

export class SubmitReport {
    billable?: boolean;
    description?: string;
    duration?: number;
    durationId?: number;
    selectedDate?: moment.Moment;
    status?: string;
    taskId?: number;
    title?: string;
  
    constructor(billable?: boolean, description?: string ,duration?: number, durationId?: number, 
        selectedDate?: moment.Moment, status?: string, taskId?: number, title?: string) {
      this.billable = billable;
      this.description = description;
      this.duration = duration;
      this.durationId = durationId;
      this.selectedDate = selectedDate;
      this.status = status;
      this.taskId = taskId;
      this.title = title;
    }
  }