import { Component, OnInit } from '@angular/core';
import { TkProjectsService } from '@projects/tk-projects.service';
import { Project, Projects } from '@projects/models/tk-project.model';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'tk-projects-list',
  templateUrl: './tk-projects-list.component.html',
  styleUrls: ['./tk-projects-list.component.css'],
  providers: [ConfirmationService]
})
export class TkProjectsListComponent implements OnInit {

  public projects: Projects;
  public currentProject: Project;
  // public currentCheck: string;

  constructor(
    private tkProjectsService: TkProjectsService,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.getProjects();
  }

  private getProjects(): void {
    this.tkProjectsService.projects.subscribe(prjs => this.projects = prjs);
    this.tkProjectsService.currentProject.subscribe(prj => {
      this.currentProject = prj;
    });
  }

  public  setProject(project): void {
    this.tkProjectsService.setProject(project);
  }

  public  editProject(project): void {
    // Open dialog with Create form
  }

  public  deleteProject(project): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this project',
      accept: () => {
        this.tkProjectsService.deleteProject(project);
      }
    });
  }
}
