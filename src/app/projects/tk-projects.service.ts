import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-store';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Project, Projects } from '@projects/models/tk-project.model';

@Injectable({
  providedIn: 'root',
})

export class TkProjectsService {
  // User projects stream
  private projectsStreamUrl: string;
  private projectsStream: BehaviorSubject<Projects>;
  public projects: Observable<Projects>;
  // Current project stream
  private currentProjectStream: BehaviorSubject<Project>;
  // public currentProject: Observable<Project>;

  constructor(
    private httpClient: HttpClient,
    public localStorageService: LocalStorageService
    ) {
    this.projectsStreamUrl = 'assets/defaults/tk-default-projects.json';
    this.projectsStream = new BehaviorSubject<Projects>(null);
    this.projects = this.projectsStream.asObservable();
    this.currentProjectStream = new BehaviorSubject<Project>(null);
    // this.currentProject = this.currentProjectStream.asObservable();
  }

  // Same as above?
  get currentProject(): Observable<Project> {
    return this.currentProjectStream.asObservable();
  }

  private updateProjects(projectsArray) {
    this.projectsStream.next(projectsArray);
    this.localStorageService.set('projects', projectsArray);
    this.setProject();
  }

  public loadProjects(): void {
    const projectsResource = this.localStorageService.get('projects');
    if (!projectsResource) {
      this.httpClient.get<Projects>(this.projectsStreamUrl)
      .subscribe(projectsArray => {
        this.updateProjects(projectsArray);
      });
    } else {
      this.updateProjects(projectsResource);
    }
  }

  public setProject(projectTitle?): void {
    let theProject = null;
    if (projectTitle) {
      theProject = this.projects
      .pipe(
        map(prjs => prjs
          .find(prj => prj.title === projectTitle)
        )
      );
    } else {
      theProject = this.projects
      .pipe(
        take(1),
        map(prjs => prjs[0])
      );
    }
    // console.log(theProject);
    this.currentProjectStream.next(theProject);
  }

  public  getProject(project): Observable<Project> {
    return this.currentProject;
  }

  public addProject(project: Project) {
    const projectsArray = [ ...this.projectsStream.getValue(), project ];
    this.updateProjects(projectsArray);
  }

  public editProject(project: Project) {
    const projectsArray = [ ...this.projectsStream.getValue(), project ];
    this.updateProjects(projectsArray);
  }

  public deleteProject(project: Project) {
    const projectsArray = this.projectsStream.getValue().filter(item => item.title !== project.title);
    this.updateProjects(projectsArray);
  }

}
