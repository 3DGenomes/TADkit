/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Workspace } from './workspace';
import { BindObservable } from 'bind-observable';
import { Project } from 'projects-lib';
import { ProjectsLibService } from 'projects-lib';
import { WorkspaceColsComponent } from '../layouts/cols/workspace.component';
var WorkspaceComponent = /** @class */ (function () {
    function WorkspaceComponent(componentFactoryResolver, projectsService) {
        var _this = this;
        this.componentFactoryResolver = componentFactoryResolver;
        this.projectsService = projectsService;
        // this.workspacesStream = new BehaviorSubject<Workspace[]>([]);
        // this.workspaces = this.workspacesStream.asObservable();
        this.projectsService.currentProject.subscribe(function (prj) { return _this.data = prj; });
    }
    /**
     * @return {?}
     */
    WorkspaceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.loadWorkpace();
    };
    /**
     * @param {?=} workspaceName
     * @return {?}
     */
    WorkspaceComponent.prototype.setWorkspace = /**
     * @param {?=} workspaceName
     * @return {?}
     */
    function (workspaceName) {
        // const workspaceComponent = workspaceLayouts[workspaceName];
        // if (!workspaceName) {}; // USE DEFAULT???
        this.currentWorkspace = new Workspace(WorkspaceColsComponent, null);
    };
    /**
     * @return {?}
     */
    WorkspaceComponent.prototype.loadWorkpace = /**
     * @return {?}
     */
    function () {
        this.setWorkspace();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentWorkspace.component);
        this.routespace.clear();
        /** @type {?} */
        var componentRef = this.routespace.createComponent(componentFactory);
        (componentRef.instance).dataStream = this.dataStream;
    };
    WorkspaceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-layout',
                    template: "<ng-template #workspace></ng-template>  ",
                    styles: [":host{display:-ms-grid;display:grid}"]
                }] }
    ];
    WorkspaceComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ProjectsLibService }
    ]; };
    WorkspaceComponent.propDecorators = {
        routespace: [{ type: ViewChild, args: ['workspace', { read: ViewContainerRef },] }]
    };
    tslib_1.__decorate([
        BindObservable('dataStream'),
        tslib_1.__metadata("design:type", Project)
    ], WorkspaceComponent.prototype, "data", void 0);
    return WorkspaceComponent;
}());
export { WorkspaceComponent };
if (false) {
    /** @type {?} */
    WorkspaceComponent.prototype.routespace;
    /** @type {?} */
    WorkspaceComponent.prototype.currentWorkspace;
    /** @type {?} */
    WorkspaceComponent.prototype.data;
    /** @type {?} */
    WorkspaceComponent.prototype.dataStream;
    /** @type {?} */
    WorkspaceComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    WorkspaceComponent.prototype.projectsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dvcmtzcGFjZS1saWIvIiwic291cmNlcyI6WyJsaWIvd29ya3NwYWNlL3dvcmtzcGFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFpQixTQUFTLEVBQUUsZ0JBQWdCLEVBQUcsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJbEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFHN0U7SUFlRSw0QkFDVSx3QkFBa0QsRUFDbEQsZUFBbUM7UUFGN0MsaUJBT0M7UUFOUyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUUzQyxnRUFBZ0U7UUFDaEUsMERBQTBEO1FBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7SUFFRCxxQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFTSx5Q0FBWTs7OztJQUFuQixVQUFvQixhQUFzQjtRQUN4Qyw4REFBOEQ7UUFDOUQsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RSxDQUFDOzs7O0lBRUQseUNBQVk7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOztZQUNkLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1FBQy9HLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7O1lBQ2xCLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN0RSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN2RCxDQUFDOztnQkF4Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLG9EQUF5Qzs7aUJBRTFDOzs7Z0JBaEJnRSx3QkFBd0I7Z0JBS2hGLGtCQUFrQjs7OzZCQWF4QixTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDOztJQU1sQjtRQUE3QixjQUFjLENBQUMsWUFBWSxDQUFDOzBDQUFlLE9BQU87b0RBQUM7SUE4QnRELHlCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7U0FyQ1ksa0JBQWtCOzs7SUFDN0Isd0NBQTZEOztJQUk3RCw4Q0FBbUM7O0lBRW5DLGtDQUFvRDs7SUFDcEQsd0NBQXVDOztJQUdyQyxzREFBMEQ7O0lBQzFELDZDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmLCAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2UgfSBmcm9tICcuL3dvcmtzcGFjZSc7XG5pbXBvcnQgeyBCaW5kT2JzZXJ2YWJsZSB9IGZyb20gJ2JpbmQtb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAncHJvamVjdHMtbGliJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUHJvamVjdHNMaWJTZXJ2aWNlIH0gZnJvbSAncHJvamVjdHMtbGliJztcbi8vIGltcG9ydCAqIGFzIHdvcmtzcGFjZUxheW91dHMgZnJvbSAnd29ya3NwYWNlcy1saWInO1xuaW1wb3J0IHsgV29ya3NwYWNlRml4ZWRDb21wb25lbnQgfSBmcm9tICcuLi9sYXlvdXRzL2ZpeGVkL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya3NwYWNlUm93c0NvbXBvbmVudCB9IGZyb20gJy4uL2xheW91dHMvcm93cy93b3Jrc3BhY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtzcGFjZUNvbHNDb21wb25lbnQgfSBmcm9tICcuLi9sYXlvdXRzL2NvbHMvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VHcmlkc3RlckNvbXBvbmVudCB9IGZyb20gJy4uL2xheW91dHMvZ3JpZHN0ZXIvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dvcmtzcGFjZS1sYXlvdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd29ya3NwYWNlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd29ya3NwYWNlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnd29ya3NwYWNlJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSByb3V0ZXNwYWNlO1xuXG4gIC8vIHByaXZhdGUgd29ya3NwYWNlc1N0cmVhbTogQmVoYXZpb3JTdWJqZWN0PFdvcmtzcGFjZVtdPjtcbiAgLy8gcHVibGljIHdvcmtzcGFjZXM6IE9ic2VydmFibGU8V29ya3NwYWNlW10+O1xuICBwdWJsaWMgY3VycmVudFdvcmtzcGFjZTogV29ya3NwYWNlO1xuXG4gIEBCaW5kT2JzZXJ2YWJsZSgnZGF0YVN0cmVhbScpIHByaXZhdGUgZGF0YTogUHJvamVjdDtcbiAgcHVibGljIGRhdGFTdHJlYW06IE9ic2VydmFibGU8UHJvamVjdD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHByb2plY3RzU2VydmljZTogUHJvamVjdHNMaWJTZXJ2aWNlXG4gICkge1xuICAgIC8vIHRoaXMud29ya3NwYWNlc1N0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V29ya3NwYWNlW10+KFtdKTtcbiAgICAvLyB0aGlzLndvcmtzcGFjZXMgPSB0aGlzLndvcmtzcGFjZXNTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5wcm9qZWN0c1NlcnZpY2UuY3VycmVudFByb2plY3Quc3Vic2NyaWJlKHByaiA9PiB0aGlzLmRhdGEgPSBwcmopO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sb2FkV29ya3BhY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRXb3Jrc3BhY2Uod29ya3NwYWNlTmFtZT86IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIGNvbnN0IHdvcmtzcGFjZUNvbXBvbmVudCA9IHdvcmtzcGFjZUxheW91dHNbd29ya3NwYWNlTmFtZV07XG4gICAgLy8gaWYgKCF3b3Jrc3BhY2VOYW1lKSB7fTsgLy8gVVNFIERFRkFVTFQ/Pz9cbiAgICB0aGlzLmN1cnJlbnRXb3Jrc3BhY2UgPSBuZXcgV29ya3NwYWNlKFdvcmtzcGFjZUNvbHNDb21wb25lbnQsIG51bGwpO1xuICB9XG5cbiAgbG9hZFdvcmtwYWNlKCkge1xuICAgIHRoaXMuc2V0V29ya3NwYWNlKCk7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY3VycmVudFdvcmtzcGFjZS5jb21wb25lbnQpO1xuICAgIHRoaXMucm91dGVzcGFjZS5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMucm91dGVzcGFjZS5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgKGNvbXBvbmVudFJlZi5pbnN0YW5jZSkuZGF0YVN0cmVhbSA9IHRoaXMuZGF0YVN0cmVhbTtcbiAgfVxuXG59XG4iXX0=