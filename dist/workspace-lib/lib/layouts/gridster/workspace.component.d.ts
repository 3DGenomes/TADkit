import { OnInit } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
import { WidgetComponent } from '../../widget-spawner/widget.component';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
export declare class WorkspaceGridsterComponent implements OnInit {
    private workspaceService;
    classes: string;
    dataStream: any;
    widgets: WidgetComponent[];
    options: GridsterConfig;
    dashboard: GridsterItem[];
    onResize(event: any): void;
    constructor(workspaceService: WorkspaceService);
    ngOnInit(): void;
    private initializeWorkspace;
    addWidget(widgetName: any): void;
}
