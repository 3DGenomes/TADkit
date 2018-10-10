import { OnInit } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
import { Projects } from '../../models/project.model';
import { ConfirmationService } from 'primeng/api';
export declare class ProjectsListComponent implements OnInit {
    private projectsService;
    private confirmationService;
    projects: Projects;
    currentProject: any;
    constructor(projectsService: ProjectsLibService, confirmationService: ConfirmationService);
    ngOnInit(): void;
    private getProjects;
    setProject(project: any): void;
    editProject(project: any): void;
    deleteProject(project: any): void;
}
