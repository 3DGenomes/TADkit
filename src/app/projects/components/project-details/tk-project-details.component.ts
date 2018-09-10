import { Component, OnInit } from '@angular/core';
import { TkProjectsService } from '@projects/tk-projects.service';
import { Project } from '@projects/models/tk-project.model';

@Component({
  selector: 'tk-project-details',
  templateUrl: './tk-project-details.component.html'
})
export class TkProjectDetailsComponent implements OnInit {

private project: Project;

  constructor(private tkProjectsService: TkProjectsService) {}

  public ngOnInit() {
    this.getProject();
  }

  private getProject() {
    this.tkProjectsService.currentProject.subscribe(prj => this.project = prj);
  }
}
