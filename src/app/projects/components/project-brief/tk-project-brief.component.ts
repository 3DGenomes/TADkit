import { Component, OnInit } from '@angular/core';
import { TkProjectsService } from '@projects/tk-projects.service';
import { Project } from '@projects/models/tk-project.model';

@Component({
  selector: 'tk-project-brief',
  templateUrl: './tk-project-brief.component.html'
})
export class TkProjectBriefComponent implements OnInit {

private project: Project;

  constructor(private tkProjectsService: TkProjectsService) {}

  public ngOnInit() {
    this.getProject();
  }

  private getProject() {
    this.tkProjectsService.currentProject.subscribe(prj => this.project = prj);
  }
}
