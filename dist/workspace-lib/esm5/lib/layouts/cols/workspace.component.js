/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
var WorkspaceColsComponent = /** @class */ (function () {
    function WorkspaceColsComponent(workspaceService) {
        var _this = this;
        this.workspaceService = workspaceService;
        this.classes = 'content cols';
        this.widgets = [];
        this.workspaceService.widgets.subscribe(function (wgts) { return _this.widgets = wgts; });
    }
    /**
     * @return {?}
     */
    WorkspaceColsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initializeWorkspace();
    };
    /**
     * @return {?}
     */
    WorkspaceColsComponent.prototype.initializeWorkspace = /**
     * @return {?}
     */
    function () {
        this.workspaceService.loadWidgets();
    };
    /**
     * @param {?} widgetName
     * @return {?}
     */
    WorkspaceColsComponent.prototype.addWidget = /**
     * @param {?} widgetName
     * @return {?}
     */
    function (widgetName) {
        this.workspaceService.addWidgets(widgetName);
    };
    WorkspaceColsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-layout',
                    template: "<rsz-layout class=\"row\" [directions]=\"['right']\" [rFlex]=\"true\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i;\">\n\t<rsz-layout *ngIf=\"i===0\" class=\"cell\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t</rsz-layout>\n\t<rsz-layout *ngIf=\"i===2\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n<rsz-layout class=\"row\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i;\">\n\t\t<rsz-layout *ngIf=\"i===1\" class=\"cell\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i===3\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n",
                    styles: [""]
                }] }
    ];
    WorkspaceColsComponent.ctorParameters = function () { return [
        { type: WorkspaceService }
    ]; };
    WorkspaceColsComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        dataStream: [{ type: Input }]
    };
    return WorkspaceColsComponent;
}());
export { WorkspaceColsComponent };
if (false) {
    /** @type {?} */
    WorkspaceColsComponent.prototype.classes;
    /** @type {?} */
    WorkspaceColsComponent.prototype.dataStream;
    /** @type {?} */
    WorkspaceColsComponent.prototype.widgets;
    /** @type {?} */
    WorkspaceColsComponent.prototype.workspaceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dvcmtzcGFjZS1saWIvIiwic291cmNlcyI6WyJsaWIvbGF5b3V0cy9jb2xzL3dvcmtzcGFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUcvRDtJQVlFLGdDQUNVLGdCQUFrQztRQUQ1QyxpQkFJQztRQUhTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFOdEIsWUFBTyxHQUFHLGNBQWMsQ0FBQztRQUd4QyxZQUFPLEdBQXNCLEVBQUUsQ0FBQztRQUtyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDdkUsQ0FBQzs7OztJQUVNLHlDQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTyxvREFBbUI7OztJQUEzQjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVNLDBDQUFTOzs7O0lBQWhCLFVBQWlCLFVBQVU7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDOztnQkE1QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLDBvQ0FBeUM7O2lCQUUxQzs7O2dCQVBRLGdCQUFnQjs7OzBCQVV0QixXQUFXLFNBQUMsT0FBTzs2QkFDbkIsS0FBSzs7SUFxQlIsNkJBQUM7Q0FBQSxBQTdCRCxJQTZCQztTQXZCWSxzQkFBc0I7OztJQUNqQyx5Q0FBK0M7O0lBQy9DLDRDQUF5Qjs7SUFFekIseUNBQXVDOztJQUdyQyxrREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlQ29sc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzc2VzID0gJ2NvbnRlbnQgY29scyc7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcblxuICBwdWJsaWMgd2lkZ2V0czogV2lkZ2V0Q29tcG9uZW50W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHdvcmtzcGFjZVNlcnZpY2U6IFdvcmtzcGFjZVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS53aWRnZXRzLnN1YnNjcmliZSh3Z3RzID0+IHRoaXMud2lkZ2V0cyA9IHdndHMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZVdvcmtzcGFjZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplV29ya3NwYWNlKCk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5sb2FkV2lkZ2V0cygpO1xuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldCh3aWRnZXROYW1lKTogdm9pZCB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmFkZFdpZGdldHMod2lkZ2V0TmFtZSk7XG4gIH1cbn1cbiJdfQ==