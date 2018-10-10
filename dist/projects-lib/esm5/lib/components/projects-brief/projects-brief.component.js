/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
var ProjectsBriefComponent = /** @class */ (function () {
    function ProjectsBriefComponent(projectsService) {
        this.projectsService = projectsService;
    }
    /**
     * @return {?}
     */
    ProjectsBriefComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getProject();
    };
    /**
     * @return {?}
     */
    ProjectsBriefComponent.prototype.getProject = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.projectsService.currentProject.subscribe(function (prj) { return _this.project = prj; });
    };
    ProjectsBriefComponent.decorators = [
        { type: Component, args: [{
                    selector: 'projects-brief',
                    template: "<section class=\"tk-list\">\n  <h3>\n    Project: \n    <ng-container *ngIf=\"(project | async) as project; else loading\">{{project.title}}</ng-container>\n  </h3>\n  <div *ngIf=\"(project | async) as project; else loading\">\n    <table>\n      <tr><td>Title</td><td>{{project.title}}</td></tr>\n      <tr><td>Description</td><td>{{project.description}}</td></tr>\n      <tr><td>State</td><td>{{project.state}}</td></tr>\n    </table>\n    <ng-template #noItems>No Items!</ng-template>\n  </div>\n  <ng-template #loading>\n    <p-progressSpinner></p-progressSpinner>\n  </ng-template> \n</section>\n<ng-template #loading>Loading ...<p-progressSpinner></p-progressSpinner></ng-template>"
                }] }
    ];
    ProjectsBriefComponent.ctorParameters = function () { return [
        { type: ProjectsLibService }
    ]; };
    return ProjectsBriefComponent;
}());
export { ProjectsBriefComponent };
if (false) {
    /** @type {?} */
    ProjectsBriefComponent.prototype.project;
    /** @type {?} */
    ProjectsBriefComponent.prototype.projectsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtYnJpZWYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJvamVjdHMtbGliLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcHJvamVjdHMtYnJpZWYvcHJvamVjdHMtYnJpZWYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR2hFO0lBUUUsZ0NBQW9CLGVBQW1DO1FBQW5DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtJQUFHLENBQUM7Ozs7SUFFcEQseUNBQVE7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFTywyQ0FBVTs7O0lBQWxCO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzNFLENBQUM7O2dCQWhCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsMnJCQUE4QztpQkFDL0M7OztnQkFOUSxrQkFBa0I7O0lBb0IzQiw2QkFBQztDQUFBLEFBakJELElBaUJDO1NBYlksc0JBQXNCOzs7SUFFbkMseUNBQWU7O0lBRUQsaURBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2plY3RzTGliU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb2plY3RzLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi8uLi9tb2RlbHMvcHJvamVjdC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Byb2plY3RzLWJyaWVmJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2plY3RzLWJyaWVmLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0JyaWVmQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxucHVibGljIHByb2plY3Q7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcm9qZWN0c1NlcnZpY2U6IFByb2plY3RzTGliU2VydmljZSkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRQcm9qZWN0KCk7XG4gIH1cblxuICBwcml2YXRlIGdldFByb2plY3QoKSB7XG4gICAgdGhpcy5wcm9qZWN0c1NlcnZpY2UuY3VycmVudFByb2plY3Quc3Vic2NyaWJlKHByaiA9PiB0aGlzLnByb2plY3QgPSBwcmopO1xuICB9XG59XG4iXX0=