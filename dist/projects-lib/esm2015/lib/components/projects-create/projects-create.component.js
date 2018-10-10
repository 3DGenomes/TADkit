/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
import { FormGroup, FormControl } from '@angular/forms';
export class ProjectsCreateComponent {
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
if (false) {
    /** @type {?} */
    ProjectsCreateComponent.prototype.projectForm;
    /** @type {?} */
    ProjectsCreateComponent.prototype.title;
    /** @type {?} */
    ProjectsCreateComponent.prototype.description;
    /** @type {?} */
    ProjectsCreateComponent.prototype.projectsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3Byb2plY3RzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3Byb2plY3RzLWNyZWF0ZS9wcm9qZWN0cy1jcmVhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNeEQsTUFBTTs7OztJQU1KLFlBQW9CLGVBQW1DO1FBQW5DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtJQUFHLENBQUM7Ozs7SUFFcEQsUUFBUTtRQUNiLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRU8sVUFBVTtRQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksU0FBUyxDQUFDO1lBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDOUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVNLFVBQVU7O2NBQ1QsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQzVELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7OztZQWhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsdW5CQUErQzthQUNoRDs7O1lBTlEsa0JBQWtCOzs7O0lBU3pCLDhDQUE4Qjs7SUFDOUIsd0NBQTBCOztJQUMxQiw4Q0FBZ0M7O0lBRXBCLGtEQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9qZWN0c0xpYlNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm9qZWN0cy1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwcm9qZWN0cy1jcmVhdGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvamVjdHMtY3JlYXRlLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0NyZWF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIHByb2plY3RGb3JtOiBGb3JtR3JvdXA7XG4gIHB1YmxpYyB0aXRsZTogRm9ybUNvbnRyb2w7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogRm9ybUNvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcm9qZWN0c1NlcnZpY2U6IFByb2plY3RzTGliU2VydmljZSkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVGb3JtQ29udHJvbHMoKTtcbiAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRm9ybUNvbnRyb2xzKCkge1xuICAgIHRoaXMudGl0bGUgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xuICAgIHRoaXMucHJvamVjdEZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJvamVjdCgpOiB2b2lkIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9qZWN0Rm9ybS52YWx1ZSk7XG4gICAgdGhpcy5wcm9qZWN0c1NlcnZpY2UuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgfVxufVxuIl19