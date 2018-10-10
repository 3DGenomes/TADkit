/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
var WorkspaceRowsComponent = /** @class */ (function () {
    function WorkspaceRowsComponent(workspaceService) {
        var _this = this;
        this.workspaceService = workspaceService;
        this.classes = 'content';
        this.widgets = [];
        this.workspaceService.widgets.subscribe(function (wgts) { return _this.widgets = wgts; });
    }
    /**
     * @return {?}
     */
    WorkspaceRowsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initializeWorkspace();
    };
    /**
     * @return {?}
     */
    WorkspaceRowsComponent.prototype.initializeWorkspace = /**
     * @return {?}
     */
    function () {
        this.workspaceService.loadWidgets();
    };
    /**
     * @param {?} widgetName
     * @return {?}
     */
    WorkspaceRowsComponent.prototype.addWidget = /**
     * @param {?} widgetName
     * @return {?}
     */
    function (widgetName) {
        this.workspaceService.addWidgets(widgetName);
    };
    WorkspaceRowsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-layout',
                    template: "<rsz-layout class=\"row\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i; even as flex;\">\n\t\t<rsz-layout *ngIf=\"i<2 && flex\" class=\"cell\" [directions]=\"['right']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i<2 && !flex\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n<rsz-layout class=\"row\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i; even as flex;\">\n\t\t<rsz-layout *ngIf=\"i>1 && flex\" class=\"cell\" [directions]=\"['right']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i>1 && !flex\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n",
                    styles: [""]
                }] }
    ];
    WorkspaceRowsComponent.ctorParameters = function () { return [
        { type: WorkspaceService }
    ]; };
    WorkspaceRowsComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        dataStream: [{ type: Input }]
    };
    return WorkspaceRowsComponent;
}());
export { WorkspaceRowsComponent };
if (false) {
    /** @type {?} */
    WorkspaceRowsComponent.prototype.classes;
    /** @type {?} */
    WorkspaceRowsComponent.prototype.dataStream;
    /** @type {?} */
    WorkspaceRowsComponent.prototype.widgets;
    /** @type {?} */
    WorkspaceRowsComponent.prototype.workspaceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dvcmtzcGFjZS1saWIvIiwic291cmNlcyI6WyJsaWIvbGF5b3V0cy9yb3dzL3dvcmtzcGFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUcvRDtJQVlFLGdDQUNVLGdCQUFrQztRQUQ1QyxpQkFJQztRQUhTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFOdEIsWUFBTyxHQUFHLFNBQVMsQ0FBQztRQUduQyxZQUFPLEdBQXNCLEVBQUUsQ0FBQztRQUtyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDdkUsQ0FBQzs7OztJQUVNLHlDQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTyxvREFBbUI7OztJQUEzQjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVNLDBDQUFTOzs7O0lBQWhCLFVBQWlCLFVBQVU7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDOztnQkE1QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLHlzQ0FBeUM7O2lCQUUxQzs7O2dCQVBRLGdCQUFnQjs7OzBCQVV0QixXQUFXLFNBQUMsT0FBTzs2QkFDbkIsS0FBSzs7SUFxQlIsNkJBQUM7Q0FBQSxBQTdCRCxJQTZCQztTQXZCWSxzQkFBc0I7OztJQUNqQyx5Q0FBMEM7O0lBQzFDLDRDQUF5Qjs7SUFFekIseUNBQXVDOztJQUdyQyxrREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlUm93c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzc2VzID0gJ2NvbnRlbnQnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iXX0=