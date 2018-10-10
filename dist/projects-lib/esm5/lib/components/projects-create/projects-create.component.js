/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { ProjectsLibService } from '../../projects-lib.service';
import { FormGroup, FormControl } from '@angular/forms';
var ProjectsCreateComponent = /** @class */ (function () {
    function ProjectsCreateComponent(projectsService) {
        this.projectsService = projectsService;
    }
    /**
     * @return {?}
     */
    ProjectsCreateComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createFormControls();
        this.createForm();
    };
    /**
     * @return {?}
     */
    ProjectsCreateComponent.prototype.createFormControls = /**
     * @return {?}
     */
    function () {
        this.title = new FormControl('');
        this.description = new FormControl('');
    };
    /**
     * @return {?}
     */
    ProjectsCreateComponent.prototype.createForm = /**
     * @return {?}
     */
    function () {
        this.projectForm = new FormGroup({
            title: this.title,
            description: this.description,
        });
    };
    /**
     * @return {?}
     */
    ProjectsCreateComponent.prototype.addProject = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var newProject = Object.assign({}, this.projectForm.value);
        this.projectsService.addProject(newProject);
    };
    ProjectsCreateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'projects-create',
                    template: "<section class=\"tk-form\">\n  <h3>Create New Project:</h3>\n  <form novalidate [formGroup]=\"projectForm\" (ngSubmit)=\"addProject()\" class=\"ui-inputgroup\">\n    <span class=\"ui-inputgroup-addon\"><i class=\"pi pi-user\"></i></span>\n    <label>Project Title:</label>\n    <input type=\"text\" formControlName=\"title\">\n    <span class=\"ui-inputgroup-addon\"><i class=\"pi pi-user\"></i></span>\n    <label>Description:</label>\n    <input type=\"text\" formControlName=\"description\">\n    <button pButton type=\"submit\" icon=\"pi pi-check\" iconPos=\"left\" label=\"Submit\"></button>\n  </form>\n</section>"
                }] }
    ];
    ProjectsCreateComponent.ctorParameters = function () { return [
        { type: ProjectsLibService }
    ]; };
    return ProjectsCreateComponent;
}());
export { ProjectsCreateComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3Byb2plY3RzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3Byb2plY3RzLWNyZWF0ZS9wcm9qZWN0cy1jcmVhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQ7SUFVRSxpQ0FBb0IsZUFBbUM7UUFBbkMsb0JBQWUsR0FBZixlQUFlLENBQW9CO0lBQUcsQ0FBQzs7OztJQUVwRCwwQ0FBUTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVPLG9EQUFrQjs7O0lBQTFCO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFFTyw0Q0FBVTs7O0lBQWxCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFNBQVMsQ0FBQztZQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzlCLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFTSw0Q0FBVTs7O0lBQWpCOztZQUNRLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUM1RCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QyxDQUFDOztnQkFoQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLHVuQkFBK0M7aUJBQ2hEOzs7Z0JBTlEsa0JBQWtCOztJQW9DM0IsOEJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQTdCWSx1QkFBdUI7OztJQUVsQyw4Q0FBOEI7O0lBQzlCLHdDQUEwQjs7SUFDMUIsOENBQWdDOztJQUVwQixrREFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvamVjdHNMaWJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvamVjdHMtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncHJvamVjdHMtY3JlYXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2plY3RzLWNyZWF0ZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdHNDcmVhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBwcm9qZWN0Rm9ybTogRm9ybUdyb3VwO1xuICBwdWJsaWMgdGl0bGU6IEZvcm1Db250cm9sO1xuICBwdWJsaWMgZGVzY3JpcHRpb246IEZvcm1Db250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJvamVjdHNTZXJ2aWNlOiBQcm9qZWN0c0xpYlNlcnZpY2UpIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlRm9ybUNvbnRyb2xzKCk7XG4gICAgdGhpcy5jcmVhdGVGb3JtKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUZvcm1Db250cm9scygpIHtcbiAgICB0aGlzLnRpdGxlID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcbiAgICB0aGlzLnByb2plY3RGb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZFByb2plY3QoKTogdm9pZCB7XG4gICAgY29uc3QgbmV3UHJvamVjdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvamVjdEZvcm0udmFsdWUpO1xuICAgIHRoaXMucHJvamVjdHNTZXJ2aWNlLmFkZFByb2plY3QobmV3UHJvamVjdCk7XG4gIH1cbn1cbiJdfQ==