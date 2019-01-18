
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { IHttpActionResult } from 'src/models/response/IHttpActionResult';
import { GeneralMonthStatistics } from 'src/models/statistic/generalMonthStatistic';
import { DayViewModel } from 'src/models/statistic/dayViewModel';

@Injectable()
export class EmployeeStatisticService {
    private readonly globlaUrl = "http://localhost:63553/api/"
    private readonly monthurl = `${this.globlaUrl}employeestatistic/month`;
    private readonly weekurl = `${this.globlaUrl}employeestatistic/month/general`;


    constructor(private http: HttpClient) { }

    public getEmployeeStatisticByWeek (date: moment.Moment): Observable<IHttpActionResult<DayViewModel[]>> {
        let httpParams = new HttpParams()
            .set("month", (date.month() + 1).toString())
            .set("year", date.year().toString());

        return this.http.get<IHttpActionResult<DayViewModel[]>>(this.weekurl, { params: httpParams });
    }

    public getEmployeeStatisticByMonth(date: moment.Moment): Observable<IHttpActionResult<GeneralMonthStatistics>> {
        let httpParams = new HttpParams()
            .set("month", (date.month() + 1).toString())
            .set("year", date.year().toString());

        return this.http.get<IHttpActionResult<GeneralMonthStatistics>>(this.monthurl, { params: httpParams });
    }
}