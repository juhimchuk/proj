import { ProjectTask } from './projectTask';

export class DayReportProjectTask {
    projectTasks: ProjectTask[];
    myTasks: ProjectTask[];
  
    constructor(projectTasks?: ProjectTask[], myTasks?: ProjectTask[]) {
      this.projectTasks = projectTasks;
      this.myTasks = myTasks;
    }
  }