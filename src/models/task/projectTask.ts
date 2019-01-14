export class ProjectTask {
    TaskId: number;
    Title: string;
    Billable: boolean;
    IsOutOfScope: boolean;
  
    constructor(taskId?: number, title?: string ,billable?: boolean, isOutOfScope?: boolean) {
      this.TaskId = taskId;
      this.Title = title;
      this.Billable = billable;
      this.IsOutOfScope = isOutOfScope;
    }
  }