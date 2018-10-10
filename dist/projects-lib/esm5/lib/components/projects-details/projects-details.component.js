/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
var ProjectsDetailsComponent = /** @class */ (function () {
    function ProjectsDetailsComponent(projectsService) {
        this.projectsService = projectsService;
    }
    /**
     * @return {?}
     */
    ProjectsDetailsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getProject();
    };
    /**
     * @return {?}
     */
    ProjectsDetailsComponent.prototype.getProject = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.projectsService.currentProject.subscribe(function (prj) { return _this.project = prj; });
    };
    ProjectsDetailsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'projects-details',
                    template: "<section class=\"tk-list\">\n  <h3>\n    Project: \n    <ng-container *ngIf=\"(project | async) as project; else loading\">{{project.title}}</ng-container>\n  </h3>\n  <div *ngIf=\"(project | async) as project; else loading\">\n    <table>\n      <tr><td>Title</td><td>{{project.title}}</td></tr>\n      <tr><td>Description</td><td>{{project.description}}</td></tr>\n      <tr><td>State</td><td>{{project.state}}</td></tr>\n    </table>\n    <ng-template #noItems>No Items!</ng-template>\n  </div>\n</section>\n<ng-template #loading>Loading ...<p-progressSpinner></p-progressSpinner></ng-template>"
                }] }
    ];
    ProjectsDetailsComponent.ctorParameters = function () { return [
        { type: ProjectsLibService }
    ]; };
    return ProjectsDetailsComponent;
}());
export { ProjectsDetailsComponent };
if (false) {
    /** @type {?} */
    ProjectsDetailsComponent.prototype.project;
    /** @type {?} */
    ProjectsDetailsComponent.prototype.projectsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcm9qZWN0cy1saWIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wcm9qZWN0cy1kZXRhaWxzL3Byb2plY3RzLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR2hFO0lBUUUsa0NBQW9CLGVBQW1DO1FBQW5DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtJQUFHLENBQUM7Ozs7SUFFcEQsMkNBQVE7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFTyw2Q0FBVTs7O0lBQWxCO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzNFLENBQUM7O2dCQWhCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsaW1CQUFnRDtpQkFDakQ7OztnQkFOUSxrQkFBa0I7O0lBb0IzQiwrQkFBQztDQUFBLEFBakJELElBaUJDO1NBYlksd0JBQXdCOzs7SUFFckMsMkNBQWU7O0lBRUQsbURBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2plY3RzTGliU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb2plY3RzLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi8uLi9tb2RlbHMvcHJvamVjdC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Byb2plY3RzLWRldGFpbHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvamVjdHMtZGV0YWlscy5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdHNEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxucHVibGljIHByb2plY3Q7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcm9qZWN0c1NlcnZpY2U6IFByb2plY3RzTGliU2VydmljZSkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRQcm9qZWN0KCk7XG4gIH1cblxuICBwcml2YXRlIGdldFByb2plY3QoKSB7XG4gICAgdGhpcy5wcm9qZWN0c1NlcnZpY2UuY3VycmVudFByb2plY3Quc3Vic2NyaWJlKHByaiA9PiB0aGlzLnByb2plY3QgPSBwcmopO1xuICB9XG59XG4iXX0=