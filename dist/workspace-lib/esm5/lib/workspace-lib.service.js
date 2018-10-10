/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-store';
import { Widget } from './widget-spawner/widget';
import * as genomicsWidgets from 'genomics-lib';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-store";
var WorkspaceService = /** @class */ (function () {
    function WorkspaceService(httpClient, localStorageService) {
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
    WorkspaceService.prototype.updateWidgets = /**
     * @param {?} widgetsArray
     * @return {?}
     */
    function (widgetsArray) {
        this.widgetsStream.next(widgetsArray);
        // this.localStorageService.set('workspace', widgetsArray);
    };
    /**
     * @return {?}
     */
    WorkspaceService.prototype.loadWidgets = /**
     * @return {?}
     */
    function () {
        // const widgetsStored = this.localStorageService.get('workspace');
        // if (!widgetsStored) {
        //   this.httpClient.get<Widget[]>(this.widgetsStreamUrl)
        //   .subscribe(widgetArray => {
        //     this.updateWidgets(widgetArray);
        //   });
        // } else {
        /** @type {?} */
        var widgets = [];
        /** @type {?} */
        var data = { title: 'title', state: false };
        this.widgets.subscribe(function (wdgt) { return widgets = wdgt; });
        if (!Array.isArray(widgets) || !widgets.length) {
            // Default Widgets
            this.addWidgets('GenomicsThreejsComponent', 'GenomicsMatrixComponent', 'GenomicsInfoComponent', 'GenomicsTracksComponent');
        }
        // }
    };
    /**
     * @param {...?} widgetNamesArray
     * @return {?}
     */
    WorkspaceService.prototype.addWidgets = /**
     * @param {...?} widgetNamesArray
     * @return {?}
     */
    function () {
        var widgetNamesArray = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgetNamesArray[_i] = arguments[_i];
        }
        /** @type {?} */
        var widgetsArray = tslib_1.__spread(this.widgetsStream.getValue());
        widgetNamesArray.forEach(function (widgetName) {
            /** @type {?} */
            var widgetComponent = genomicsWidgets[widgetName];
            // if (!widgetName) {}; // USE DEFAULT???
            /** @type {?} */
            var newWidget = new Widget(widgetComponent, null);
            widgetsArray.push(newWidget);
        });
        this.updateWidgets(widgetsArray);
    };
    /**
     * @param {?} widgetName
     * @return {?}
     */
    WorkspaceService.prototype.removeWidget = /**
     * @param {?} widgetName
     * @return {?}
     */
    function (widgetName) {
        this.widgets.subscribe(function (wdgt) { return console.log(wdgt); });
        // const widgetsArray = this.widgetsStream.getValue().filter(item => item.data.title !== widgetName);
        // this.updateWidgets(widgetsArray);
    };
    WorkspaceService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    WorkspaceService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: LocalStorageService }
    ]; };
    /** @nocollapse */ WorkspaceService.ngInjectableDef = i0.defineInjectable({ factory: function WorkspaceService_Factory() { return new WorkspaceService(i0.inject(i1.HttpClient), i0.inject(i2.LocalStorageService)); }, token: WorkspaceService, providedIn: "root" });
    return WorkspaceService;
}());
export { WorkspaceService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLWxpYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vd29ya3NwYWNlLWxpYi8iLCJzb3VyY2VzIjpbImxpYi93b3Jrc3BhY2UtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFrQixNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFaEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sS0FBSyxlQUFlLE1BQU0sY0FBYyxDQUFDOzs7O0FBRWhEO0lBU0UsMEJBQ1UsVUFBc0IsRUFDdEIsbUJBQXdDO1FBRHhDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUVoRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsMkNBQTJDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFTyx3Q0FBYTs7OztJQUFyQixVQUFzQixZQUFZO1FBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RDLDJEQUEyRDtJQUM3RCxDQUFDOzs7O0lBRU0sc0NBQVc7OztJQUFsQjs7Ozs7Ozs7O1lBUVEsT0FBTyxHQUFHLEVBQUU7O1lBQ1YsSUFBSSxHQUFHLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxHQUFHLElBQUksRUFBZCxDQUFjLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDOUMsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxVQUFVLENBQ2IsMEJBQTBCLEVBQzFCLHlCQUF5QixFQUN6Qix1QkFBdUIsRUFDdkIseUJBQXlCLENBQzFCLENBQUM7U0FDSDtRQUNELElBQUk7SUFDUixDQUFDOzs7OztJQUVNLHFDQUFVOzs7O0lBQWpCO1FBQWtCLDBCQUE2QjthQUE3QixVQUE2QixFQUE3QixxQkFBNkIsRUFBN0IsSUFBNkI7WUFBN0IscUNBQTZCOzs7WUFDdkMsWUFBWSxvQkFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFFO1FBQ3pELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7O2dCQUMzQixlQUFlLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQzs7O2dCQUU3QyxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQztZQUNuRCxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVNLHVDQUFZOzs7O0lBQW5CLFVBQW9CLFVBQWtCO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQ2xELHFHQUFxRztRQUNyRyxvQ0FBb0M7SUFDdEMsQ0FBQzs7Z0JBN0RGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OztnQkFWUSxVQUFVO2dCQUVWLG1CQUFtQjs7OzJCQUg1QjtDQXdFQyxBQS9ERCxJQStEQztTQTNEWSxnQkFBZ0I7OztJQUMzQiw0Q0FBaUM7O0lBQ2pDLHlDQUFpRDs7SUFDakQsbUNBQXFDOztJQUduQyxzQ0FBOEI7O0lBQzlCLCtDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnbmd4LXN0b3JlJztcbmltcG9ydCB7IExheW91dCB9IGZyb20gJy4vbGF5b3V0cy9sYXlvdXQnO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi93aWRnZXQtc3Bhd25lci93aWRnZXQnO1xuXG5pbXBvcnQgKiBhcyBnZW5vbWljc1dpZGdldHMgZnJvbSAnZ2Vub21pY3MtbGliJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlU2VydmljZSB7XG4gIHByaXZhdGUgd2lkZ2V0c1N0cmVhbVVybDogc3RyaW5nO1xuICBwcml2YXRlIHdpZGdldHNTdHJlYW06IEJlaGF2aW9yU3ViamVjdDxXaWRnZXRbXT47XG4gIHB1YmxpYyB3aWRnZXRzOiBPYnNlcnZhYmxlPFdpZGdldFtdPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndpZGdldHNTdHJlYW1VcmwgPSAnYXNzZXRzL2RlZmF1bHRzL3RrLWRlZmF1bHQtd29ya3NwYWNlLmpzb24nO1xuICAgIHRoaXMud2lkZ2V0c1N0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2lkZ2V0W10+KFtdKTtcbiAgICB0aGlzLndpZGdldHMgPSB0aGlzLndpZGdldHNTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVdpZGdldHMod2lkZ2V0c0FycmF5KSB7XG4gICAgdGhpcy53aWRnZXRzU3RyZWFtLm5leHQod2lkZ2V0c0FycmF5KTtcbiAgICAvLyB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCd3b3Jrc3BhY2UnLCB3aWRnZXRzQXJyYXkpO1xuICB9XG5cbiAgcHVibGljIGxvYWRXaWRnZXRzKCk6IHZvaWQge1xuICAgIC8vIGNvbnN0IHdpZGdldHNTdG9yZWQgPSB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCd3b3Jrc3BhY2UnKTtcbiAgICAvLyBpZiAoIXdpZGdldHNTdG9yZWQpIHtcbiAgICAvLyAgIHRoaXMuaHR0cENsaWVudC5nZXQ8V2lkZ2V0W10+KHRoaXMud2lkZ2V0c1N0cmVhbVVybClcbiAgICAvLyAgIC5zdWJzY3JpYmUod2lkZ2V0QXJyYXkgPT4ge1xuICAgIC8vICAgICB0aGlzLnVwZGF0ZVdpZGdldHMod2lkZ2V0QXJyYXkpO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAgIGxldCB3aWRnZXRzID0gW107XG4gICAgICBjb25zdCBkYXRhID0ge3RpdGxlOiAndGl0bGUnLCBzdGF0ZTogZmFsc2V9O1xuICAgICAgdGhpcy53aWRnZXRzLnN1YnNjcmliZSh3ZGd0ID0+IHdpZGdldHMgPSB3ZGd0KTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh3aWRnZXRzKSB8fCAhd2lkZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gRGVmYXVsdCBXaWRnZXRzXG4gICAgICAgIHRoaXMuYWRkV2lkZ2V0cyhcbiAgICAgICAgICAnR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50JyxcbiAgICAgICAgICAnR2Vub21pY3NNYXRyaXhDb21wb25lbnQnLFxuICAgICAgICAgICdHZW5vbWljc0luZm9Db21wb25lbnQnLFxuICAgICAgICAgICdHZW5vbWljc1RyYWNrc0NvbXBvbmVudCdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXRzKC4uLndpZGdldE5hbWVzQXJyYXk6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3Qgd2lkZ2V0c0FycmF5ID0gWyAuLi50aGlzLndpZGdldHNTdHJlYW0uZ2V0VmFsdWUoKSBdO1xuICAgIHdpZGdldE5hbWVzQXJyYXkuZm9yRWFjaCh3aWRnZXROYW1lID0+IHtcbiAgICAgIGNvbnN0IHdpZGdldENvbXBvbmVudCA9IGdlbm9taWNzV2lkZ2V0c1t3aWRnZXROYW1lXTtcbiAgICAgICAgICAvLyBpZiAoIXdpZGdldE5hbWUpIHt9OyAvLyBVU0UgREVGQVVMVD8/P1xuICAgICAgY29uc3QgbmV3V2lkZ2V0ID0gbmV3IFdpZGdldCh3aWRnZXRDb21wb25lbnQsIG51bGwpO1xuICAgICAgd2lkZ2V0c0FycmF5LnB1c2gobmV3V2lkZ2V0KTtcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZVdpZGdldHMod2lkZ2V0c0FycmF5KTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVXaWRnZXQod2lkZ2V0TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy53aWRnZXRzLnN1YnNjcmliZSh3ZGd0ID0+IGNvbnNvbGUubG9nKHdkZ3QpKTtcbiAgICAvLyBjb25zdCB3aWRnZXRzQXJyYXkgPSB0aGlzLndpZGdldHNTdHJlYW0uZ2V0VmFsdWUoKS5maWx0ZXIoaXRlbSA9PiBpdGVtLmRhdGEudGl0bGUgIT09IHdpZGdldE5hbWUpO1xuICAgIC8vIHRoaXMudXBkYXRlV2lkZ2V0cyh3aWRnZXRzQXJyYXkpO1xuICB9XG5cbn1cbiJdfQ==