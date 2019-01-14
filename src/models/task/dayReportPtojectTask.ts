import { ProjectTask } from './projectTask';

export class DayReportProjectTask {
    ProjectTasks: ProjectTask[];
    myTasks: ProjectTask[];
  
    constructor(projectTasks?: ProjectTask[], myTasks?: ProjectTask[]) {
      this.ProjectTasks = projectTasks;
      this.myTasks = myTasks;
    }
  }