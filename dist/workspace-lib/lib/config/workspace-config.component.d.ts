import { OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { WorkspaceService } from '../workspace-lib.service';
export declare class WorkspaceConfigComponent implements OnInit {
    private workspaceService;
    layouts: SelectItem[];
    layout: string;
    constructor(workspaceService: WorkspaceService);
    ngOnInit(): void;
    onChange(): void;
}
