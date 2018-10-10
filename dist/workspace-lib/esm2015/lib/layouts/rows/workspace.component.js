/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
export class WorkspaceRowsComponent {
    /**
     * @param {?} workspaceService
     */
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
        this.classes = 'content';
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
WorkspaceRowsComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-layout',
                template: "<rsz-layout class=\"row\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i; even as flex;\">\n\t\t<rsz-layout *ngIf=\"i<2 && flex\" class=\"cell\" [directions]=\"['right']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i<2 && !flex\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n<rsz-layout class=\"row\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i; even as flex;\">\n\t\t<rsz-layout *ngIf=\"i>1 && flex\" class=\"cell\" [directions]=\"['right']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i>1 && !flex\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n",
                styles: [""]
            }] }
];
WorkspaceRowsComponent.ctorParameters = () => [
    { type: WorkspaceService }
];
WorkspaceRowsComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class',] }],
    dataStream: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dvcmtzcGFjZS1saWIvIiwic291cmNlcyI6WyJsaWIvbGF5b3V0cy9yb3dzL3dvcmtzcGFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQVMvRCxNQUFNOzs7O0lBTUosWUFDVSxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQU50QixZQUFPLEdBQUcsU0FBUyxDQUFDO1FBR25DLFlBQU8sR0FBc0IsRUFBRSxDQUFDO1FBS3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDOzs7O0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRU0sU0FBUyxDQUFDLFVBQVU7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7WUE1QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHlzQ0FBeUM7O2FBRTFDOzs7WUFQUSxnQkFBZ0I7OztzQkFVdEIsV0FBVyxTQUFDLE9BQU87eUJBQ25CLEtBQUs7Ozs7SUFETix5Q0FBMEM7O0lBQzFDLDRDQUF5Qjs7SUFFekIseUNBQXVDOztJQUdyQyxrREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlUm93c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzc2VzID0gJ2NvbnRlbnQnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iXX0=