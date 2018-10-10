import { Injectable, NgModule, Component, HostBinding, defineInjectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService, WebStorageModule } from 'ngx-store';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class UsersAdminService {
    //   public currentUserIndex = 0;
    /**
     * @param {?} httpClient
     */
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.defaultUser = 'assets/defaults/tk-default-user.json';
    }
    //   private setUserProject(userIndex) {
    //     this.currentUserIndex = userIndex;
    //     this.currentUser = this.users[this.currentUserIndex];
    //     this.currentUser.subscribe(usr => console.log('Set current user: ', usr.fullname));
    //   }
    /**
     * @return {?}
     */
    loadDefaultUser() {
        console.log('Loading default user...');
        return this.currentUser = this.httpClient.get(this.defaultUser);
    }
    /**
     * @return {?}
     */
    getCurrentUser() {
        // this.currentUser.subscribe(usr => console.log('Returning current user: ', usr.title));
        return this.currentUser;
    }
}
UsersAdminService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
UsersAdminService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ UsersAdminService.ngInjectableDef = defineInjectable({ factory: function UsersAdminService_Factory() { return new UsersAdminService(inject(HttpClient)); }, token: UsersAdminService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ProjectsLibService {
    // public currentProject: Observable<Project>;
    /**
     * @param {?} httpClient
     * @param {?} localStorageService
     */
    constructor(httpClient, localStorageService) {
        this.httpClient = httpClient;
        this.localStorageService = localStorageService;
        this.projectsStreamUrl = 'assets/defaults/tk-default-projects.json';
        this.projectsStream = new BehaviorSubject(null);
        this.projects = this.projectsStream.asObservable();
        this.currentProjectStream = new BehaviorSubject(null);
        // this.currentProject = this.currentProjectStream.asObservable();
    }
    // Same as above?
    /**
     * @return {?}
     */
    get currentProject() {
        return this.currentProjectStream.asObservable();
    }
    /**
     * @param {?} projectsArray
     * @return {?}
     */
    updateProjects(projectsArray) {
        this.projectsStream.next(projectsArray);
        this.localStorageService.set('projects', projectsArray);
        this.setProject();
    }
    /**
     * @return {?}
     */
    loadProjects() {
        /** @type {?} */
        const projectsResource = this.localStorageService.get('projects');
        if (!projectsResource) {
            this.httpClient.get(this.projectsStreamUrl)
                .subscribe(projectsArray => {
                this.updateProjects(projectsArray);
            });
        }
        else {
            this.updateProjects(projectsResource);
        }
    }
    /**
     * @param {?=} project
     * @return {?}
     */
    setProject(project) {
        /** @type {?} */
        let theProject = null;
        if (project) {
            theProject = this.projects
                .pipe(map(prjs => prjs
                .find(prj => prj.title === project.title)));
        }
        else {
            theProject = this.projects
                .pipe(take(1), map(prjs => prjs[0]));
        }
        // console.log(theProject);
        this.currentProjectStream.next(theProject);
    }
    /**
     * @param {?} project
     * @return {?}
     */
    getProject(project) {
        return this.currentProject;
    }
    /**
     * @param {?} project
     * @return {?}
     */
    addProject(project) {
        /** @type {?} */
        const projectsArray = [...this.projectsStream.getValue(), project];
        this.updateProjects(projectsArray);
    }
    /**
     * @param {?} project
     * @return {?}
     */
    editProject(project) {
        /** @type {?} */
        const projectsArray = [...this.projectsStream.getValue(), project];
        this.updateProjects(projectsArray);
    }
    /**
     * @param {?} project
     * @return {?}
     */
    deleteProject(project) {
        /** @type {?} */
        const projectsArray = this.projectsStream.getValue().filter(item => item.title !== project.title);
        this.updateProjects(projectsArray);
    }
}
ProjectsLibService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ProjectsLibService.ctorParameters = () => [
    { type: HttpClient },
    { type: LocalStorageService }
];
/** @nocollapse */ ProjectsLibService.ngInjectableDef = defineInjectable({ factory: function ProjectsLibService_Factory() { return new ProjectsLibService(inject(HttpClient), inject(LocalStorageService)); }, token: ProjectsLibService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// import { Dataset } from "./project-dataset.model"
// import { Overlay } from "./project-overlay.model"
// import { Storyboard } from "./project-storyboard.model"
// // import { Species } from "./project-genomics.model";
// export class Datasets extends Array<Dataset> {}
// export class Overlays extends Array<Overlay> {}
// export class Storyboards extends Array<Storyboard> {}
class Project {
}
class Projects extends Array {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ProjectsAdminComponent {
    constructor() {
        this.classes = 'projects';
    }
}
ProjectsAdminComponent.decorators = [
    { type: Component, args: [{
                selector: 'projects-admin',
                template: "<h2>Projects</h2>\n  <projects-list></projects-list>\n  <projects-details></projects-details>\n  <projects-create></projects-create>\n"
            }] }
];
ProjectsAdminComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ProjectsBriefComponent {
    /**
     * @param {?} projectsService
     */
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getProject();
    }
    /**
     * @return {?}
     */
    getProject() {
        this.projectsService.currentProject.subscribe(prj => this.project = prj);
    }
}
ProjectsBriefComponent.decorators = [
    { type: Component, args: [{
                selector: 'projects-brief',
                template: "<section class=\"tk-list\">\n  <h3>\n    Project: \n    <ng-container *ngIf=\"(project | async) as project; else loading\">{{project.title}}</ng-container>\n  </h3>\n  <div *ngIf=\"(project | async) as project; else loading\">\n    <table>\n      <tr><td>Title</td><td>{{project.title}}</td></tr>\n      <tr><td>Description</td><td>{{project.description}}</td></tr>\n      <tr><td>State</td><td>{{project.state}}</td></tr>\n    </table>\n    <ng-template #noItems>No Items!</ng-template>\n  </div>\n  <ng-template #loading>\n    <p-progressSpinner></p-progressSpinner>\n  </ng-template> \n</section>\n<ng-template #loading>Loading ...<p-progressSpinner></p-progressSpinner></ng-template>"
            }] }
];
ProjectsBriefComponent.ctorParameters = () => [
    { type: ProjectsLibService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ProjectsCreateComponent {
    /**
     * @param {?} projectsService
     */
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }
    /**
     * @return {?}
     */
    createFormControls() {
        this.title = new FormControl('');
        this.description = new FormControl('');
    }
    /**
     * @return {?}
     */
    createForm() {
        this.projectForm = new FormGroup({
            title: this.title,
            description: this.description,
        });
    }
    /**
     * @return {?}
     */
    addProject() {
        /** @type {?} */
        const newProject = Object.assign({}, this.projectForm.value);
        this.projectsService.addProject(newProject);
    }
}
ProjectsCreateComponent.decorators = [
    { type: Component, args: [{
                selector: 'projects-create',
                template: "<section class=\"tk-form\">\n  <h3>Create New Project:</h3>\n  <form novalidate [formGroup]=\"projectForm\" (ngSubmit)=\"addProject()\" class=\"ui-inputgroup\">\n    <span class=\"ui-inputgroup-addon\"><i class=\"pi pi-user\"></i></span>\n    <label>Project Title:</label>\n    <input type=\"text\" formControlName=\"title\">\n    <span class=\"ui-inputgroup-addon\"><i class=\"pi pi-user\"></i></span>\n    <label>Description:</label>\n    <input type=\"text\" formControlName=\"description\">\n    <button pButton type=\"submit\" icon=\"pi pi-check\" iconPos=\"left\" label=\"Submit\"></button>\n  </form>\n</section>"
            }] }
];
ProjectsCreateComponent.ctorParameters = () => [
    { type: ProjectsLibService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ProjectsDetailsComponent {
    /**
     * @param {?} projectsService
     */
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getProject();
    }
    /**
     * @return {?}
     */
    getProject() {
        this.projectsService.currentProject.subscribe(prj => this.project = prj);
    }
}
ProjectsDetailsComponent.decorators = [
    { type: Component, args: [{
                selector: 'projects-details',
                template: "<section class=\"tk-list\">\n  <h3>\n    Project: \n    <ng-container *ngIf=\"(project | async) as project; else loading\">{{project.title}}</ng-container>\n  </h3>\n  <div *ngIf=\"(project | async) as project; else loading\">\n    <table>\n      <tr><td>Title</td><td>{{project.title}}</td></tr>\n      <tr><td>Description</td><td>{{project.description}}</td></tr>\n      <tr><td>State</td><td>{{project.state}}</td></tr>\n    </table>\n    <ng-template #noItems>No Items!</ng-template>\n  </div>\n</section>\n<ng-template #loading>Loading ...<p-progressSpinner></p-progressSpinner></ng-template>"
            }] }
];
ProjectsDetailsComponent.ctorParameters = () => [
    { type: ProjectsLibService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ProjectsListComponent {
    // public currentCheck: string;
    /**
     * @param {?} projectsService
     * @param {?} confirmationService
     */
    constructor(projectsService, confirmationService) {
        this.projectsService = projectsService;
        this.confirmationService = confirmationService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getProjects();
    }
    /**
     * @return {?}
     */
    getProjects() {
        this.projectsService.projects.subscribe(prjs => this.projects = prjs);
        this.projectsService.currentProject.subscribe(prj => {
            this.currentProject = prj;
        });
    }
    /**
     * @param {?} project
     * @return {?}
     */
    setProject(project) {
        this.projectsService.setProject(project);
    }
    /**
     * @param {?} project
     * @return {?}
     */
    editProject(project) {
        // Open dialog with Create form
    }
    /**
     * @param {?} project
     * @return {?}
     */
    deleteProject(project) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this project',
            accept: () => {
                this.projectsService.deleteProject(project);
            }
        });
    }
}
ProjectsListComponent.decorators = [
    { type: Component, args: [{
                selector: 'projects-list',
                template: "<section class=\"tk-list\">\n  <h3>Projects List</h3>\n  <div *ngIf=\"projects else loading\">\n      <!-- <ng-container *ngIf=\"projects.length; else noItems\"> -->\n      <table>\n        <tr>\n          <th>Title</th>\n          <th>Description</th>\n          <th>Date</th>\n          <th>Select</th>\n          <th>Edit</th>\n          <th>Delete</th>\n        </tr>\n        <tr *ngFor=\"let project of projects\">\n          <td>{{project.title}}</td>\n          <td>{{project.description}}</td>\n          <td>{{project.date}}</td>\n          <!-- <td><p-radioButton (click)=\"setProject(project)\" name=\"selectProject\" value=\"{{project.title}}\" [(ngModel)]=\"currentCheck\"></p-radioButton></td> -->\n          <td><button (click)=\"setProject(project)\" pButton type=\"button\" icon=\"pi pi-check\" iconPos=\"left\" [ngClass]=\"{'ui-state-active': project.title === (currentProject | async)?.title }\"></button></td>\n          <td><button pButton type=\"button\" icon=\"pi pi-pencil\" iconPos=\"left\"></button></td>\n          <td><button (click)=\"deleteProject(project)\" pButton type=\"button\" icon=\"pi pi-trash\" iconPos=\"left\"></button></td>\n        </tr>\n      </table>\n      <!-- </ng-container>     -->\n      <ng-template #noItems>No Items!</ng-template>\n    </div>\n    <ng-template #loading>\n      <p-progressSpinner></p-progressSpinner>\n    </ng-template> \n</section>\n<p-confirmDialog header=\"Confirmation\" icon=\"pi pi-exclamation-triangle\" width=\"425\"></p-confirmDialog>\n",
                providers: [ConfirmationService],
                styles: [":host ::ng-deep th{text-align:left}"]
            }] }
];
ProjectsListComponent.ctorParameters = () => [
    { type: ProjectsLibService },
    { type: ConfirmationService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ProjectsLibModule {
}
ProjectsLibModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    WebStorageModule,
                    ProgressSpinnerModule,
                    ButtonModule,
                    RadioButtonModule,
                    CheckboxModule,
                    ConfirmDialogModule
                ],
                declarations: [
                    ProjectsAdminComponent,
                    ProjectsListComponent,
                    ProjectsBriefComponent,
                    ProjectsDetailsComponent,
                    ProjectsCreateComponent
                ],
                exports: [
                    ProjectsAdminComponent,
                    ProjectsListComponent,
                    ProjectsBriefComponent,
                    ProjectsDetailsComponent,
                    ProjectsCreateComponent,
                    FormsModule,
                    ReactiveFormsModule
                ],
                providers: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { UsersAdminService, ProjectsLibService, Project, Projects, ProjectsAdminComponent, ProjectsBriefComponent, ProjectsCreateComponent, ProjectsDetailsComponent, ProjectsListComponent, ProjectsLibModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtbGliLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9wcm9qZWN0cy1saWIvbGliL3VzZXJzLWFkbWluLnNlcnZpY2UudHMiLCJuZzovL3Byb2plY3RzLWxpYi9saWIvcHJvamVjdHMtbGliLnNlcnZpY2UudHMiLCJuZzovL3Byb2plY3RzLWxpYi9saWIvbW9kZWxzL3Byb2plY3QubW9kZWwudHMiLCJuZzovL3Byb2plY3RzLWxpYi9saWIvY29tcG9uZW50cy9wcm9qZWN0cy1hZG1pbi9wcm9qZWN0cy1hZG1pbi5jb21wb25lbnQudHMiLCJuZzovL3Byb2plY3RzLWxpYi9saWIvY29tcG9uZW50cy9wcm9qZWN0cy1icmllZi9wcm9qZWN0cy1icmllZi5jb21wb25lbnQudHMiLCJuZzovL3Byb2plY3RzLWxpYi9saWIvY29tcG9uZW50cy9wcm9qZWN0cy1jcmVhdGUvcHJvamVjdHMtY3JlYXRlLmNvbXBvbmVudC50cyIsIm5nOi8vcHJvamVjdHMtbGliL2xpYi9jb21wb25lbnRzL3Byb2plY3RzLWRldGFpbHMvcHJvamVjdHMtZGV0YWlscy5jb21wb25lbnQudHMiLCJuZzovL3Byb2plY3RzLWxpYi9saWIvY29tcG9uZW50cy9wcm9qZWN0cy1saXN0L3Byb2plY3RzLWxpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9wcm9qZWN0cy1saWIvbGliL3Byb2plY3RzLWxpYi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVzZXIsIFVzZXJzIH0gZnJvbSAnLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcblxuZXhwb3J0IGNsYXNzIFVzZXJzQWRtaW5TZXJ2aWNlIHtcbiAgICBkZWZhdWx0VXNlcjogc3RyaW5nO1xuLy8gICBwcml2YXRlIHVzZXJzOiBVc2VycztcbiAgcHVibGljIGN1cnJlbnRVc2VyOiBPYnNlcnZhYmxlPFVzZXI+O1xuLy8gICBwdWJsaWMgY3VycmVudFVzZXJJbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7XG4gICAgdGhpcy5kZWZhdWx0VXNlciA9ICdhc3NldHMvZGVmYXVsdHMvdGstZGVmYXVsdC11c2VyLmpzb24nO1xuICB9XG5cbi8vICAgcHJpdmF0ZSBzZXRVc2VyUHJvamVjdCh1c2VySW5kZXgpIHtcbi8vICAgICB0aGlzLmN1cnJlbnRVc2VySW5kZXggPSB1c2VySW5kZXg7XG4vLyAgICAgdGhpcy5jdXJyZW50VXNlciA9IHRoaXMudXNlcnNbdGhpcy5jdXJyZW50VXNlckluZGV4XTtcbi8vICAgICB0aGlzLmN1cnJlbnRVc2VyLnN1YnNjcmliZSh1c3IgPT4gY29uc29sZS5sb2coJ1NldCBjdXJyZW50IHVzZXI6ICcsIHVzci5mdWxsbmFtZSkpO1xuLy8gICB9XG5cbiAgcHVibGljIGxvYWREZWZhdWx0VXNlcigpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICBjb25zb2xlLmxvZygnTG9hZGluZyBkZWZhdWx0IHVzZXIuLi4nKTtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlciA9IHRoaXMuaHR0cENsaWVudC5nZXQ8VXNlcj4odGhpcy5kZWZhdWx0VXNlcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudFVzZXIoKTogT2JzZXJ2YWJsZTxVc2VyPiAge1xuICAgIC8vIHRoaXMuY3VycmVudFVzZXIuc3Vic2NyaWJlKHVzciA9PiBjb25zb2xlLmxvZygnUmV0dXJuaW5nIGN1cnJlbnQgdXNlcjogJywgdXNyLnRpdGxlKSk7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXI7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICduZ3gtc3RvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFByb2plY3QsIFByb2plY3RzIH0gZnJvbSAnLi9tb2RlbHMvcHJvamVjdC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcblxuZXhwb3J0IGNsYXNzIFByb2plY3RzTGliU2VydmljZSB7XG4gIC8vIFVzZXIgcHJvamVjdHMgc3RyZWFtXG4gIHByaXZhdGUgcHJvamVjdHNTdHJlYW1Vcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBwcm9qZWN0c1N0cmVhbTogQmVoYXZpb3JTdWJqZWN0PFByb2plY3RzPjtcbiAgcHVibGljIHByb2plY3RzOiBPYnNlcnZhYmxlPFByb2plY3RzPjtcbiAgLy8gQ3VycmVudCBwcm9qZWN0IHN0cmVhbVxuICBwcml2YXRlIGN1cnJlbnRQcm9qZWN0U3RyZWFtOiBCZWhhdmlvclN1YmplY3Q8UHJvamVjdD47XG4gIC8vIHB1YmxpYyBjdXJyZW50UHJvamVjdDogT2JzZXJ2YWJsZTxQcm9qZWN0PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgcHVibGljIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2VcbiAgICApIHtcbiAgICB0aGlzLnByb2plY3RzU3RyZWFtVXJsID0gJ2Fzc2V0cy9kZWZhdWx0cy90ay1kZWZhdWx0LXByb2plY3RzLmpzb24nO1xuICAgIHRoaXMucHJvamVjdHNTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2plY3RzPihudWxsKTtcbiAgICB0aGlzLnByb2plY3RzID0gdGhpcy5wcm9qZWN0c1N0cmVhbS5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0U3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9qZWN0PihudWxsKTtcbiAgICAvLyB0aGlzLmN1cnJlbnRQcm9qZWN0ID0gdGhpcy5jdXJyZW50UHJvamVjdFN0cmVhbS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8vIFNhbWUgYXMgYWJvdmU/XG4gIGdldCBjdXJyZW50UHJvamVjdCgpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50UHJvamVjdFN0cmVhbS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUHJvamVjdHMocHJvamVjdHNBcnJheSkge1xuICAgIHRoaXMucHJvamVjdHNTdHJlYW0ubmV4dChwcm9qZWN0c0FycmF5KTtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdwcm9qZWN0cycsIHByb2plY3RzQXJyYXkpO1xuICAgIHRoaXMuc2V0UHJvamVjdCgpO1xuICB9XG5cbiAgcHVibGljIGxvYWRQcm9qZWN0cygpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9qZWN0c1Jlc291cmNlID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgncHJvamVjdHMnKTtcbiAgICBpZiAoIXByb2plY3RzUmVzb3VyY2UpIHtcbiAgICAgIHRoaXMuaHR0cENsaWVudC5nZXQ8UHJvamVjdHM+KHRoaXMucHJvamVjdHNTdHJlYW1VcmwpXG4gICAgICAuc3Vic2NyaWJlKHByb2plY3RzQXJyYXkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZVByb2plY3RzKHByb2plY3RzQXJyYXkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlUHJvamVjdHMocHJvamVjdHNSZXNvdXJjZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFByb2plY3QocHJvamVjdD8pOiB2b2lkIHtcbiAgICBsZXQgdGhlUHJvamVjdCA9IG51bGw7XG4gICAgaWYgKHByb2plY3QpIHtcbiAgICAgIHRoZVByb2plY3QgPSB0aGlzLnByb2plY3RzXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKHByanMgPT4gcHJqc1xuICAgICAgICAgIC5maW5kKHByaiA9PiBwcmoudGl0bGUgPT09IHByb2plY3QudGl0bGUpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoZVByb2plY3QgPSB0aGlzLnByb2plY3RzXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgbWFwKHByanMgPT4gcHJqc1swXSlcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoZVByb2plY3QpO1xuICAgIHRoaXMuY3VycmVudFByb2plY3RTdHJlYW0ubmV4dCh0aGVQcm9qZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyAgZ2V0UHJvamVjdChwcm9qZWN0KTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFByb2plY3Q7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJvamVjdChwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdHNBcnJheSA9IFsgLi4udGhpcy5wcm9qZWN0c1N0cmVhbS5nZXRWYWx1ZSgpLCBwcm9qZWN0IF07XG4gICAgdGhpcy51cGRhdGVQcm9qZWN0cyhwcm9qZWN0c0FycmF5KTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0UHJvamVjdChwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdHNBcnJheSA9IFsgLi4udGhpcy5wcm9qZWN0c1N0cmVhbS5nZXRWYWx1ZSgpLCBwcm9qZWN0IF07XG4gICAgdGhpcy51cGRhdGVQcm9qZWN0cyhwcm9qZWN0c0FycmF5KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVQcm9qZWN0KHByb2plY3Q6IFByb2plY3QpIHtcbiAgICBjb25zdCBwcm9qZWN0c0FycmF5ID0gdGhpcy5wcm9qZWN0c1N0cmVhbS5nZXRWYWx1ZSgpLmZpbHRlcihpdGVtID0+IGl0ZW0udGl0bGUgIT09IHByb2plY3QudGl0bGUpO1xuICAgIHRoaXMudXBkYXRlUHJvamVjdHMocHJvamVjdHNBcnJheSk7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBQcm9qZWN0OiBDbGFzcyBlbmNhcHN1bGF0aW5nIGFsbCBkYXRhIHdpdGhpbiBhIFRBRGtpdCBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gJy4vcHJvamVjdC1tZXRhZGF0YS5tb2RlbCc7XG5cbi8vIGltcG9ydCB7IERhdGFzZXQgfSBmcm9tIFwiLi9wcm9qZWN0LWRhdGFzZXQubW9kZWxcIlxuLy8gaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gXCIuL3Byb2plY3Qtb3ZlcmxheS5tb2RlbFwiXG4vLyBpbXBvcnQgeyBTdG9yeWJvYXJkIH0gZnJvbSBcIi4vcHJvamVjdC1zdG9yeWJvYXJkLm1vZGVsXCJcbi8vIC8vIGltcG9ydCB7IFNwZWNpZXMgfSBmcm9tIFwiLi9wcm9qZWN0LWdlbm9taWNzLm1vZGVsXCI7XG5cbi8vIGV4cG9ydCBjbGFzcyBEYXRhc2V0cyBleHRlbmRzIEFycmF5PERhdGFzZXQ+IHt9XG4vLyBleHBvcnQgY2xhc3MgT3ZlcmxheXMgZXh0ZW5kcyBBcnJheTxPdmVybGF5PiB7fVxuLy8gZXhwb3J0IGNsYXNzIFN0b3J5Ym9hcmRzIGV4dGVuZHMgQXJyYXk8U3Rvcnlib2FyZD4ge31cblxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICBtZXRhZGF0YTogTWV0YWRhdGE7XG4gIHV1aWQ6IHN0cmluZztcbiAgcmVmOiBzdHJpbmc7IC8vIGZvciBlYXN5IHJlZmVyZW5jZSBpbiBVSS9VUklcbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgZ3JvdXA6IHN0cmluZztcbiAgc3RhdGU6IGJvb2xlYW47XG4gIGNlbGxUeXBlOiBzdHJpbmc7XG4gIHNwZWNpZXM6IHN0cmluZztcbiAgYXNzZW1ibHk6IHN0cmluZztcbiAgLy8gZGF0YXNldHM/OiBEYXRhc2V0c1tdIHwgbnVsbDtcbiAgLy8gb3ZlcmxheXM/OiBPdmVybGF5c1tdIHwgbnVsbDtcbiAgLy8gc3Rvcnlib2FyZHM/OiBTdG9yeWJvYXJkc1tdIHwgbnVsbDtcbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3RzIGV4dGVuZHMgQXJyYXk8UHJvamVjdD4ge31cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwcm9qZWN0cy1hZG1pbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9qZWN0cy1hZG1pbi5jb21wb25lbnQuaHRtbCcsXG59KVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdHNBZG1pbkNvbXBvbmVudCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzc2VzID0gJ3Byb2plY3RzJztcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9qZWN0c0xpYlNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm9qZWN0cy1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3Byb2plY3QubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwcm9qZWN0cy1icmllZicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9qZWN0cy1icmllZi5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdHNCcmllZkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbnB1YmxpYyBwcm9qZWN0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJvamVjdHNTZXJ2aWNlOiBQcm9qZWN0c0xpYlNlcnZpY2UpIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2V0UHJvamVjdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcm9qZWN0KCkge1xuICAgIHRoaXMucHJvamVjdHNTZXJ2aWNlLmN1cnJlbnRQcm9qZWN0LnN1YnNjcmliZShwcmogPT4gdGhpcy5wcm9qZWN0ID0gcHJqKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2plY3RzTGliU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb2plY3RzLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Byb2plY3RzLWNyZWF0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9qZWN0cy1jcmVhdGUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzQ3JlYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgcHJvamVjdEZvcm06IEZvcm1Hcm91cDtcbiAgcHVibGljIHRpdGxlOiBGb3JtQ29udHJvbDtcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBGb3JtQ29udHJvbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByb2plY3RzU2VydmljZTogUHJvamVjdHNMaWJTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZUZvcm1Db250cm9scygpO1xuICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVGb3JtQ29udHJvbHMoKSB7XG4gICAgdGhpcy50aXRsZSA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XG4gICAgdGhpcy5wcm9qZWN0Rm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQcm9qZWN0KCk6IHZvaWQge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb2plY3RGb3JtLnZhbHVlKTtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5hZGRQcm9qZWN0KG5ld1Byb2plY3QpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvamVjdHNMaWJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvamVjdHMtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uLy4uL21vZGVscy9wcm9qZWN0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJvamVjdHMtZGV0YWlscycsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9qZWN0cy1kZXRhaWxzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0RldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5wdWJsaWMgcHJvamVjdDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByb2plY3RzU2VydmljZTogUHJvamVjdHNMaWJTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdldFByb2plY3QoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJvamVjdCgpIHtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5jdXJyZW50UHJvamVjdC5zdWJzY3JpYmUocHJqID0+IHRoaXMucHJvamVjdCA9IHByaik7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9qZWN0c0xpYlNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm9qZWN0cy1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0cyB9IGZyb20gJy4uLy4uL21vZGVscy9wcm9qZWN0Lm1vZGVsJztcblxuaW1wb3J0IHsgQ29uZmlybWF0aW9uU2VydmljZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJvamVjdHMtbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9qZWN0cy1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJvamVjdHMtbGlzdC5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW0NvbmZpcm1hdGlvblNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIHByb2plY3RzOiBQcm9qZWN0cztcbiAgcHVibGljIGN1cnJlbnRQcm9qZWN0O1xuICAvLyBwdWJsaWMgY3VycmVudENoZWNrOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwcm9qZWN0c1NlcnZpY2U6IFByb2plY3RzTGliU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpcm1hdGlvblNlcnZpY2U6IENvbmZpcm1hdGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdldFByb2plY3RzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldFByb2plY3RzKCk6IHZvaWQge1xuICAgIHRoaXMucHJvamVjdHNTZXJ2aWNlLnByb2plY3RzLnN1YnNjcmliZShwcmpzID0+IHRoaXMucHJvamVjdHMgPSBwcmpzKTtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5jdXJyZW50UHJvamVjdC5zdWJzY3JpYmUocHJqID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBwcmo7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgIHNldFByb2plY3QocHJvamVjdCk6IHZvaWQge1xuICAgIHRoaXMucHJvamVjdHNTZXJ2aWNlLnNldFByb2plY3QocHJvamVjdCk7XG4gIH1cblxuICBwdWJsaWMgIGVkaXRQcm9qZWN0KHByb2plY3QpOiB2b2lkIHtcbiAgICAvLyBPcGVuIGRpYWxvZyB3aXRoIENyZWF0ZSBmb3JtXG4gIH1cblxuICBwdWJsaWMgIGRlbGV0ZVByb2plY3QocHJvamVjdCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlybWF0aW9uU2VydmljZS5jb25maXJtKHtcbiAgICAgIG1lc3NhZ2U6ICdBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBwcm9qZWN0JyxcbiAgICAgIGFjY2VwdDogKCkgPT4ge1xuICAgICAgICB0aGlzLnByb2plY3RzU2VydmljZS5kZWxldGVQcm9qZWN0KHByb2plY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZU1vZHVsZSB9IGZyb20gJ25neC1zdG9yZSc7XG5cbmltcG9ydCB7IFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJvZ3Jlc3NzcGlubmVyJztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7IFJhZGlvQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yYWRpb2J1dHRvbic7XG5pbXBvcnQgeyBDaGVja2JveE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY2hlY2tib3gnO1xuaW1wb3J0IHsgQ29uZmlybURpYWxvZ01vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29uZmlybWRpYWxvZyc7XG5cbmltcG9ydCB7IFByb2plY3RzQWRtaW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdHMtYWRtaW4vcHJvamVjdHMtYWRtaW4uY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0cy1saXN0L3Byb2plY3RzLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RzQnJpZWZDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdHMtYnJpZWYvcHJvamVjdHMtYnJpZWYuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RzRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0cy1kZXRhaWxzL3Byb2plY3RzLWRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RzQ3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3RzLWNyZWF0ZS9wcm9qZWN0cy1jcmVhdGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFdlYlN0b3JhZ2VNb2R1bGUsXG4gICAgUHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIEJ1dHRvbk1vZHVsZSxcbiAgICBSYWRpb0J1dHRvbk1vZHVsZSxcbiAgICBDaGVja2JveE1vZHVsZSxcbiAgICBDb25maXJtRGlhbG9nTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFByb2plY3RzQWRtaW5Db21wb25lbnQsXG4gICAgUHJvamVjdHNMaXN0Q29tcG9uZW50LFxuICAgIFByb2plY3RzQnJpZWZDb21wb25lbnQsXG4gICAgUHJvamVjdHNEZXRhaWxzQ29tcG9uZW50LFxuICAgIFByb2plY3RzQ3JlYXRlQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQcm9qZWN0c0FkbWluQ29tcG9uZW50LFxuICAgIFByb2plY3RzTGlzdENvbXBvbmVudCxcbiAgICBQcm9qZWN0c0JyaWVmQ29tcG9uZW50LFxuICAgIFByb2plY3RzRGV0YWlsc0NvbXBvbmVudCxcbiAgICBQcm9qZWN0c0NyZWF0ZUNvbXBvbmVudCxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdHNMaWJNb2R1bGUge31cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7SUFlRSxZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsc0NBQXNDLENBQUM7S0FDM0Q7Ozs7Ozs7OztJQVFNLGVBQWU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDdkU7Ozs7SUFFTSxjQUFjOztRQUVuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDekI7OztZQTVCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQU5RLFVBQVU7Ozs7Ozs7O0FDRG5COzs7Ozs7SUFxQkUsWUFDVSxVQUFzQixFQUN2QixtQkFBd0M7UUFEdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN2Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBRS9DLElBQUksQ0FBQyxpQkFB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