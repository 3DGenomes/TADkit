/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
export class ProjectsBriefComponent {
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
if (false) {
    /** @type {?} */
    ProjectsBriefComponent.prototype.project;
    /** @type {?} */
    ProjectsBriefComponent.prototype.projectsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtYnJpZWYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJvamVjdHMtbGliLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcHJvamVjdHMtYnJpZWYvcHJvamVjdHMtYnJpZWYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBT2hFLE1BQU07Ozs7SUFJSixZQUFvQixlQUFtQztRQUFuQyxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7SUFBRyxDQUFDOzs7O0lBRXBELFFBQVE7UUFDYixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7WUFoQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLDJyQkFBOEM7YUFDL0M7OztZQU5RLGtCQUFrQjs7OztJQVMzQix5Q0FBZTs7SUFFRCxpREFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvamVjdHNMaWJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvamVjdHMtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uLy4uL21vZGVscy9wcm9qZWN0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJvamVjdHMtYnJpZWYnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvamVjdHMtYnJpZWYuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzQnJpZWZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5wdWJsaWMgcHJvamVjdDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByb2plY3RzU2VydmljZTogUHJvamVjdHNMaWJTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdldFByb2plY3QoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJvamVjdCgpIHtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5jdXJyZW50UHJvamVjdC5zdWJzY3JpYmUocHJqID0+IHRoaXMucHJvamVjdCA9IHByaik7XG4gIH1cbn1cbiJdfQ==