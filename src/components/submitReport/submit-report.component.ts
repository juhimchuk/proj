import { Component, OnInit, Output, EventEmitter, Input,SimpleChanges} from '@angular/core';
import { DayReportProjectTask } from '../../models/task/dayReportPtojectTask';
import { SubmitReport } from '../../models/submitReport/submitReport';
import * as moment from 'moment';
import { ProjectItem } from '../../models/project/projectItem';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from 'src/services/apiServices/task/task.service';
import { ProjectService } from 'src/services/apiServices/project/project.service';
import { SubmitReportService } from 'src/services/apiServices/submitReport/submit-report.service';

@Component({
    selector: 'submit-report',
    templateUrl: './submit-report.component.html'
  })
export class SubmitReportComponent implements OnInit {

    constructor(
        private taskService: TaskService,
        private projectService: ProjectService,
        private submitService: SubmitReportService) {}

        @Output() onChangeMonth: EventEmitter<SubmitReport> = new EventEmitter();
        @Input() selectedDay: moment.Moment[];

    ngOnInit() {
    }
    some:ProjectItem[]=[];
    projectId: number;
    startProjectId: number;
    startTaskId: number;
    tasks:DayReportProjectTask=new DayReportProjectTask();
    time: string[] = ["0:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00"];
    report = new FormGroup({
        taskId: new FormControl(''),
        description: new FormControl(''),
        duration: new FormControl('')
      });

    ngOnChanges(changes: SimpleChanges) {
        this.GetProjectList(this.selectedDay[0]);
        // changes.prop contains the old and the new value...
      }
  
    GetProjectList(date:moment.Moment){
          this.projectService.GetProjectList(date).subscribe(info => {
            this.some = info;
            this.startProjectId = this.some[0].projectId;
            this.GetTasks(this.startProjectId);
          });
        }

    GetTasks(projectId: number){
        this.taskService.GetProjectTask(projectId).subscribe(info => {
          this.tasks = info;
          this.startTaskId = this.tasks.projectTasks[0].taskId;
        });
      }

    onSubmit() {
          var rep = new SubmitReport();
          rep.taskId = this.report.value.taskId;
          rep.description = this.report.value.description;
          rep.duration = this.report.value.duration;
          console.log(this.report.value.taskId);
          rep.billable = this.tasks.projectTasks.find(s=>s.taskId ==this.report.value.taskId).billable;
          rep.title = this.tasks.projectTasks.find(s=>s.taskId ==this.report.value.taskId).title;
          rep.selectedDate = this.selectedDay[0];
          this.submitService.SaveTaskDuration(rep).subscribe(info => {
          
          });;
          this.onChangeMonth.emit(rep);
      }
}