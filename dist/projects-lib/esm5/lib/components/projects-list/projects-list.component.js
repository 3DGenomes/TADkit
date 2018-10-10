/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
import { ConfirmationService } from 'primeng/api';
var ProjectsListComponent = /** @class */ (function () {
    // public currentCheck: string;
    function ProjectsListComponent(projectsService, confirmationService) {
        this.projectsService = projectsService;
        this.confirmationService = confirmationService;
    }
    /**
     * @return {?}
     */
    ProjectsListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.getProjects();
    };
    /**
     * @return {?}
     */
    ProjectsListComponent.prototype.getProjects = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.projectsService.projects.subscribe(function (prjs) { return _this.projects = prjs; });
        this.projectsService.currentProject.subscribe(function (prj) {
            _this.currentProject = prj;
        });
    };
    /**
     * @param {?} project
     * @return {?}
     */
    ProjectsListComponent.prototype.setProject = /**
     * @param {?} project
     * @return {?}
     */
    function (project) {
        this.projectsService.setProject(project);
    };
    /**
     * @param {?} project
     * @return {?}
     */
    ProjectsListComponent.prototype.editProject = /**
     * @param {?} project
     * @return {?}
     */
    function (project) {
        // Open dialog with Create form
    };
    /**
     * @param {?} project
     * @return {?}
     */
    ProjectsListComponent.prototype.deleteProject = /**
     * @param {?} project
     * @return {?}
     */
    function (project) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this project',
            accept: function () {
                _this.projectsService.deleteProject(project);
            }
        });
    };
    ProjectsListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'projects-list',
                    template: "<section class=\"tk-list\">\n  <h3>Projects List</h3>\n  <div *ngIf=\"projects else loading\">\n      <!-- <ng-container *ngIf=\"projects.length; else noItems\"> -->\n      <table>\n        <tr>\n          <th>Title</th>\n          <th>Description</th>\n          <th>Date</th>\n          <th>Select</th>\n          <th>Edit</th>\n          <th>Delete</th>\n        </tr>\n        <tr *ngFor=\"let project of projects\">\n          <td>{{project.title}}</td>\n          <td>{{project.description}}</td>\n          <td>{{project.date}}</td>\n          <!-- <td><p-radioButton (click)=\"setProject(project)\" name=\"selectProject\" value=\"{{project.title}}\" [(ngModel)]=\"currentCheck\"></p-radioButton></td> -->\n          <td><button (click)=\"setProject(project)\" pButton type=\"button\" icon=\"pi pi-check\" iconPos=\"left\" [ngClass]=\"{'ui-state-active': project.title === (currentProject | async)?.title }\"></button></td>\n          <td><button pButton type=\"button\" icon=\"pi pi-pencil\" iconPos=\"left\"></button></td>\n          <td><button (click)=\"deleteProject(project)\" pButton type=\"button\" icon=\"pi pi-trash\" iconPos=\"left\"></button></td>\n        </tr>\n      </table>\n      <!-- </ng-container>     -->\n      <ng-template #noItems>No Items!</ng-template>\n    </div>\n    <ng-template #loading>\n      <p-progressSpinner></p-progressSpinner>\n    </ng-template> \n</section>\n<p-confirmDialog header=\"Confirmation\" icon=\"pi pi-exclamation-triangle\" width=\"425\"></p-confirmDialog>\n",
                    providers: [ConfirmationService],
                    styles: [":host ::ng-deep th{text-align:left}"]
                }] }
    ];
    ProjectsListComponent.ctorParameters = function () { return [
        { type: ProjectsLibService },
        { type: ConfirmationService }
    ]; };
    return ProjectsListComponent;
}());
export { ProjectsListComponent };
if (false) {
    /** @type {?} */
    ProjectsListComponent.prototype.projects;
    /** @type {?} */
    ProjectsListComponent.prototype.currentProject;
    /** @type {?} */
    ProjectsListComponent.prototype.projectsService;
    /** @type {?} */
    ProjectsListComponent.prototype.confirmationService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcm9qZWN0cy1saWIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wcm9qZWN0cy1saXN0L3Byb2plY3RzLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVsRDtJQVVFLCtCQUErQjtJQUUvQiwrQkFDVSxlQUFtQyxFQUNuQyxtQkFBd0M7UUFEeEMsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBQ25DLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFDL0MsQ0FBQzs7OztJQUVHLHdDQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7O0lBRU8sMkNBQVc7OztJQUFuQjtRQUFBLGlCQUtDO1FBSkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQy9DLEtBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTywwQ0FBVTs7OztJQUFsQixVQUFtQixPQUFPO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRU8sMkNBQVc7Ozs7SUFBbkIsVUFBb0IsT0FBTztRQUN6QiwrQkFBK0I7SUFDakMsQ0FBQzs7Ozs7SUFFTyw2Q0FBYTs7OztJQUFyQixVQUFzQixPQUFPO1FBQTdCLGlCQU9DO1FBTkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztZQUMvQixPQUFPLEVBQUUsbURBQW1EO1lBQzVELE1BQU0sRUFBRTtnQkFDTixLQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBM0NGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsMi9DQUE2QztvQkFFN0MsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7O2lCQUNqQzs7O2dCQVZRLGtCQUFrQjtnQkFHbEIsbUJBQW1COztJQThDNUIsNEJBQUM7Q0FBQSxBQTVDRCxJQTRDQztTQXRDWSxxQkFBcUI7OztJQUVoQyx5Q0FBMEI7O0lBQzFCLCtDQUFzQjs7SUFJcEIsZ0RBQTJDOztJQUMzQyxvREFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvamVjdHNMaWJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvamVjdHMtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdHMgfSBmcm9tICcuLi8uLi9tb2RlbHMvcHJvamVjdC5tb2RlbCc7XG5cbmltcG9ydCB7IENvbmZpcm1hdGlvblNlcnZpY2UgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Byb2plY3RzLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvamVjdHMtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Byb2plY3RzLWxpc3QuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtDb25maXJtYXRpb25TZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBwcm9qZWN0czogUHJvamVjdHM7XG4gIHB1YmxpYyBjdXJyZW50UHJvamVjdDtcbiAgLy8gcHVibGljIGN1cnJlbnRDaGVjazogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcHJvamVjdHNTZXJ2aWNlOiBQcm9qZWN0c0xpYlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb25maXJtYXRpb25TZXJ2aWNlOiBDb25maXJtYXRpb25TZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5nZXRQcm9qZWN0cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcm9qZWN0cygpOiB2b2lkIHtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5wcm9qZWN0cy5zdWJzY3JpYmUocHJqcyA9PiB0aGlzLnByb2plY3RzID0gcHJqcyk7XG4gICAgdGhpcy5wcm9qZWN0c1NlcnZpY2UuY3VycmVudFByb2plY3Quc3Vic2NyaWJlKHByaiA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRQcm9qZWN0ID0gcHJqO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljICBzZXRQcm9qZWN0KHByb2plY3QpOiB2b2lkIHtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5zZXRQcm9qZWN0KHByb2plY3QpO1xuICB9XG5cbiAgcHVibGljICBlZGl0UHJvamVjdChwcm9qZWN0KTogdm9pZCB7XG4gICAgLy8gT3BlbiBkaWFsb2cgd2l0aCBDcmVhdGUgZm9ybVxuICB9XG5cbiAgcHVibGljICBkZWxldGVQcm9qZWN0KHByb2plY3QpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpcm1hdGlvblNlcnZpY2UuY29uZmlybSh7XG4gICAgICBtZXNzYWdlOiAnQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcHJvamVjdCcsXG4gICAgICBhY2NlcHQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9qZWN0c1NlcnZpY2UuZGVsZXRlUHJvamVjdChwcm9qZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19