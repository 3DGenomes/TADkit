import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-store';
import { Widget } from './widget-spawner/widget';
export declare class WorkspaceService {
    private httpClient;
    private localStorageService;
    private widgetsStreamUrl;
    private widgetsStream;
    widgets: Observable<Widget[]>;
    constructor(httpClient: HttpClient, localStorageService: LocalStorageService);
    private updateWidgets;
    loadWidgets(): void;
    addWidgets(...widgetNamesArray: string[]): void;
    removeWidget(widgetName: string): void;
}
