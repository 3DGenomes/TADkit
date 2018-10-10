import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-store';
import { Observable } from 'rxjs';
import { Project, Projects } from './models/project.model';
export declare class ProjectsLibService {
    private httpClient;
    localStorageService: LocalStorageService;
    private projectsStreamUrl;
    private projectsStream;
    projects: Observable<Projects>;
    private currentProjectStream;
    constructor(httpClient: HttpClient, localStorageService: LocalStorageService);
    readonly currentProject: Observable<Project>;
    private updateProjects;
    loadProjects(): void;
    setProject(project?: any): void;
    getProject(project: any): Observable<Project>;
    addProject(project: Project): void;
    editProject(project: Project): void;
    deleteProject(project: Project): void;
}
