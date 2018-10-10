/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input, HostListener } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
var WorkspaceGridsterComponent = /** @class */ (function () {
    function WorkspaceGridsterComponent(workspaceService) {
        var _this = this;
        this.workspaceService = workspaceService;
        this.classes = 'workspace';
        this.widgets = [];
        /* Areas attributes not official Gridster value but to help idenitification */
        this.dashboard = [
            { area: 'spatial', cols: 3, rows: 3, x: 0, y: 0 },
            { area: 'matrix', cols: 9, rows: 3, x: 3, y: 0 },
            { area: 'info', cols: 3, rows: 3, x: 0, y: 3 },
            { area: 'tracks', cols: 9, rows: 3, x: 3, y: 3 }
        ];
        this.options = {
            pushItems: true,
            minCols: 6,
            maxCols: 12,
            minRows: 6,
            mobileBreakpoint: 768,
            gridType: 'fit',
            resizable: {
                enabled: true
            },
            draggable: {
                enabled: false
            },
            margin: 8
        };
        this.workspaceService.widgets.subscribe(function (wgts) { return _this.widgets = wgts; });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    WorkspaceGridsterComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.options.api && this.options.api.resize) {
            console.log('resizing');
            this.options.api.resize();
        }
    };
    /**
     * @return {?}
     */
    WorkspaceGridsterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initializeWorkspace();
    };
    /**
     * @return {?}
     */
    WorkspaceGridsterComponent.prototype.initializeWorkspace = /**
     * @return {?}
     */
    function () {
        this.workspaceService.loadWidgets();
    };
    /**
     * @param {?} widgetName
     * @return {?}
     */
    WorkspaceGridsterComponent.prototype.addWidget = /**
     * @param {?} widgetName
     * @return {?}
     */
    function (widgetName) {
        this.workspaceService.addWidgets(widgetName);
    };
    WorkspaceGridsterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-layout',
                    template: "<gridster [options]=\"options\">\n    <gridster-item [item]=\"item\" *ngFor=\"let item of dashboard; index as i\">\n        <workspace-widget [widget]=\"widgets[i]\" [dataStream]=\"dataStream\"></workspace-widget>\n    </gridster-item>\n</gridster>\n",
                    styles: ["gridster{background:#f0f0f0}"]
                }] }
    ];
    WorkspaceGridsterComponent.ctorParameters = function () { return [
        { type: WorkspaceService }
    ]; };
    WorkspaceGridsterComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        dataStream: [{ type: Input }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return WorkspaceGridsterComponent;
}());
export { WorkspaceGridsterComponent };
if (false) {
    /** @type {?} */
    WorkspaceGridsterComponent.prototype.classes;
    /** @type {?} */
    WorkspaceGridsterComponent.prototype.dataStream;
    /** @type {?} */
    WorkspaceGridsterComponent.prototype.widgets;
    /** @type {?} */
    WorkspaceGridsterComponent.prototype.options;
    /** @type {?} */
    WorkspaceGridsterComponent.prototype.dashboard;
    /** @type {?} */
    WorkspaceGridsterComponent.prototype.workspaceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dvcmtzcGFjZS1saWIvIiwic291cmNlcyI6WyJsaWIvbGF5b3V0cy9ncmlkc3Rlci93b3Jrc3BhY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSS9EO0lBc0JFLG9DQUNVLGdCQUFrQztRQUQ1QyxpQkE0QkM7UUEzQlMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWhCdEIsWUFBTyxHQUFHLFdBQVcsQ0FBQztRQUdyQyxZQUFPLEdBQXNCLEVBQUUsQ0FBQztRQWVyQyw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQy9DLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQy9DLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBSyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQy9DLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1NBQ2hELENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUM7WUFDVixnQkFBZ0IsRUFBRSxHQUFHO1lBQ3JCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsU0FBUyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFLENBQUM7U0FDWCxDQUFDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7O0lBbkNELDZDQUFROzs7O0lBRFIsVUFDUyxLQUFLO1FBQ1osSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFnQ00sNkNBQVE7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVPLHdEQUFtQjs7O0lBQTNCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRU0sOENBQVM7Ozs7SUFBaEIsVUFBaUIsVUFBVTtRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7O2dCQTlERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsc1FBQXlDOztpQkFFMUM7OztnQkFSUSxnQkFBZ0I7OzswQkFXdEIsV0FBVyxTQUFDLE9BQU87NkJBQ25CLEtBQUs7MkJBTUwsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFpRDNDLGlDQUFDO0NBQUEsQUEvREQsSUErREM7U0F6RFksMEJBQTBCOzs7SUFDckMsNkNBQTRDOztJQUM1QyxnREFBeUI7O0lBRXpCLDZDQUF1Qzs7SUFDdkMsNkNBQStCOztJQUMvQiwrQ0FBaUM7O0lBVy9CLHNEQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBIb3N0TGlzdGVuZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV29ya3NwYWNlU2VydmljZSB9IGZyb20gJy4uLy4uL3dvcmtzcGFjZS1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi93aWRnZXQtc3Bhd25lci93aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IEdyaWRzdGVyQ29uZmlnLCBHcmlkc3Rlckl0ZW0gfSBmcm9tICdhbmd1bGFyLWdyaWRzdGVyMic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dvcmtzcGFjZS1sYXlvdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd29ya3NwYWNlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd29ya3NwYWNlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VHcmlkc3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzc2VzID0gJ3dvcmtzcGFjZSc7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcblxuICBwdWJsaWMgd2lkZ2V0czogV2lkZ2V0Q29tcG9uZW50W10gPSBbXTtcbiAgcHVibGljIG9wdGlvbnM6IEdyaWRzdGVyQ29uZmlnO1xuICBwdWJsaWMgZGFzaGJvYXJkOiBHcmlkc3Rlckl0ZW1bXTtcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmFwaSAmJiB0aGlzLm9wdGlvbnMuYXBpLnJlc2l6ZSkge1xuICAgICAgY29uc29sZS5sb2coJ3Jlc2l6aW5nJyk7XG4gICAgICB0aGlzLm9wdGlvbnMuYXBpLnJlc2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgd29ya3NwYWNlU2VydmljZTogV29ya3NwYWNlU2VydmljZSxcbiAgKSB7XG4gICAgLyogQXJlYXMgYXR0cmlidXRlcyBub3Qgb2ZmaWNpYWwgR3JpZHN0ZXIgdmFsdWUgYnV0IHRvIGhlbHAgaWRlbml0aWZpY2F0aW9uICovXG4gICAgdGhpcy5kYXNoYm9hcmQgPSBbXG4gICAgICB7YXJlYTogJ3NwYXRpYWwnLCBjb2xzOiAzLCByb3dzOiAzLCB4OiAwLCB5OiAwfSxcbiAgICAgIHthcmVhOiAnbWF0cml4JywgIGNvbHM6IDksIHJvd3M6IDMsIHg6IDMsIHk6IDB9LFxuICAgICAge2FyZWE6ICdpbmZvJywgICAgY29sczogMywgcm93czogMywgeDogMCwgeTogM30sXG4gICAgICB7YXJlYTogJ3RyYWNrcycsICBjb2xzOiA5LCByb3dzOiAzLCB4OiAzLCB5OiAzfVxuICAgIF07XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBwdXNoSXRlbXM6IHRydWUsXG4gICAgICBtaW5Db2xzOiA2LFxuICAgICAgbWF4Q29sczogMTIsXG4gICAgICBtaW5Sb3dzOiA2LFxuICAgICAgbW9iaWxlQnJlYWtwb2ludDogNzY4LFxuICAgICAgZ3JpZFR5cGU6ICdmaXQnLFxuICAgICAgcmVzaXphYmxlOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGRyYWdnYWJsZToge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAgbWFyZ2luOiA4XG4gICB9O1xuXG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLndpZGdldHMuc3Vic2NyaWJlKHdndHMgPT4gdGhpcy53aWRnZXRzID0gd2d0cyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplV29ya3NwYWNlKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVXb3Jrc3BhY2UoKTogdm9pZCB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmxvYWRXaWRnZXRzKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkV2lkZ2V0KHdpZGdldE5hbWUpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UuYWRkV2lkZ2V0cyh3aWRnZXROYW1lKTtcbiAgfVxufVxuIl19