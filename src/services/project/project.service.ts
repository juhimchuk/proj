import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProjectItem } from '../../models/project/projectItem';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class ProjectService {

    private readonly url = "http://localhost:63553/api/project";


    constructor(private http: HttpClient) { }

    GetProjectList(date: moment.Moment, accountId?: number) {
    // ToDo add param accountId
        let params = new HttpParams()
    .set("date", date.format('YYYY-MM-DD'));

        return this.http.get<any>(this.url, {params:params}).pipe(map(user => {
            var projects:ProjectItem[] = [];
            user.data.projectList.forEach(obj => {
                var temp = new ProjectItem(obj.projectId,obj.name);
                projects.push(temp);
            });
            return projects;
        }));
    }

}