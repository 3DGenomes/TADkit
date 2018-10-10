/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
import { ConfirmationService } from 'primeng/api';
export class ProjectsListComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcm9qZWN0cy1saWIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wcm9qZWN0cy1saXN0L3Byb2plY3RzLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVFsRCxNQUFNOzs7Ozs7SUFNSixZQUNVLGVBQW1DLEVBQ25DLG1CQUF3QztRQUR4QyxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFDbkMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUMvQyxDQUFDOzs7O0lBRUcsUUFBUTtRQUNiLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7O0lBRU8sV0FBVztRQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNsRCxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU8sVUFBVSxDQUFDLE9BQU87UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFTyxXQUFXLENBQUMsT0FBTztRQUN6QiwrQkFBK0I7SUFDakMsQ0FBQzs7Ozs7SUFFTyxhQUFhLENBQUMsT0FBTztRQUMzQixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDO1lBQy9CLE9BQU8sRUFBRSxtREFBbUQ7WUFDNUQsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDWCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsMi9DQUE2QztnQkFFN0MsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7O2FBQ2pDOzs7WUFWUSxrQkFBa0I7WUFHbEIsbUJBQW1COzs7O0lBVTFCLHlDQUEwQjs7SUFDMUIsK0NBQXNCOztJQUlwQixnREFBMkM7O0lBQzNDLG9EQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9qZWN0c0xpYlNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm9qZWN0cy1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0cyB9IGZyb20gJy4uLy4uL21vZGVscy9wcm9qZWN0Lm1vZGVsJztcblxuaW1wb3J0IHsgQ29uZmlybWF0aW9uU2VydmljZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJvamVjdHMtbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9qZWN0cy1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJvamVjdHMtbGlzdC5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW0NvbmZpcm1hdGlvblNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIHByb2plY3RzOiBQcm9qZWN0cztcbiAgcHVibGljIGN1cnJlbnRQcm9qZWN0O1xuICAvLyBwdWJsaWMgY3VycmVudENoZWNrOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwcm9qZWN0c1NlcnZpY2U6IFByb2plY3RzTGliU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpcm1hdGlvblNlcnZpY2U6IENvbmZpcm1hdGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdldFByb2plY3RzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldFByb2plY3RzKCk6IHZvaWQge1xuICAgIHRoaXMucHJvamVjdHNTZXJ2aWNlLnByb2plY3RzLnN1YnNjcmliZShwcmpzID0+IHRoaXMucHJvamVjdHMgPSBwcmpzKTtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5jdXJyZW50UHJvamVjdC5zdWJzY3JpYmUocHJqID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBwcmo7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgIHNldFByb2plY3QocHJvamVjdCk6IHZvaWQge1xuICAgIHRoaXMucHJvamVjdHNTZXJ2aWNlLnNldFByb2plY3QocHJvamVjdCk7XG4gIH1cblxuICBwdWJsaWMgIGVkaXRQcm9qZWN0KHByb2plY3QpOiB2b2lkIHtcbiAgICAvLyBPcGVuIGRpYWxvZyB3aXRoIENyZWF0ZSBmb3JtXG4gIH1cblxuICBwdWJsaWMgIGRlbGV0ZVByb2plY3QocHJvamVjdCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlybWF0aW9uU2VydmljZS5jb25maXJtKHtcbiAgICAgIG1lc3NhZ2U6ICdBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBwcm9qZWN0JyxcbiAgICAgIGFjY2VwdDogKCkgPT4ge1xuICAgICAgICB0aGlzLnByb2plY3RzU2VydmljZS5kZWxldGVQcm9qZWN0KHByb2plY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=