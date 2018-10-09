import { Component, OnInit } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'projects-brief',
  templateUrl: './projects-brief.component.html'
})
export class ProjectsBriefComponent implements OnInit {

private project: Project;

  constructor(private projectsService: ProjectsLibService) {}

  public ngOnInit() {
    this.getProject();
  }

  private getProject() {
    this.projectsService.currentProject.subscribe(prj => this.project = prj);
  }
}
