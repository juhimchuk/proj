export class ProjectTask {
    taskId: number;
    title: string;
    billable: boolean;
    isOutOfScope: boolean;
  
    constructor(taskId?: number, title?: string ,billable?: boolean, isOutOfScope?: boolean) {
      this.taskId = taskId;
      this.title = title;
      this.billable = billable;
      this.isOutOfScope = isOutOfScope;
    }
  }