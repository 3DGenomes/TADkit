/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { WorkspaceService } from '../workspace-lib.service';
// import { Layout } from '../layouts/layout';
export class WorkspaceConfigComponent {
    /**
     * @param {?} workspaceService
     */
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
        this.layout = 'fixed';
        this.layouts = [
            { label: 'Fixed', value: 'fixed' },
            { label: 'Rows', value: 'rows' },
            { label: 'Columns', value: 'cols' },
            { label: 'Gridster', value: 'gridster' }
        ];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // this.form = new FormGroup({
        //   title: new FormControl()
        // });
    }
    /**
     * @return {?}
     */
    onChange() {
        // this.workspaceService.layouts.subscribe(lyts => this.layouts = lyts);
        console.log(this.layout);
    }
}
WorkspaceConfigComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-config',
                template: "<h2>Workspace Config</h2>\n<p-dropdown [options]=\"layouts\" [(ngModel)]=\"layout\" (onChange)=\"onChange()\"></p-dropdown>\n<p>Selected Layout: {{layout || 'none'}}</p>\n\n",
                styles: [""]
            }] }
];
WorkspaceConfigComponent.ctorParameters = () => [
    { type: WorkspaceService }
];
if (false) {
    /** @type {?} */
    WorkspaceConfigComponent.prototype.layouts;
    /** @type {?} */
    WorkspaceConfigComponent.prototype.layout;
    /** @type {?} */
    WorkspaceConfigComponent.prototype.workspaceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLWNvbmZpZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly93b3Jrc3BhY2UtbGliLyIsInNvdXJjZXMiOlsibGliL2NvbmZpZy93b3Jrc3BhY2UtY29uZmlnLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBUTVELE1BQU07Ozs7SUFJSixZQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUYvQyxXQUFNLEdBQUcsT0FBTyxDQUFDO1FBR3RCLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQztZQUNqQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztZQUMvQixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztZQUNsQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBQztTQUN4QyxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELFFBQVE7UUFDTiw4QkFBOEI7UUFDOUIsNkJBQTZCO1FBQzdCLE1BQU07SUFDUixDQUFDOzs7O0lBRU0sUUFBUTtRQUNiLHdFQUF3RTtRQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHlMQUFnRDs7YUFFakQ7OztZQVBRLGdCQUFnQjs7OztJQVN2QiwyQ0FBNkI7O0lBQzdCLDBDQUF3Qjs7SUFFWixvREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbi8vIGltcG9ydCB7IExheW91dCB9IGZyb20gJy4uL2xheW91dHMvbGF5b3V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd29ya3NwYWNlLWNvbmZpZycsXG4gIHRlbXBsYXRlVXJsOiAnLi93b3Jrc3BhY2UtY29uZmlnLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd29ya3NwYWNlLWNvbmZpZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZUNvbmZpZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBsYXlvdXRzOiBTZWxlY3RJdGVtW107XG4gIHB1YmxpYyBsYXlvdXQgPSAnZml4ZWQnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd29ya3NwYWNlU2VydmljZTogV29ya3NwYWNlU2VydmljZSkge1xuICAgIHRoaXMubGF5b3V0cyA9IFtcbiAgICAgIHsgbGFiZWw6ICdGaXhlZCcsIHZhbHVlOiAnZml4ZWQnfSxcbiAgICAgIHsgbGFiZWw6ICdSb3dzJywgdmFsdWU6ICdyb3dzJ30sXG4gICAgICB7IGxhYmVsOiAnQ29sdW1ucycsIHZhbHVlOiAnY29scyd9LFxuICAgICAgeyBsYWJlbDogJ0dyaWRzdGVyJywgdmFsdWU6ICdncmlkc3Rlcid9XG4gICAgXTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgIC8vICAgdGl0bGU6IG5ldyBGb3JtQ29udHJvbCgpXG4gICAgLy8gfSk7XG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2UoKSB7XG4gICAgLy8gdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmxheW91dHMuc3Vic2NyaWJlKGx5dHMgPT4gdGhpcy5sYXlvdXRzID0gbHl0cyk7XG4gICAgY29uc29sZS5sb2codGhpcy5sYXlvdXQpO1xuICB9XG5cbn1cbiJdfQ==