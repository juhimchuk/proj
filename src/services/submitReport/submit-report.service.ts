import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DayReportProjectTask } from '../../models/task/dayReportPtojectTask';
import { SubmitReport } from '../../models/submitReport/submitReport';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class SubmitReportService {

    private readonly url = "http://localhost:63553/api/dayreport/savetaskduration";


    constructor(private http: HttpClient) { }

    SaveTaskDuration(report: SubmitReport) {

    report.status = "Open";
    report.durationId = -1;
    report.selectedDate= moment.now().toString();
        console.log(report);
    // return this.http.post<any>(this.url, model)
    //     .pipe(map(user => {
    //         if (user.access_token) {
    //             localStorage.setItem('currentUser', user.access_token);
    //         }

    //         return user;
    //     }));
    //     }
}
}
