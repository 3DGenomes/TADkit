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
export class WorkspaceComponent {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} projectsService
     */
    constructor(componentFactoryResolver, projectsService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.projectsService = projectsService;
        // this.workspacesStream = new BehaviorSubject<Workspace[]>([]);
        // this.workspaces = this.workspacesStream.asObservable();
        this.projectsService.currentProject.subscribe(prj => this.data = prj);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadWorkpace();
    }
    /**
     * @param {?=} workspaceName
     * @return {?}
     */
    setWorkspace(workspaceName) {
        // const workspaceComponent = workspaceLayouts[workspaceName];
        // if (!workspaceName) {}; // USE DEFAULT???
        this.currentWorkspace = new Workspace(WorkspaceColsComponent, null);
    }
    /**
     * @return {?}
     */
    loadWorkpace() {
        this.setWorkspace();
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentWorkspace.component);
        this.routespace.clear();
        /** @type {?} */
        const componentRef = this.routespace.createComponent(componentFactory);
        (componentRef.instance).dataStream = this.dataStream;
    }
}
WorkspaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-layout',
                template: "<ng-template #workspace></ng-template>  ",
                styles: [":host{display:-ms-grid;display:grid}"]
            }] }
];
WorkspaceComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ProjectsLibService }
];
WorkspaceComponent.propDecorators = {
    routespace: [{ type: ViewChild, args: ['workspace', { read: ViewContainerRef },] }]
};
tslib_1.__decorate([
    BindObservable('dataStream'),
    tslib_1.__metadata("design:type", Project)
], WorkspaceComponent.prototype, "data", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dvcmtzcGFjZS1saWIvIiwic291cmNlcyI6WyJsaWIvd29ya3NwYWNlL3dvcmtzcGFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFpQixTQUFTLEVBQUUsZ0JBQWdCLEVBQUcsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJbEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFRN0UsTUFBTTs7Ozs7SUFVSixZQUNVLHdCQUFrRCxFQUNsRCxlQUFtQztRQURuQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUUzQyxnRUFBZ0U7UUFDaEUsMERBQTBEO1FBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFTSxZQUFZLENBQUMsYUFBc0I7UUFDeEMsOERBQThEO1FBQzlELDRDQUE0QztRQUM1QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxTQUFTLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7O2NBQ2QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7UUFDL0csSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Y0FDbEIsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1FBQ3RFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3ZELENBQUM7OztZQXhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsb0RBQXlDOzthQUUxQzs7O1lBaEJnRSx3QkFBd0I7WUFLaEYsa0JBQWtCOzs7eUJBYXhCLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7O0FBTWxCO0lBQTdCLGNBQWMsQ0FBQyxZQUFZLENBQUM7c0NBQWUsT0FBTztnREFBQzs7O0lBTnBELHdDQUE2RDs7SUFJN0QsOENBQW1DOztJQUVuQyxrQ0FBb0Q7O0lBQ3BELHdDQUF1Qzs7SUFHckMsc0RBQTBEOztJQUMxRCw2Q0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV29ya3NwYWNlIH0gZnJvbSAnLi93b3Jrc3BhY2UnO1xuaW1wb3J0IHsgQmluZE9ic2VydmFibGUgfSBmcm9tICdiaW5kLW9ic2VydmFibGUnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJ3Byb2plY3RzLWxpYic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFByb2plY3RzTGliU2VydmljZSB9IGZyb20gJ3Byb2plY3RzLWxpYic7XG4vLyBpbXBvcnQgKiBhcyB3b3Jrc3BhY2VMYXlvdXRzIGZyb20gJ3dvcmtzcGFjZXMtbGliJztcbmltcG9ydCB7IFdvcmtzcGFjZUZpeGVkQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5b3V0cy9maXhlZC93b3Jrc3BhY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtzcGFjZVJvd3NDb21wb25lbnQgfSBmcm9tICcuLi9sYXlvdXRzL3Jvd3Mvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VDb2xzQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5b3V0cy9jb2xzL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya3NwYWNlR3JpZHN0ZXJDb21wb25lbnQgfSBmcm9tICcuLi9sYXlvdXRzL2dyaWRzdGVyL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3dvcmtzcGFjZScsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcm91dGVzcGFjZTtcblxuICAvLyBwcml2YXRlIHdvcmtzcGFjZXNTdHJlYW06IEJlaGF2aW9yU3ViamVjdDxXb3Jrc3BhY2VbXT47XG4gIC8vIHB1YmxpYyB3b3Jrc3BhY2VzOiBPYnNlcnZhYmxlPFdvcmtzcGFjZVtdPjtcbiAgcHVibGljIGN1cnJlbnRXb3Jrc3BhY2U6IFdvcmtzcGFjZTtcblxuICBAQmluZE9ic2VydmFibGUoJ2RhdGFTdHJlYW0nKSBwcml2YXRlIGRhdGE6IFByb2plY3Q7XG4gIHB1YmxpYyBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPFByb2plY3Q+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBwcm9qZWN0c1NlcnZpY2U6IFByb2plY3RzTGliU2VydmljZVxuICApIHtcbiAgICAvLyB0aGlzLndvcmtzcGFjZXNTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdvcmtzcGFjZVtdPihbXSk7XG4gICAgLy8gdGhpcy53b3Jrc3BhY2VzID0gdGhpcy53b3Jrc3BhY2VzU3RyZWFtLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMucHJvamVjdHNTZXJ2aWNlLmN1cnJlbnRQcm9qZWN0LnN1YnNjcmliZShwcmogPT4gdGhpcy5kYXRhID0gcHJqKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZFdvcmtwYWNlKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0V29ya3NwYWNlKHdvcmtzcGFjZU5hbWU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBjb25zdCB3b3Jrc3BhY2VDb21wb25lbnQgPSB3b3Jrc3BhY2VMYXlvdXRzW3dvcmtzcGFjZU5hbWVdO1xuICAgIC8vIGlmICghd29ya3NwYWNlTmFtZSkge307IC8vIFVTRSBERUZBVUxUPz8/XG4gICAgdGhpcy5jdXJyZW50V29ya3NwYWNlID0gbmV3IFdvcmtzcGFjZShXb3Jrc3BhY2VDb2xzQ29tcG9uZW50LCBudWxsKTtcbiAgfVxuXG4gIGxvYWRXb3JrcGFjZSgpIHtcbiAgICB0aGlzLnNldFdvcmtzcGFjZSgpO1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmN1cnJlbnRXb3Jrc3BhY2UuY29tcG9uZW50KTtcbiAgICB0aGlzLnJvdXRlc3BhY2UuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLnJvdXRlc3BhY2UuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIChjb21wb25lbnRSZWYuaW5zdGFuY2UpLmRhdGFTdHJlYW0gPSB0aGlzLmRhdGFTdHJlYW07XG4gIH1cblxufVxuIl19