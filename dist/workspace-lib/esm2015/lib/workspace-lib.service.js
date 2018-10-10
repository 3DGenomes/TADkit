/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-store';
import { Widget } from './widget-spawner/widget';
import * as genomicsWidgets from 'genomics-lib';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-store";
export class WorkspaceService {
    /**
     * @param {?} httpClient
     * @param {?} localStorageService
     */
    constructor(httpClient, localStorageService) {
        this.httpClient = httpClient;
        this.localStorageService = localStorageService;
        this.widgetsStreamUrl = 'assets/defaults/tk-default-workspace.json';
        this.widgetsStream = new BehaviorSubject([]);
        this.widgets = this.widgetsStream.asObservable();
    }
    /**
     * @param {?} widgetsArray
     * @return {?}
     */
    updateWidgets(widgetsArray) {
        this.widgetsStream.next(widgetsArray);
        // this.localStorageService.set('workspace', widgetsArray);
    }
    /**
     * @return {?}
     */
    loadWidgets() {
        // const widgetsStored = this.localStorageService.get('workspace');
        // if (!widgetsStored) {
        //   this.httpClient.get<Widget[]>(this.widgetsStreamUrl)
        //   .subscribe(widgetArray => {
        //     this.updateWidgets(widgetArray);
        //   });
        // } else {
        /** @type {?} */
        let widgets = [];
        /** @type {?} */
        const data = { title: 'title', state: false };
        this.widgets.subscribe(wdgt => widgets = wdgt);
        if (!Array.isArray(widgets) || !widgets.length) {
            // Default Widgets
            this.addWidgets('GenomicsThreejsComponent', 'GenomicsMatrixComponent', 'GenomicsInfoComponent', 'GenomicsTracksComponent');
        }
        // }
    }
    /**
     * @param {...?} widgetNamesArray
     * @return {?}
     */
    addWidgets(...widgetNamesArray) {
        /** @type {?} */
        const widgetsArray = [...this.widgetsStream.getValue()];
        widgetNamesArray.forEach(widgetName => {
            /** @type {?} */
            const widgetComponent = genomicsWidgets[widgetName];
            // if (!widgetName) {}; // USE DEFAULT???
            /** @type {?} */
            const newWidget = new Widget(widgetComponent, null);
            widgetsArray.push(newWidget);
        });
        this.updateWidgets(widgetsArray);
    }
    /**
     * @param {?} widgetName
     * @return {?}
     */
    removeWidget(widgetName) {
        this.widgets.subscribe(wdgt => console.log(wdgt));
        // const widgetsArray = this.widgetsStream.getValue().filter(item => item.data.title !== widgetName);
        // this.updateWidgets(widgetsArray);
    }
}
WorkspaceService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
WorkspaceService.ctorParameters = () => [
    { type: HttpClient },
    { type: LocalStorageService }
];
/** @nocollapse */ WorkspaceService.ngInjectableDef = i0.defineInjectable({ factory: function WorkspaceService_Factory() { return new WorkspaceService(i0.inject(i1.HttpClient), i0.inject(i2.LocalStorageService)); }, token: WorkspaceService, providedIn: "root" });
if (false) {
    /** @type {?} */
    WorkspaceService.prototype.widgetsStreamUrl;
    /** @type {?} */
    WorkspaceService.prototype.widgetsStream;
    /** @type {?} */
    WorkspaceService.prototype.widgets;
    /** @type {?} */
    WorkspaceService.prototype.httpClient;
    /** @type {?} */
    WorkspaceService.prototype.localStorageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLWxpYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vd29ya3NwYWNlLWxpYi8iLCJzb3VyY2VzIjpbImxpYi93b3Jrc3BhY2UtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWtCLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVoRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFakQsT0FBTyxLQUFLLGVBQWUsTUFBTSxjQUFjLENBQUM7Ozs7QUFNaEQsTUFBTTs7Ozs7SUFLSixZQUNVLFVBQXNCLEVBQ3RCLG1CQUF3QztRQUR4QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFFaEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLDJDQUEyQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7Ozs7O0lBRU8sYUFBYSxDQUFDLFlBQVk7UUFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMsMkRBQTJEO0lBQzdELENBQUM7Ozs7SUFFTSxXQUFXOzs7Ozs7Ozs7WUFRVixPQUFPLEdBQUcsRUFBRTs7Y0FDVixJQUFJLEdBQUcsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQzlDLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsVUFBVSxDQUNiLDBCQUEwQixFQUMxQix5QkFBeUIsRUFDekIsdUJBQXVCLEVBQ3ZCLHlCQUF5QixDQUMxQixDQUFDO1NBQ0g7UUFDRCxJQUFJO0lBQ1IsQ0FBQzs7Ozs7SUFFTSxVQUFVLENBQUMsR0FBRyxnQkFBMEI7O2NBQ3ZDLFlBQVksR0FBRyxDQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBRTtRQUN6RCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7O2tCQUM5QixlQUFlLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQzs7O2tCQUU3QyxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQztZQUNuRCxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVNLFlBQVksQ0FBQyxVQUFrQjtRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRCxxR0FBcUc7UUFDckcsb0NBQW9DO0lBQ3RDLENBQUM7OztZQTdERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQVZRLFVBQVU7WUFFVixtQkFBbUI7Ozs7O0lBVzFCLDRDQUFpQzs7SUFDakMseUNBQWlEOztJQUNqRCxtQ0FBcUM7O0lBR25DLHNDQUE4Qjs7SUFDOUIsK0NBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICduZ3gtc3RvcmUnO1xuaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSAnLi9sYXlvdXRzL2xheW91dCc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuL3dpZGdldC1zcGF3bmVyL3dpZGdldCc7XG5cbmltcG9ydCAqIGFzIGdlbm9taWNzV2lkZ2V0cyBmcm9tICdnZW5vbWljcy1saWInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB3aWRnZXRzU3RyZWFtVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgd2lkZ2V0c1N0cmVhbTogQmVoYXZpb3JTdWJqZWN0PFdpZGdldFtdPjtcbiAgcHVibGljIHdpZGdldHM6IE9ic2VydmFibGU8V2lkZ2V0W10+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMud2lkZ2V0c1N0cmVhbVVybCA9ICdhc3NldHMvZGVmYXVsdHMvdGstZGVmYXVsdC13b3Jrc3BhY2UuanNvbic7XG4gICAgdGhpcy53aWRnZXRzU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXaWRnZXRbXT4oW10pO1xuICAgIHRoaXMud2lkZ2V0cyA9IHRoaXMud2lkZ2V0c1N0cmVhbS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlV2lkZ2V0cyh3aWRnZXRzQXJyYXkpIHtcbiAgICB0aGlzLndpZGdldHNTdHJlYW0ubmV4dCh3aWRnZXRzQXJyYXkpO1xuICAgIC8vIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ3dvcmtzcGFjZScsIHdpZGdldHNBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgbG9hZFdpZGdldHMoKTogdm9pZCB7XG4gICAgLy8gY29uc3Qgd2lkZ2V0c1N0b3JlZCA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ3dvcmtzcGFjZScpO1xuICAgIC8vIGlmICghd2lkZ2V0c1N0b3JlZCkge1xuICAgIC8vICAgdGhpcy5odHRwQ2xpZW50LmdldDxXaWRnZXRbXT4odGhpcy53aWRnZXRzU3RyZWFtVXJsKVxuICAgIC8vICAgLnN1YnNjcmliZSh3aWRnZXRBcnJheSA9PiB7XG4gICAgLy8gICAgIHRoaXMudXBkYXRlV2lkZ2V0cyh3aWRnZXRBcnJheSk7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9IGVsc2Uge1xuICAgICAgbGV0IHdpZGdldHMgPSBbXTtcbiAgICAgIGNvbnN0IGRhdGEgPSB7dGl0bGU6ICd0aXRsZScsIHN0YXRlOiBmYWxzZX07XG4gICAgICB0aGlzLndpZGdldHMuc3Vic2NyaWJlKHdkZ3QgPT4gd2lkZ2V0cyA9IHdkZ3QpO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHdpZGdldHMpIHx8ICF3aWRnZXRzLmxlbmd0aCkge1xuICAgICAgICAvLyBEZWZhdWx0IFdpZGdldHNcbiAgICAgICAgdGhpcy5hZGRXaWRnZXRzKFxuICAgICAgICAgICdHZW5vbWljc1RocmVlanNDb21wb25lbnQnLFxuICAgICAgICAgICdHZW5vbWljc01hdHJpeENvbXBvbmVudCcsXG4gICAgICAgICAgJ0dlbm9taWNzSW5mb0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0dlbm9taWNzVHJhY2tzQ29tcG9uZW50J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gfVxuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldHMoLi4ud2lkZ2V0TmFtZXNBcnJheTogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCB3aWRnZXRzQXJyYXkgPSBbIC4uLnRoaXMud2lkZ2V0c1N0cmVhbS5nZXRWYWx1ZSgpIF07XG4gICAgd2lkZ2V0TmFtZXNBcnJheS5mb3JFYWNoKHdpZGdldE5hbWUgPT4ge1xuICAgICAgY29uc3Qgd2lkZ2V0Q29tcG9uZW50ID0gZ2Vub21pY3NXaWRnZXRzW3dpZGdldE5hbWVdO1xuICAgICAgICAgIC8vIGlmICghd2lkZ2V0TmFtZSkge307IC8vIFVTRSBERUZBVUxUPz8/XG4gICAgICBjb25zdCBuZXdXaWRnZXQgPSBuZXcgV2lkZ2V0KHdpZGdldENvbXBvbmVudCwgbnVsbCk7XG4gICAgICB3aWRnZXRzQXJyYXkucHVzaChuZXdXaWRnZXQpO1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlV2lkZ2V0cyh3aWRnZXRzQXJyYXkpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZVdpZGdldCh3aWRnZXROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLndpZGdldHMuc3Vic2NyaWJlKHdkZ3QgPT4gY29uc29sZS5sb2cod2RndCkpO1xuICAgIC8vIGNvbnN0IHdpZGdldHNBcnJheSA9IHRoaXMud2lkZ2V0c1N0cmVhbS5nZXRWYWx1ZSgpLmZpbHRlcihpdGVtID0+IGl0ZW0uZGF0YS50aXRsZSAhPT0gd2lkZ2V0TmFtZSk7XG4gICAgLy8gdGhpcy51cGRhdGVXaWRnZXRzKHdpZGdldHNBcnJheSk7XG4gIH1cblxufVxuIl19