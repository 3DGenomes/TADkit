/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-store';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-store";
var ProjectsLibService = /** @class */ (function () {
    // public currentProject: Observable<Project>;
    function ProjectsLibService(httpClient, localStorageService) {
        this.httpClient = httpClient;
        this.localStorageService = localStorageService;
        this.projectsStreamUrl = 'assets/defaults/tk-default-projects.json';
        this.projectsStream = new BehaviorSubject(null);
        this.projects = this.projectsStream.asObservable();
        this.currentProjectStream = new BehaviorSubject(null);
        // this.currentProject = this.currentProjectStream.asObservable();
    }
    Object.defineProperty(ProjectsLibService.prototype, "currentProject", {
        // Same as above?
        get: 
        // Same as above?
        /**
         * @return {?}
         */
        function () {
            return this.currentProjectStream.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} projectsArray
     * @return {?}
     */
    ProjectsLibService.prototype.updateProjects = /**
     * @param {?} projectsArray
     * @return {?}
     */
    function (projectsArray) {
        this.projectsStream.next(projectsArray);
        this.localStorageService.set('projects', projectsArray);
        this.setProject();
    };
    /**
     * @return {?}
     */
    ProjectsLibService.prototype.loadProjects = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var projectsResource = this.localStorageService.get('projects');
        if (!projectsResource) {
            this.httpClient.get(this.projectsStreamUrl)
                .subscribe(function (projectsArray) {
                _this.updateProjects(projectsArray);
            });
        }
        else {
            this.updateProjects(projectsResource);
        }
    };
    /**
     * @param {?=} project
     * @return {?}
     */
    ProjectsLibService.prototype.setProject = /**
     * @param {?=} project
     * @return {?}
     */
    function (project) {
        /** @type {?} */
        var theProject = null;
        if (project) {
            theProject = this.projects
                .pipe(map(function (prjs) { return prjs
                .find(function (prj) { return prj.title === project.title; }); }));
        }
        else {
            theProject = this.projects
                .pipe(take(1), map(function (prjs) { return prjs[0]; }));
        }
        // console.log(theProject);
        this.currentProjectStream.next(theProject);
    };
    /**
     * @param {?} project
     * @return {?}
     */
    ProjectsLibService.prototype.getProject = /**
     * @param {?} project
     * @return {?}
     */
    function (project) {
        return this.currentProject;
    };
    /**
     * @param {?} project
     * @return {?}
     */
    ProjectsLibService.prototype.addProject = /**
     * @param {?} project
     * @return {?}
     */
    function (project) {
        /** @type {?} */
        var projectsArray = tslib_1.__spread(this.projectsStream.getValue(), [project]);
        this.updateProjects(projectsArray);
    };
    /**
     * @param {?} project
     * @return {?}
     */
    ProjectsLibService.prototype.editProject = /**
     * @param {?} project
     * @return {?}
     */
    function (project) {
        /** @type {?} */
        var projectsArray = tslib_1.__spread(this.projectsStream.getValue(), [project]);
        this.updateProjects(projectsArray);
    };
    /**
     * @param {?} project
     * @return {?}
     */
    ProjectsLibService.prototype.deleteProject = /**
     * @param {?} project
     * @return {?}
     */
    function (project) {
        /** @type {?} */
        var projectsArray = this.projectsStream.getValue().filter(function (item) { return item.title !== project.title; });
        this.updateProjects(projectsArray);
    };
    ProjectsLibService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ProjectsLibService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: LocalStorageService }
    ]; };
    /** @nocollapse */ ProjectsLibService.ngInjectableDef = i0.defineInjectable({ factory: function ProjectsLibService_Factory() { return new ProjectsLibService(i0.inject(i1.HttpClient), i0.inject(i2.LocalStorageService)); }, token: ProjectsLibService, providedIn: "root" });
    return ProjectsLibService;
}());
export { ProjectsLibService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtbGliLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcm9qZWN0cy1saWIvIiwic291cmNlcyI6WyJsaWIvcHJvamVjdHMtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFaEQsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzNDO0lBV0UsOENBQThDO0lBRTlDLDRCQUNVLFVBQXNCLEVBQ3ZCLG1CQUF3QztRQUR2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFFL0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLDBDQUEwQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVcsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztRQUMvRCxrRUFBa0U7SUFDcEUsQ0FBQztJQUdELHNCQUFJLDhDQUFjO1FBRGxCLGlCQUFpQjs7Ozs7O1FBQ2pCO1lBQ0UsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7Ozs7O0lBRU8sMkNBQWM7Ozs7SUFBdEIsVUFBdUIsYUFBYTtRQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFh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dGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnbmd4LXN0b3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0cyB9IGZyb20gJy4vbW9kZWxzL3Byb2plY3QubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0xpYlNlcnZpY2Uge1xuICAvLyBVc2VyIHByb2plY3RzIHN0cmVhbVxuICBwcml2YXRlIHByb2plY3RzU3RyZWFtVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgcHJvamVjdHNTdHJlYW06IEJlaGF2aW9yU3ViamVjdDxQcm9qZWN0cz47XG4gIHB1YmxpYyBwcm9qZWN0czogT2JzZXJ2YWJsZTxQcm9qZWN0cz47XG4gIC8vIEN1cnJlbnQgcHJvamVjdCBzdHJlYW1cbiAgcHJpdmF0ZSBjdXJyZW50UHJvamVjdFN0cmVhbTogQmVoYXZpb3JTdWJqZWN0PFByb2plY3Q+O1xuICAvLyBwdWJsaWMgY3VycmVudFByb2plY3Q6IE9ic2VydmFibGU8UHJvamVjdD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgIHB1YmxpYyBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlXG4gICAgKSB7XG4gICAgdGhpcy5wcm9qZWN0c1N0cmVhbVVybCA9ICdhc3NldHMvZGVmYXVsdHMvdGstZGVmYXVsdC1wcm9qZWN0cy5qc29uJztcbiAgICB0aGlzLnByb2plY3RzU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9qZWN0cz4obnVsbCk7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHNTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5jdXJyZW50UHJvamVjdFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvamVjdD4obnVsbCk7XG4gICAgLy8gdGhpcy5jdXJyZW50UHJvamVjdCA9IHRoaXMuY3VycmVudFByb2plY3RTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvLyBTYW1lIGFzIGFib3ZlP1xuICBnZXQgY3VycmVudFByb2plY3QoKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFByb2plY3RTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVByb2plY3RzKHByb2plY3RzQXJyYXkpIHtcbiAgICB0aGlzLnByb2plY3RzU3RyZWFtLm5leHQocHJvamVjdHNBcnJheSk7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgncHJvamVjdHMnLCBwcm9qZWN0c0FycmF5KTtcbiAgICB0aGlzLnNldFByb2plY3QoKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkUHJvamVjdHMoKTogdm9pZCB7XG4gICAgY29uc3QgcHJvamVjdHNSZXNvdXJjZSA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ3Byb2plY3RzJyk7XG4gICAgaWYgKCFwcm9qZWN0c1Jlc291cmNlKSB7XG4gICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0PFByb2plY3RzPih0aGlzLnByb2plY3RzU3RyZWFtVXJsKVxuICAgICAgLnN1YnNjcmliZShwcm9qZWN0c0FycmF5ID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0cyhwcm9qZWN0c0FycmF5KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZVByb2plY3RzKHByb2plY3RzUmVzb3VyY2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRQcm9qZWN0KHByb2plY3Q/KTogdm9pZCB7XG4gICAgbGV0IHRoZVByb2plY3QgPSBudWxsO1xuICAgIGlmIChwcm9qZWN0KSB7XG4gICAgICB0aGVQcm9qZWN0ID0gdGhpcy5wcm9qZWN0c1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChwcmpzID0+IHByanNcbiAgICAgICAgICAuZmluZChwcmogPT4gcHJqLnRpdGxlID09PSBwcm9qZWN0LnRpdGxlKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGVQcm9qZWN0ID0gdGhpcy5wcm9qZWN0c1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIG1hcChwcmpzID0+IHByanNbMF0pXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyh0aGVQcm9qZWN0KTtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0U3RyZWFtLm5leHQodGhlUHJvamVjdCk7XG4gIH1cblxuICBwdWJsaWMgIGdldFByb2plY3QocHJvamVjdCk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQcm9qZWN0O1xuICB9XG5cbiAgcHVibGljIGFkZFByb2plY3QocHJvamVjdDogUHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBbIC4uLnRoaXMucHJvamVjdHNTdHJlYW0uZ2V0VmFsdWUoKSwgcHJvamVjdCBdO1xuICAgIHRoaXMudXBkYXRlUHJvamVjdHMocHJvamVjdHNBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgZWRpdFByb2plY3QocHJvamVjdDogUHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBbIC4uLnRoaXMucHJvamVjdHNTdHJlYW0uZ2V0VmFsdWUoKSwgcHJvamVjdCBdO1xuICAgIHRoaXMudXBkYXRlUHJvamVjdHMocHJvamVjdHNBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlUHJvamVjdChwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdHNBcnJheSA9IHRoaXMucHJvamVjdHNTdHJlYW0uZ2V0VmFsdWUoKS5maWx0ZXIoaXRlbSA9PiBpdGVtLnRpdGxlICE9PSBwcm9qZWN0LnRpdGxlKTtcbiAgICB0aGlzLnVwZGF0ZVByb2plY3RzKHByb2plY3RzQXJyYXkpO1xuICB9XG5cbn1cbiJdfQ==