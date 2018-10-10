/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-store';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-store";
export class ProjectsLibService {
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
/** @nocollapse */ ProjectsLibService.ngInjectableDef = i0.defineInjectable({ factory: function ProjectsLibService_Factory() { return new ProjectsLibService(i0.inject(i1.HttpClient), i0.inject(i2.LocalStorageService)); }, token: ProjectsLibService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ProjectsLibService.prototype.projectsStreamUrl;
    /** @type {?} */
    ProjectsLibService.prototype.projectsStream;
    /** @type {?} */
    ProjectsLibService.prototype.projects;
    /** @type {?} */
    ProjectsLibService.prototype.currentProjectStream;
    /** @type {?} */
    ProjectsLibService.prototype.httpClient;
    /** @type {?} */
    ProjectsLibService.prototype.localStorageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtbGliLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcm9qZWN0cy1saWIvIiwic291cmNlcyI6WyJsaWIvcHJvamVjdHMtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVoRCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFPM0MsTUFBTTs7Ozs7O0lBU0osWUFDVSxVQUFzQixFQUN2QixtQkFBd0M7UUFEdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN2Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBRS9DLElBQUksQ0FBQyxpQkFBaUIsR0FBRywwQ0FBMEMsQ0FBQztRQUNwRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFXLElBQUksQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFDL0Qsa0VBQWtFO0lBQ3BFLENBQUM7Ozs7O0lBR0QsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xELENBQUM7Ozs7O0lBRU8sY0FBYyxDQUFDLGFBQWE7UUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFTSxZQUFZOztjQUNYLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBVyxJQUFJLENBQUMsaUJBQWlCLENBQUM7aUJBQ3BELFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDOzs7OztJQUVNLFVBQVUsQ0FBQyxPQUFROztZQUNwQixVQUFVLEdBQUcsSUFBSTtRQUNyQixJQUFJLE9BQU8sRUFBRTtZQUNYLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUTtpQkFDekIsSUFBSSxDQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUk7aUJBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQzFDLENBQ0YsQ0FBQztTQUNIO2FBQU07WUFDTCxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVE7aUJBQ3pCLElBQUksQ0FDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3JCLENBQUM7U0FDSDtRQUNELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBRU8sVUFBVSxDQUFDLE9BQU87UUFDeEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRU0sVUFBVSxDQUFDLE9BQWdCOztjQUMxQixhQUFhLEdBQUcsQ0FBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxDQUFFO1FBQ3BFLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFTSxXQUFXLENBQUMsT0FBZ0I7O2NBQzNCLGFBQWEsR0FBRyxDQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLENBQUU7UUFDcEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVNLGFBQWEsQ0FBQyxPQUFnQjs7Y0FDN0IsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7O1lBcEZGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBVFEsVUFBVTtZQUNWLG1CQUFtQjs7Ozs7SUFZMUIsK0NBQWtDOztJQUNsQyw0Q0FBa0Q7O0lBQ2xELHNDQUFzQzs7SUFFdEMsa0RBQXVEOztJQUlyRCx3Q0FBOEI7O0lBQzlCLGlEQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnbmd4LXN0b3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0cyB9IGZyb20gJy4vbW9kZWxzL3Byb2plY3QubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0xpYlNlcnZpY2Uge1xuICAvLyBVc2VyIHByb2plY3RzIHN0cmVhbVxuICBwcml2YXRlIHByb2plY3RzU3RyZWFtVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgcHJvamVjdHNTdHJlYW06IEJlaGF2aW9yU3ViamVjdDxQcm9qZWN0cz47XG4gIHB1YmxpYyBwcm9qZWN0czogT2JzZXJ2YWJsZTxQcm9qZWN0cz47XG4gIC8vIEN1cnJlbnQgcHJvamVjdCBzdHJlYW1cbiAgcHJpdmF0ZSBjdXJyZW50UHJvamVjdFN0cmVhbTogQmVoYXZpb3JTdWJqZWN0PFByb2plY3Q+O1xuICAvLyBwdWJsaWMgY3VycmVudFByb2plY3Q6IE9ic2VydmFibGU8UHJvamVjdD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgIHB1YmxpYyBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlXG4gICAgKSB7XG4gICAgdGhpcy5wcm9qZWN0c1N0cmVhbVVybCA9ICdhc3NldHMvZGVmYXVsdHMvdGstZGVmYXVsdC1wcm9qZWN0cy5qc29uJztcbiAgICB0aGlzLnByb2plY3RzU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9qZWN0cz4obnVsbCk7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHNTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5jdXJyZW50UHJvamVjdFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvamVjdD4obnVsbCk7XG4gICAgLy8gdGhpcy5jdXJyZW50UHJvamVjdCA9IHRoaXMuY3VycmVudFByb2plY3RTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvLyBTYW1lIGFzIGFib3ZlP1xuICBnZXQgY3VycmVudFByb2plY3QoKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFByb2plY3RTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVByb2plY3RzKHByb2plY3RzQXJyYXkpIHtcbiAgICB0aGlzLnByb2plY3RzU3RyZWFtLm5leHQocHJvamVjdHNBcnJheSk7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgncHJvamVjdHMnLCBwcm9qZWN0c0FycmF5KTtcbiAgICB0aGlzLnNldFByb2plY3QoKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkUHJvamVjdHMoKTogdm9pZCB7XG4gICAgY29uc3QgcHJvamVjdHNSZXNvdXJjZSA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ3Byb2plY3RzJyk7XG4gICAgaWYgKCFwcm9qZWN0c1Jlc291cmNlKSB7XG4gICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0PFByb2plY3RzPih0aGlzLnByb2plY3RzU3RyZWFtVXJsKVxuICAgICAgLnN1YnNjcmliZShwcm9qZWN0c0FycmF5ID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0cyhwcm9qZWN0c0FycmF5KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZVByb2plY3RzKHByb2plY3RzUmVzb3VyY2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRQcm9qZWN0KHByb2plY3Q/KTogdm9pZCB7XG4gICAgbGV0IHRoZVByb2plY3QgPSBudWxsO1xuICAgIGlmIChwcm9qZWN0KSB7XG4gICAgICB0aGVQcm9qZWN0ID0gdGhpcy5wcm9qZWN0c1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChwcmpzID0+IHByanNcbiAgICAgICAgICAuZmluZChwcmogPT4gcHJqLnRpdGxlID09PSBwcm9qZWN0LnRpdGxlKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGVQcm9qZWN0ID0gdGhpcy5wcm9qZWN0c1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIG1hcChwcmpzID0+IHByanNbMF0pXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyh0aGVQcm9qZWN0KTtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0U3RyZWFtLm5leHQodGhlUHJvamVjdCk7XG4gIH1cblxuICBwdWJsaWMgIGdldFByb2plY3QocHJvamVjdCk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQcm9qZWN0O1xuICB9XG5cbiAgcHVibGljIGFkZFByb2plY3QocHJvamVjdDogUHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBbIC4uLnRoaXMucHJvamVjdHNTdHJlYW0uZ2V0VmFsdWUoKSwgcHJvamVjdCBdO1xuICAgIHRoaXMudXBkYXRlUHJvamVjdHMocHJvamVjdHNBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgZWRpdFByb2plY3QocHJvamVjdDogUHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBbIC4uLnRoaXMucHJvamVjdHNTdHJlYW0uZ2V0VmFsdWUoKSwgcHJvamVjdCBdO1xuICAgIHRoaXMudXBkYXRlUHJvamVjdHMocHJvamVjdHNBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlUHJvamVjdChwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdHNBcnJheSA9IHRoaXMucHJvamVjdHNTdHJlYW0uZ2V0VmFsdWUoKS5maWx0ZXIoaXRlbSA9PiBpdGVtLnRpdGxlICE9PSBwcm9qZWN0LnRpdGxlKTtcbiAgICB0aGlzLnVwZGF0ZVByb2plY3RzKHByb2plY3RzQXJyYXkpO1xuICB9XG5cbn1cbiJdfQ==