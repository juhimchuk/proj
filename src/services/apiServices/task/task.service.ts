import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DayReportProjectTask } from 'src/models/task/dayReportPtojectTask';

@Injectable()
export class TaskService {

    private readonly url = "http://localhost:63553/api/projecttask/";


    constructor(private http: HttpClient) { }

    GetProjectTask(projectId: number) {
        // ToDo add param accountId
        let params = new HttpParams()
            .set("projectId", projectId.toString());

        return this.http.get<any>(this.url + projectId).pipe(map(task => {
            var tasks: DayReportProjectTask = new DayReportProjectTask();
            tasks = task.data;
            return tasks;
        }));
    }

}