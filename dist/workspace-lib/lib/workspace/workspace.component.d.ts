import { OnInit, ComponentFactoryResolver } from '@angular/core';
import { Workspace } from './workspace';
import { Project } from 'projects-lib';
import { Observable } from 'rxjs';
import { ProjectsLibService } from 'projects-lib';
export declare class WorkspaceComponent implements OnInit {
    private componentFactoryResolver;
    private projectsService;
    routespace: any;
    currentWorkspace: Workspace;
    private data;
    dataStream: Observable<Project>;
    constructor(componentFactoryResolver: ComponentFactoryResolver, projectsService: ProjectsLibService);
    ngOnInit(): void;
    setWorkspace(workspaceName?: string): void;
    loadWorkpace(): void;
}
