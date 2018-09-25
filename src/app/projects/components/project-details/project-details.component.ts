import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '@projects/projects.service';
import { Project } from '@projects/models/tk-project.model';

@Component({
  selector: 'tk-project-details',
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit {

private project: Project;

  constructor(private projectsService: ProjectsService) {}

  public ngOnInit() {
    this.getProject();
  }

  private getProject() {
    this.projectsService.currentProject.subscribe(prj => this.project = prj);
  }
}
