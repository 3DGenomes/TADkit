/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input, HostListener } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
export class WorkspaceGridsterComponent {
    /**
     * @param {?} workspaceService
     */
    constructor(workspaceService) {
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
        this.workspaceService.widgets.subscribe(wgts => this.widgets = wgts);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        if (this.options.api && this.options.api.resize) {
            console.log('resizing');
            this.options.api.resize();
        }
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
WorkspaceGridsterComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-layout',
                template: "<gridster [options]=\"options\">\n    <gridster-item [item]=\"item\" *ngFor=\"let item of dashboard; index as i\">\n        <workspace-widget [widget]=\"widgets[i]\" [dataStream]=\"dataStream\"></workspace-widget>\n    </gridster-item>\n</gridster>\n",
                styles: ["gridster{background:#f0f0f0}"]
            }] }
];
WorkspaceGridsterComponent.ctorParameters = () => [
    { type: WorkspaceService }
];
WorkspaceGridsterComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class',] }],
    dataStream: [{ type: Input }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dvcmtzcGFjZS1saWIvIiwic291cmNlcyI6WyJsaWIvbGF5b3V0cy9ncmlkc3Rlci93b3Jrc3BhY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBVS9ELE1BQU07Ozs7SUFnQkosWUFDVSxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWhCdEIsWUFBTyxHQUFHLFdBQVcsQ0FBQztRQUdyQyxZQUFPLEdBQXNCLEVBQUUsQ0FBQztRQWVyQyw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQy9DLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQy9DLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBSyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQy9DLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1NBQ2hELENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUM7WUFDVixnQkFBZ0IsRUFBRSxHQUFHO1lBQ3JCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsU0FBUyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFLENBQUM7U0FDWCxDQUFDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7O0lBbkNELFFBQVEsQ0FBQyxLQUFLO1FBQ1osSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFnQ00sUUFBUTtRQUNiLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRU0sU0FBUyxDQUFDLFVBQVU7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHNRQUF5Qzs7YUFFMUM7OztZQVJRLGdCQUFnQjs7O3NCQVd0QixXQUFXLFNBQUMsT0FBTzt5QkFDbkIsS0FBSzt1QkFNTCxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBUHpDLDZDQUE0Qzs7SUFDNUMsZ0RBQXlCOztJQUV6Qiw2Q0FBdUM7O0lBQ3ZDLDZDQUErQjs7SUFDL0IsK0NBQWlDOztJQVcvQixzREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdvcmtzcGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi93b3Jrc3BhY2UtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vd2lkZ2V0LXNwYXduZXIvd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkc3RlckNvbmZpZywgR3JpZHN0ZXJJdGVtIH0gZnJvbSAnYW5ndWxhci1ncmlkc3RlcjInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlR3JpZHN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICd3b3Jrc3BhY2UnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG4gIHB1YmxpYyBvcHRpb25zOiBHcmlkc3RlckNvbmZpZztcbiAgcHVibGljIGRhc2hib2FyZDogR3JpZHN0ZXJJdGVtW107XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hcGkgJiYgdGhpcy5vcHRpb25zLmFwaS5yZXNpemUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZXNpemluZycpO1xuICAgICAgdGhpcy5vcHRpb25zLmFwaS5yZXNpemUoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHdvcmtzcGFjZVNlcnZpY2U6IFdvcmtzcGFjZVNlcnZpY2UsXG4gICkge1xuICAgIC8qIEFyZWFzIGF0dHJpYnV0ZXMgbm90IG9mZmljaWFsIEdyaWRzdGVyIHZhbHVlIGJ1dCB0byBoZWxwIGlkZW5pdGlmaWNhdGlvbiAqL1xuICAgIHRoaXMuZGFzaGJvYXJkID0gW1xuICAgICAge2FyZWE6ICdzcGF0aWFsJywgY29sczogMywgcm93czogMywgeDogMCwgeTogMH0sXG4gICAgICB7YXJlYTogJ21hdHJpeCcsICBjb2xzOiA5LCByb3dzOiAzLCB4OiAzLCB5OiAwfSxcbiAgICAgIHthcmVhOiAnaW5mbycsICAgIGNvbHM6IDMsIHJvd3M6IDMsIHg6IDAsIHk6IDN9LFxuICAgICAge2FyZWE6ICd0cmFja3MnLCAgY29sczogOSwgcm93czogMywgeDogMywgeTogM31cbiAgICBdO1xuXG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgcHVzaEl0ZW1zOiB0cnVlLFxuICAgICAgbWluQ29sczogNixcbiAgICAgIG1heENvbHM6IDEyLFxuICAgICAgbWluUm93czogNixcbiAgICAgIG1vYmlsZUJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgIGdyaWRUeXBlOiAnZml0JyxcbiAgICAgIHJlc2l6YWJsZToge1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgIH0sXG4gICAgICBkcmFnZ2FibGU6IHtcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIG1hcmdpbjogOFxuICAgfTtcblxuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS53aWRnZXRzLnN1YnNjcmliZSh3Z3RzID0+IHRoaXMud2lkZ2V0cyA9IHdndHMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZVdvcmtzcGFjZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplV29ya3NwYWNlKCk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5sb2FkV2lkZ2V0cygpO1xuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldCh3aWRnZXROYW1lKTogdm9pZCB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmFkZFdpZGdldHMod2lkZ2V0TmFtZSk7XG4gIH1cbn1cbiJdfQ==