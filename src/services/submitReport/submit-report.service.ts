import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DayReportProjectTask } from '../../models/task/dayReportPtojectTask';
import { SubmitReport } from '../../models/submitReport/submitReport';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class SubmitReportService {

    private readonly url = "http://localhost:63553/api/dayreport/savetaskduration?selectedDate=2019-01-15";


    constructor(private http: HttpClient) { }

    SaveTaskDuration(report: SubmitReport) {

    report.status = "Open";
    report.durationId = -1;
    report.selectedDate= moment.utc();
    console.log(report);
    const body = {durationId: report.durationId,
        taskId: report.taskId,
        title: report.title,
        description: report.description,
        duration: 30,
        status: 0,
        submittedDate:"2019-01-15",
        billable: report.billable,
        overtime: null};
    return this.http.post(this.url, report);
        }
}

