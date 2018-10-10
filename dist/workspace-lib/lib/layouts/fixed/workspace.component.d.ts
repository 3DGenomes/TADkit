import { OnInit } from '@angular/core';
import { WorkspaceService } from '../../workspace-lib.service';
import { WidgetComponent } from '../../widget-spawner/widget.component';
export declare class WorkspaceFixedComponent implements OnInit {
    private workspaceService;
    classes: string;
    dataStream: any;
    widgets: WidgetComponent[];
    constructor(workspaceService: WorkspaceService);
    ngOnInit(): void;
    private initializeWorkspace;
    addWidget(widgetName: any): void;
}
