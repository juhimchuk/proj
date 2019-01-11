import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project/project.service';
import { ProjectItem } from '../../models/project/projectItem';
import * as moment from 'moment';

@Component({
    selector: 'project',
    templateUrl: './project.component.html'
  })
export class ProjectComponent implements OnInit {

  some:ProjectItem[]=[];
  projectId: number;
    constructor(
        private projectService: ProjectService) {}

    ngOnInit() {
      
    }

    GetSome(){
      this.GetProjectList(moment());
    }


    GetProjectList(date:moment.Moment){
        this.projectService.GetProjectList(date).subscribe(info => {
          this.some = info;
        });
      }
}