/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
export class ProjectsDetailsComponent {
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
if (false) {
    /** @type {?} */
    ProjectsDetailsComponent.prototype.project;
    /** @type {?} */
    ProjectsDetailsComponent.prototype.projectsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcm9qZWN0cy1saWIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wcm9qZWN0cy1kZXRhaWxzL3Byb2plY3RzLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBT2hFLE1BQU07Ozs7SUFJSixZQUFvQixlQUFtQztRQUFuQyxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7SUFBRyxDQUFDOzs7O0lBRXBELFFBQVE7UUFDYixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7WUFoQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGltQkFBZ0Q7YUFDakQ7OztZQU5RLGtCQUFrQjs7OztJQVMzQiwyQ0FBZTs7SUFFRCxtREFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvamVjdHNMaWJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvamVjdHMtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uLy4uL21vZGVscy9wcm9qZWN0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJvamVjdHMtZGV0YWlscycsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9qZWN0cy1kZXRhaWxzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0RldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5wdWJsaWMgcHJvamVjdDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByb2plY3RzU2VydmljZTogUHJvamVjdHNMaWJTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdldFByb2plY3QoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJvamVjdCgpIHtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5jdXJyZW50UHJvamVjdC5zdWJzY3JpYmUocHJqID0+IHRoaXMucHJvamVjdCA9IHByaik7XG4gIH1cbn1cbiJdfQ==