import { Component, OnInit, Input } from '@angular/core';

import { TaskService } from '../../services/task/task.service';
import { DayReportProjectTask } from '../../models/task/dayReportPtojectTask';
import { ProjectTask } from '../../models/task/projectTask';
import * as moment from 'moment';

@Component({
    selector: 'tasks',
    templateUrl: './task.component.html'
  })
export class TaskComponent implements OnInit {

  @Input() projectId: number;

  tasks:DayReportProjectTask=new DayReportProjectTask();
    constructor(
        private taskService: TaskService) {}

    ngOnInit() {
      
    }

    GetSomeTask(){
      this.GetTasks(this.projectId);
    }

    GetTasks(projectId: number){
      console.log("projectId");
      console.log(projectId);

        this.taskService.GetProjectTask(projectId).subscribe(info => {
          this.tasks = info;
          console.log("tasks");
      console.log(this.tasks);
        });
      }
}