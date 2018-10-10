import { Component, OnInit } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
import { Project, Projects } from '../../models/project.model';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
  providers: [ConfirmationService]
})
export class ProjectsListComponent implements OnInit {

  public projects: Projects;
  public currentProject;
  // N.B. in the template, as currentProject is undefined, use safe-traversal-operator:
  // https://angular.io/api/common/NgIf#storing-conditional-result-in-a-variable

  constructor(
    private projectsService: ProjectsLibService,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.getProjects();
  }

  private getProjects(): void {
    this.projectsService.projects.subscribe(prjs => this.projects = prjs);
    this.projectsService.currentProject.subscribe(prj => {
      this.currentProject = prj;
    });
  }

  public  setProject(project): void {
    this.projectsService.setProject(project);
  }

  public  editProject(project): void {
    // Open dialog with Create form
  }

  public  deleteProject(project): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this project',
      accept: () => {
        this.projectsService.deleteProject(project);
      }
    });
  }
}
