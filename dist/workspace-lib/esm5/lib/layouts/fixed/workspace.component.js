/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, HostBinding } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
var WorkspaceFixedComponent = /** @class */ (function () {
    function WorkspaceFixedComponent(workspaceService) {
        var _this = this;
        this.workspaceService = workspaceService;
        this.classes = 'workspace';
        this.widgets = [];
        this.workspaceService.widgets.subscribe(function (wgts) { return _this.widgets = wgts; });
    }
    /**
     * @return {?}
     */
    WorkspaceFixedComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initializeWorkspace();
    };
    /**
     * @return {?}
     */
    WorkspaceFixedComponent.prototype.initializeWorkspace = /**
     * @return {?}
     */
    function () {
        this.workspaceService.loadWidgets();
    };
    /**
     * @param {?} widgetName
     * @return {?}
     */
    WorkspaceFixedComponent.prototype.addWidget = /**
     * @param {?} widgetName
     * @return {?}
     */
    function (widgetName) {
        this.workspaceService.addWidgets(widgetName);
    };
    WorkspaceFixedComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-layout',
                    template: "<workspace-widget *ngFor=\"let widget of widgets\" [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n",
                    styles: [":host{display:-ms-grid;display:grid;-ms-grid-columns:360px 1fr;grid-template-columns:360px 1fr;-ms-grid-rows:360px 1fr;grid-template-rows:360px 1fr;grid-gap:10px;border:8px solid #f0f0f0}"]
                }] }
    ];
    WorkspaceFixedComponent.ctorParameters = function () { return [
        { type: WorkspaceService }
    ]; };
    WorkspaceFixedComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        dataStream: [{ type: Input }]
    };
    return WorkspaceFixedComponent;
}());
export { WorkspaceFixedComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dvcmtzcGFjZS1saWIvIiwic291cmNlcyI6WyJsaWIvbGF5b3V0cy9maXhlZC93b3Jrc3BhY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHL0Q7SUFZRSxpQ0FDVSxnQkFBa0M7UUFENUMsaUJBSUM7UUFIUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBTnRCLFlBQU8sR0FBRyxXQUFXLENBQUM7UUFHckMsWUFBTyxHQUFzQixFQUFFLENBQUM7UUFLckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7SUFFTSwwQ0FBUTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRU8scURBQW1COzs7SUFBM0I7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFTSwyQ0FBUzs7OztJQUFoQixVQUFpQixVQUFVO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Z0JBNUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixvSUFBeUM7O2lCQUUxQzs7O2dCQVBRLGdCQUFnQjs7OzBCQVV0QixXQUFXLFNBQUMsT0FBTzs2QkFDbkIsS0FBSzs7SUFxQlIsOEJBQUM7Q0FBQSxBQTdCRCxJQTZCQztTQXZCWSx1QkFBdUI7OztJQUNsQywwQ0FBNEM7O0lBQzVDLDZDQUF5Qjs7SUFFekIsMENBQXVDOztJQUdyQyxtREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlRml4ZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICd3b3Jrc3BhY2UnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iXX0=