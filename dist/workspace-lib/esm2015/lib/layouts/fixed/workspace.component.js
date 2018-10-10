/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, HostBinding } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
export class WorkspaceFixedComponent {
    /**
     * @param {?} workspaceService
     */
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
        this.classes = 'workspace';
        this.widgets = [];
        this.workspaceService.widgets.subscribe(wgts => this.widgets = wgts);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initializeWorkspace();
    }
    /**
     * @return {?}
     */
    initializeWorkspace() {
        this.workspaceService.loadWidgets();
    }
    /**
     * @param {?} widgetName
     * @return {?}
     */
    addWidget(widgetName) {
        this.workspaceService.addWidgets(widgetName);
    }
}
WorkspaceFixedComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-layout',
                template: "<workspace-widget *ngFor=\"let widget of widgets\" [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n",
                styles: [":host{display:-ms-grid;display:grid;-ms-grid-columns:360px 1fr;grid-template-columns:360px 1fr;-ms-grid-rows:360px 1fr;grid-template-rows:360px 1fr;grid-gap:10px;border:8px solid #f0f0f0}"]
            }] }
];
WorkspaceFixedComponent.ctorParameters = () => [
    { type: WorkspaceService }
];
WorkspaceFixedComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class',] }],
    dataStream: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    WorkspaceFixedComponent.prototype.classes;
    /** @type {?} */
    WorkspaceFixedComponent.prototype.dataStream;
    /** @type {?} */
    WorkspaceFixedComponent.prototype.widgets;
    /** @type {?} */
    WorkspaceFixedComponent.prototype.workspaceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dvcmtzcGFjZS1saWIvIiwic291cmNlcyI6WyJsaWIvbGF5b3V0cy9maXhlZC93b3Jrc3BhY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFTL0QsTUFBTTs7OztJQU1KLFlBQ1UsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFOdEIsWUFBTyxHQUFHLFdBQVcsQ0FBQztRQUdyQyxZQUFPLEdBQXNCLEVBQUUsQ0FBQztRQUtyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQzs7OztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRU8sbUJBQW1CO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVNLFNBQVMsQ0FBQyxVQUFVO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7O1lBNUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixvSUFBeUM7O2FBRTFDOzs7WUFQUSxnQkFBZ0I7OztzQkFVdEIsV0FBVyxTQUFDLE9BQU87eUJBQ25CLEtBQUs7Ozs7SUFETiwwQ0FBNEM7O0lBQzVDLDZDQUF5Qjs7SUFFekIsMENBQXVDOztJQUdyQyxtREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlRml4ZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICd3b3Jrc3BhY2UnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iXX0=