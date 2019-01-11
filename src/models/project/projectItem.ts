export class ProjectItem {
    projectId: number;
    name: string;
  
    constructor(projectId?: number, name?: string ) {
      this.projectId = projectId;
      this.name = name;
    }
  }