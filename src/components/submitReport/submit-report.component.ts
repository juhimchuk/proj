import { Component, OnInit, Input , OnChanges, SimpleChanges} from '@angular/core';

import { TaskService } from '../../services/task/task.service';
import { DayReportProjectTask } from '../../models/task/dayReportPtojectTask';
import { SubmitReport } from '../../models/submitReport/submitReport';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import { ProjectService } from '../../services/project/project.service';
import { SubmitReportService } from '../../services/submitReport/submit-report.service';
import { ProjectItem } from '../../models/project/projectItem';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'submit-report',
    templateUrl: './submit-report.component.html'
  })
export class SubmitReportComponent implements OnInit {

    constructor(
        private taskService: TaskService,
        private projectService: ProjectService,
        private submitService: SubmitReportService) {}

    ngOnInit() {
        this.GetProjectList(moment());
    }
    some:ProjectItem[]=[];
    projectId: number;
    time: string[] = ["0:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00"];
    report = new FormGroup({
        taskId: new FormControl(''),
        description: new FormControl(''),
        duration: new FormControl('')
      });
  
  
      GetProjectList(date:moment.Moment){
          this.projectService.GetProjectList(date).subscribe(info => {
            this.some = info;
          });
        }

  tasks:DayReportProjectTask=new DayReportProjectTask();
    

    GetTasks(projectId: number){
        this.taskService.GetProjectTask(projectId).subscribe(info => {
          this.tasks = info;
          console.log(this.tasks.ProjectTasks);
        });
      }

      onSubmit() {
          console.log(this.report.value.taskId);
          var rep = new SubmitReport();
          rep.taskId = this.report.value.taskId;
          rep.description = this.report.value.description;
          rep.duration = this.report.value.duration;
          rep.billable = this.tasks.ProjectTasks.find(s=>s.TaskId ==this.report.value.taskId).Billable;
          rep.title = this.tasks.ProjectTasks.find(s=>s.TaskId ==this.report.value.taskId).Title;
          this.submitService.SaveTaskDuration(rep);

        // TODO: Use EventEmitter with form value
        console.warn(rep);
      }
}