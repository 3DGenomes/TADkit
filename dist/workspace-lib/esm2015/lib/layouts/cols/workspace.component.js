/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
export class WorkspaceColsComponent {
    /**
     * @param {?} workspaceService
     */
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
        this.classes = 'content cols';
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
WorkspaceColsComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-layout',
                template: "<rsz-layout class=\"row\" [directions]=\"['right']\" [rFlex]=\"true\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i;\">\n\t<rsz-layout *ngIf=\"i===0\" class=\"cell\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t</rsz-layout>\n\t<rsz-layout *ngIf=\"i===2\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n<rsz-layout class=\"row\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i;\">\n\t\t<rsz-layout *ngIf=\"i===1\" class=\"cell\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i===3\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n",
                styles: [""]
            }] }
];
WorkspaceColsComponent.ctorParameters = () => [
    { type: WorkspaceService }
];
WorkspaceColsComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class',] }],
    dataStream: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dvcmtzcGFjZS1saWIvIiwic291cmNlcyI6WyJsaWIvbGF5b3V0cy9jb2xzL3dvcmtzcGFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQVMvRCxNQUFNOzs7O0lBTUosWUFDVSxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQU50QixZQUFPLEdBQUcsY0FBYyxDQUFDO1FBR3hDLFlBQU8sR0FBc0IsRUFBRSxDQUFDO1FBS3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDOzs7O0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRU0sU0FBUyxDQUFDLFVBQVU7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7WUE1QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDBvQ0FBeUM7O2FBRTFDOzs7WUFQUSxnQkFBZ0I7OztzQkFVdEIsV0FBVyxTQUFDLE9BQU87eUJBQ25CLEtBQUs7Ozs7SUFETix5Q0FBK0M7O0lBQy9DLDRDQUF5Qjs7SUFFekIseUNBQXVDOztJQUdyQyxrREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlQ29sc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzc2VzID0gJ2NvbnRlbnQgY29scyc7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcblxuICBwdWJsaWMgd2lkZ2V0czogV2lkZ2V0Q29tcG9uZW50W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHdvcmtzcGFjZVNlcnZpY2U6IFdvcmtzcGFjZVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS53aWRnZXRzLnN1YnNjcmliZSh3Z3RzID0+IHRoaXMud2lkZ2V0cyA9IHdndHMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZVdvcmtzcGFjZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplV29ya3NwYWNlKCk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5sb2FkV2lkZ2V0cygpO1xuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldCh3aWRnZXROYW1lKTogdm9pZCB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmFkZFdpZGdldHMod2lkZ2V0TmFtZSk7XG4gIH1cbn1cbiJdfQ==