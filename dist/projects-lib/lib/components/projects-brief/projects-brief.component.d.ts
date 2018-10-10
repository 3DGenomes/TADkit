import { OnInit } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
export declare class ProjectsBriefComponent implements OnInit {
    private projectsService;
    project: any;
    constructor(projectsService: ProjectsLibService);
    ngOnInit(): void;
    private getProject;
}
