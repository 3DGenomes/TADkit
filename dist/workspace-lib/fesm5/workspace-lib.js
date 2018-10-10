import { __spread, __decorate, __metadata } from 'tslib';
import { Injectable, NgModule, Component, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, HostBinding, HostListener, defineInjectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-store';
import * as genomicsWidgets from 'genomics-lib';
import { GenomicsLibModule } from 'genomics-lib';
import { BindObservable } from 'bind-observable';
import { Project, ProjectsLibService, ProjectsLibModule } from 'projects-lib';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { NgxResizableModule } from '@3dgenomes/ngx-resizable';
import { GridsterModule } from 'angular-gridster2';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Widget = /** @class */ (function () {
    function Widget(component, dataStream) {
        this.component = component;
        this.dataStream = dataStream;
    }
    return Widget;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        var widgetsArray = __spread(this.widgetsStream.getValue());
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
    /** @nocollapse */ WorkspaceService.ngInjectableDef = defineInjectable({ factory: function WorkspaceService_Factory() { return new WorkspaceService(inject(HttpClient), inject(LocalStorageService)); }, token: WorkspaceService, providedIn: "root" });
    return WorkspaceService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Workspace = /** @class */ (function () {
    function Workspace(component, dataStream) {
        this.component = component;
        this.dataStream = dataStream;
    }
    return Workspace;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WorkspaceColsComponent = /** @class */ (function () {
    function WorkspaceColsComponent(workspaceService) {
        var _this = this;
        this.workspaceService = workspaceService;
        this.classes = 'content cols';
        this.widgets = [];
        this.workspaceService.widgets.subscribe(function (wgts) { return _this.widgets = wgts; });
    }
    /**
     * @return {?}
     */
    WorkspaceColsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initializeWorkspace();
    };
    /**
     * @return {?}
     */
    WorkspaceColsComponent.prototype.initializeWorkspace = /**
     * @return {?}
     */
    function () {
        this.workspaceService.loadWidgets();
    };
    /**
     * @param {?} widgetName
     * @return {?}
     */
    WorkspaceColsComponent.prototype.addWidget = /**
     * @param {?} widgetName
     * @return {?}
     */
    function (widgetName) {
        this.workspaceService.addWidgets(widgetName);
    };
    WorkspaceColsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-layout',
                    template: "<rsz-layout class=\"row\" [directions]=\"['right']\" [rFlex]=\"true\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i;\">\n\t<rsz-layout *ngIf=\"i===0\" class=\"cell\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t</rsz-layout>\n\t<rsz-layout *ngIf=\"i===2\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n<rsz-layout class=\"row\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i;\">\n\t\t<rsz-layout *ngIf=\"i===1\" class=\"cell\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i===3\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n",
                    styles: [""]
                }] }
    ];
    WorkspaceColsComponent.ctorParameters = function () { return [
        { type: WorkspaceService }
    ]; };
    WorkspaceColsComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        dataStream: [{ type: Input }]
    };
    return WorkspaceColsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WorkspaceComponent = /** @class */ (function () {
    function WorkspaceComponent(componentFactoryResolver, projectsService) {
        var _this = this;
        this.componentFactoryResolver = componentFactoryResolver;
        this.projectsService = projectsService;
        // this.workspacesStream = new BehaviorSubject<Workspace[]>([]);
        // this.workspaces = this.workspacesStream.asObservable();
        this.projectsService.currentProject.subscribe(function (prj) { return _this.data = prj; });
    }
    /**
     * @return {?}
     */
    WorkspaceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.loadWorkpace();
    };
    /**
     * @param {?=} workspaceName
     * @return {?}
     */
    WorkspaceComponent.prototype.setWorkspace = /**
     * @param {?=} workspaceName
     * @return {?}
     */
    function (workspaceName) {
        // const workspaceComponent = workspaceLayouts[workspaceName];
        // if (!workspaceName) {}; // USE DEFAULT???
        this.currentWorkspace = new Workspace(WorkspaceColsComponent, null);
    };
    /**
     * @return {?}
     */
    WorkspaceComponent.prototype.loadWorkpace = /**
     * @return {?}
     */
    function () {
        this.setWorkspace();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentWorkspace.component);
        this.routespace.clear();
        /** @type {?} */
        var componentRef = this.routespace.createComponent(componentFactory);
        (componentRef.instance).dataStream = this.dataStream;
    };
    WorkspaceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-layout',
                    template: "<ng-template #workspace></ng-template>  ",
                    styles: [":host{display:-ms-grid;display:grid}"]
                }] }
    ];
    WorkspaceComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ProjectsLibService }
    ]; };
    WorkspaceComponent.propDecorators = {
        routespace: [{ type: ViewChild, args: ['workspace', { read: ViewContainerRef },] }]
    };
    __decorate([
        BindObservable('dataStream'),
        __metadata("design:type", Project)
    ], WorkspaceComponent.prototype, "data", void 0);
    return WorkspaceComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// import { Layout } from '../layouts/layout';
var WorkspaceConfigComponent = /** @class */ (function () {
    function WorkspaceConfigComponent(workspaceService) {
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
    WorkspaceConfigComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // this.form = new FormGroup({
        //   title: new FormControl()
        // });
    };
    /**
     * @return {?}
     */
    WorkspaceConfigComponent.prototype.onChange = /**
     * @return {?}
     */
    function () {
        // this.workspaceService.layouts.subscribe(lyts => this.layouts = lyts);
        console.log(this.layout);
    };
    WorkspaceConfigComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-config',
                    template: "<h2>Workspace Config</h2>\n<p-dropdown [options]=\"layouts\" [(ngModel)]=\"layout\" (onChange)=\"onChange()\"></p-dropdown>\n<p>Selected Layout: {{layout || 'none'}}</p>\n\n",
                    styles: [""]
                }] }
    ];
    WorkspaceConfigComponent.ctorParameters = function () { return [
        { type: WorkspaceService }
    ]; };
    return WorkspaceConfigComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Supported comment MIKE
 */
var WidgetSpawnerComponent = /** @class */ (function () {
    function WidgetSpawnerComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    WidgetSpawnerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.loadWidget();
    };
    /**
     * @return {?}
     */
    WidgetSpawnerComponent.prototype.loadWidget = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widget.component);
        this.workspace.clear();
        /** @type {?} */
        var componentRef = this.workspace.createComponent(componentFactory);
        ((/** @type {?} */ (componentRef.instance))).dataStream = this.dataStream;
    };
    WidgetSpawnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-widget',
                    template: "<ng-template #widget></ng-template>  ",
                    styles: [":host{height:100%;width:100%}"]
                }] }
    ];
    WidgetSpawnerComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver }
    ]; };
    WidgetSpawnerComponent.propDecorators = {
        widget: [{ type: Input }],
        dataStream: [{ type: Input }],
        workspace: [{ type: ViewChild, args: ['widget', { read: ViewContainerRef },] }]
    };
    return WidgetSpawnerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WorkspaceFixedComponent = /** @class */ (function () {
    function WorkspaceFixedComponent(workspaceService) {
        var _this = this;
        this.workspaceService = workspaceService;
        this.classes = 'workspace';
        this.widgets = [];
        this.workspaceService.widgets.subscribe(function (wgts) { return _this.widgets = wgts; });
    }
    /**
     * @return {?}
     */
    WorkspaceFixedComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initializeWorkspace();
    };
    /**
     * @return {?}
     */
    WorkspaceFixedComponent.prototype.initializeWorkspace = /**
     * @return {?}
     */
    function () {
        this.workspaceService.loadWidgets();
    };
    /**
     * @param {?} widgetName
     * @return {?}
     */
    WorkspaceFixedComponent.prototype.addWidget = /**
     * @param {?} widgetName
     * @return {?}
     */
    function (widgetName) {
        this.workspaceService.addWidgets(widgetName);
    };
    WorkspaceFixedComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-layout',
                    template: "<workspace-widget *ngFor=\"let widget of widgets\" [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n",
                    styles: [":host{display:-ms-grid;display:grid;-ms-grid-columns:360px 1fr;grid-template-columns:360px 1fr;-ms-grid-rows:360px 1fr;grid-template-rows:360px 1fr;grid-gap:10px;border:8px solid #f0f0f0}"]
                }] }
    ];
    WorkspaceFixedComponent.ctorParameters = function () { return [
        { type: WorkspaceService }
    ]; };
    WorkspaceFixedComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        dataStream: [{ type: Input }]
    };
    return WorkspaceFixedComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WorkspaceRowsComponent = /** @class */ (function () {
    function WorkspaceRowsComponent(workspaceService) {
        var _this = this;
        this.workspaceService = workspaceService;
        this.classes = 'content';
        this.widgets = [];
        this.workspaceService.widgets.subscribe(function (wgts) { return _this.widgets = wgts; });
    }
    /**
     * @return {?}
     */
    WorkspaceRowsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initializeWorkspace();
    };
    /**
     * @return {?}
     */
    WorkspaceRowsComponent.prototype.initializeWorkspace = /**
     * @return {?}
     */
    function () {
        this.workspaceService.loadWidgets();
    };
    /**
     * @param {?} widgetName
     * @return {?}
     */
    WorkspaceRowsComponent.prototype.addWidget = /**
     * @param {?} widgetName
     * @return {?}
     */
    function (widgetName) {
        this.workspaceService.addWidgets(widgetName);
    };
    WorkspaceRowsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'workspace-layout',
                    template: "<rsz-layout class=\"row\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i; even as flex;\">\n\t\t<rsz-layout *ngIf=\"i<2 && flex\" class=\"cell\" [directions]=\"['right']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i<2 && !flex\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n<rsz-layout class=\"row\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i; even as flex;\">\n\t\t<rsz-layout *ngIf=\"i>1 && flex\" class=\"cell\" [directions]=\"['right']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i>1 && !flex\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n",
                    styles: [""]
                }] }
    ];
    WorkspaceRowsComponent.ctorParameters = function () { return [
        { type: WorkspaceService }
    ]; };
    WorkspaceRowsComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        dataStream: [{ type: Input }]
    };
    return WorkspaceRowsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WorkspaceLibModule = /** @class */ (function () {
    function WorkspaceLibModule() {
    }
    WorkspaceLibModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ProgressSpinnerModule,
                        ButtonModule,
                        ConfirmDialogModule,
                        DropdownModule,
                        NgxResizableModule,
                        GridsterModule,
                        GenomicsLibModule,
                        ProjectsLibModule
                    ],
                    declarations: [
                        WorkspaceConfigComponent,
                        WidgetSpawnerComponent,
                        WorkspaceComponent,
                        WorkspaceFixedComponent,
                        WorkspaceRowsComponent,
                        WorkspaceColsComponent,
                        WorkspaceGridsterComponent,
                    ],
                    exports: [],
                    providers: [],
                    entryComponents: [
                        WorkspaceFixedComponent,
                        WorkspaceRowsComponent,
                        WorkspaceColsComponent,
                        WorkspaceGridsterComponent
                    ]
                },] }
    ];
    return WorkspaceLibModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { WorkspaceService, WorkspaceComponent, WorkspaceConfigComponent, WidgetSpawnerComponent, WorkspaceFixedComponent, WorkspaceRowsComponent, WorkspaceColsComponent, WorkspaceGridsterComponent, WorkspaceLibModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLWxpYi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvd2lkZ2V0LXNwYXduZXIvd2lkZ2V0LnRzIiwibmc6Ly93b3Jrc3BhY2UtbGliL2xpYi93b3Jrc3BhY2UtbGliLnNlcnZpY2UudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL3dvcmtzcGFjZS93b3Jrc3BhY2UudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL2xheW91dHMvY29scy93b3Jrc3BhY2UuY29tcG9uZW50LnRzIiwibmc6Ly93b3Jrc3BhY2UtbGliL2xpYi93b3Jrc3BhY2Uvd29ya3NwYWNlLmNvbXBvbmVudC50cyIsIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvY29uZmlnL3dvcmtzcGFjZS1jb25maWcuY29tcG9uZW50LnRzIiwibmc6Ly93b3Jrc3BhY2UtbGliL2xpYi93aWRnZXQtc3Bhd25lci93aWRnZXQtc3Bhd25lci5jb21wb25lbnQudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL2xheW91dHMvZml4ZWQvd29ya3NwYWNlLmNvbXBvbmVudC50cyIsIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvbGF5b3V0cy9yb3dzL3dvcmtzcGFjZS5jb21wb25lbnQudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL2xheW91dHMvZ3JpZHN0ZXIvd29ya3NwYWNlLmNvbXBvbmVudC50cyIsIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvd29ya3NwYWNlLWxpYi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgV2lkZ2V0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbXBvbmVudDogVHlwZTxhbnk+LFxuICAgIHB1YmxpYyBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPGFueT5cbiAgKSB7fVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICduZ3gtc3RvcmUnO1xuaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSAnLi9sYXlvdXRzL2xheW91dCc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuL3dpZGdldC1zcGF3bmVyL3dpZGdldCc7XG5cbmltcG9ydCAqIGFzIGdlbm9taWNzV2lkZ2V0cyBmcm9tICdnZW5vbWljcy1saWInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB3aWRnZXRzU3RyZWFtVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgd2lkZ2V0c1N0cmVhbTogQmVoYXZpb3JTdWJqZWN0PFdpZGdldFtdPjtcbiAgcHVibGljIHdpZGdldHM6IE9ic2VydmFibGU8V2lkZ2V0W10+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMud2lkZ2V0c1N0cmVhbVVybCA9ICdhc3NldHMvZGVmYXVsdHMvdGstZGVmYXVsdC13b3Jrc3BhY2UuanNvbic7XG4gICAgdGhpcy53aWRnZXRzU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXaWRnZXRbXT4oW10pO1xuICAgIHRoaXMud2lkZ2V0cyA9IHRoaXMud2lkZ2V0c1N0cmVhbS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlV2lkZ2V0cyh3aWRnZXRzQXJyYXkpIHtcbiAgICB0aGlzLndpZGdldHNTdHJlYW0ubmV4dCh3aWRnZXRzQXJyYXkpO1xuICAgIC8vIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ3dvcmtzcGFjZScsIHdpZGdldHNBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgbG9hZFdpZGdldHMoKTogdm9pZCB7XG4gICAgLy8gY29uc3Qgd2lkZ2V0c1N0b3JlZCA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ3dvcmtzcGFjZScpO1xuICAgIC8vIGlmICghd2lkZ2V0c1N0b3JlZCkge1xuICAgIC8vICAgdGhpcy5odHRwQ2xpZW50LmdldDxXaWRnZXRbXT4odGhpcy53aWRnZXRzU3RyZWFtVXJsKVxuICAgIC8vICAgLnN1YnNjcmliZSh3aWRnZXRBcnJheSA9PiB7XG4gICAgLy8gICAgIHRoaXMudXBkYXRlV2lkZ2V0cyh3aWRnZXRBcnJheSk7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9IGVsc2Uge1xuICAgICAgbGV0IHdpZGdldHMgPSBbXTtcbiAgICAgIGNvbnN0IGRhdGEgPSB7dGl0bGU6ICd0aXRsZScsIHN0YXRlOiBmYWxzZX07XG4gICAgICB0aGlzLndpZGdldHMuc3Vic2NyaWJlKHdkZ3QgPT4gd2lkZ2V0cyA9IHdkZ3QpO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHdpZGdldHMpIHx8ICF3aWRnZXRzLmxlbmd0aCkge1xuICAgICAgICAvLyBEZWZhdWx0IFdpZGdldHNcbiAgICAgICAgdGhpcy5hZGRXaWRnZXRzKFxuICAgICAgICAgICdHZW5vbWljc1RocmVlanNDb21wb25lbnQnLFxuICAgICAgICAgICdHZW5vbWljc01hdHJpeENvbXBvbmVudCcsXG4gICAgICAgICAgJ0dlbm9taWNzSW5mb0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0dlbm9taWNzVHJhY2tzQ29tcG9uZW50J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gfVxuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldHMoLi4ud2lkZ2V0TmFtZXNBcnJheTogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCB3aWRnZXRzQXJyYXkgPSBbIC4uLnRoaXMud2lkZ2V0c1N0cmVhbS5nZXRWYWx1ZSgpIF07XG4gICAgd2lkZ2V0TmFtZXNBcnJheS5mb3JFYWNoKHdpZGdldE5hbWUgPT4ge1xuICAgICAgY29uc3Qgd2lkZ2V0Q29tcG9uZW50ID0gZ2Vub21pY3NXaWRnZXRzW3dpZGdldE5hbWVdO1xuICAgICAgICAgIC8vIGlmICghd2lkZ2V0TmFtZSkge307IC8vIFVTRSBERUZBVUxUPz8/XG4gICAgICBjb25zdCBuZXdXaWRnZXQgPSBuZXcgV2lkZ2V0KHdpZGdldENvbXBvbmVudCwgbnVsbCk7XG4gICAgICB3aWRnZXRzQXJyYXkucHVzaChuZXdXaWRnZXQpO1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlV2lkZ2V0cyh3aWRnZXRzQXJyYXkpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZVdpZGdldCh3aWRnZXROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLndpZGdldHMuc3Vic2NyaWJlKHdkZ3QgPT4gY29uc29sZS5sb2cod2RndCkpO1xuICAgIC8vIGNvbnN0IHdpZGdldHNBcnJheSA9IHRoaXMud2lkZ2V0c1N0cmVhbS5nZXRWYWx1ZSgpLmZpbHRlcihpdGVtID0+IGl0ZW0uZGF0YS50aXRsZSAhPT0gd2lkZ2V0TmFtZSk7XG4gICAgLy8gdGhpcy51cGRhdGVXaWRnZXRzKHdpZGdldHNBcnJheSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbXBvbmVudDogVHlwZTxhbnk+LFxuICAgIHB1YmxpYyBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPGFueT5cbiAgKSB7fVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV29ya3NwYWNlU2VydmljZSB9IGZyb20gJy4uLy4uL3dvcmtzcGFjZS1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi93aWRnZXQtc3Bhd25lci93aWRnZXQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd29ya3NwYWNlLWxheW91dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93b3Jrc3BhY2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93b3Jrc3BhY2UuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZUNvbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICdjb250ZW50IGNvbHMnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV29ya3NwYWNlIH0gZnJvbSAnLi93b3Jrc3BhY2UnO1xuaW1wb3J0IHsgQmluZE9ic2VydmFibGUgfSBmcm9tICdiaW5kLW9ic2VydmFibGUnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJ3Byb2plY3RzLWxpYic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFByb2plY3RzTGliU2VydmljZSB9IGZyb20gJ3Byb2plY3RzLWxpYic7XG4vLyBpbXBvcnQgKiBhcyB3b3Jrc3BhY2VMYXlvdXRzIGZyb20gJ3dvcmtzcGFjZXMtbGliJztcbmltcG9ydCB7IFdvcmtzcGFjZUZpeGVkQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5b3V0cy9maXhlZC93b3Jrc3BhY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtzcGFjZVJvd3NDb21wb25lbnQgfSBmcm9tICcuLi9sYXlvdXRzL3Jvd3Mvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VDb2xzQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5b3V0cy9jb2xzL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya3NwYWNlR3JpZHN0ZXJDb21wb25lbnQgfSBmcm9tICcuLi9sYXlvdXRzL2dyaWRzdGVyL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3dvcmtzcGFjZScsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcm91dGVzcGFjZTtcblxuICAvLyBwcml2YXRlIHdvcmtzcGFjZXNTdHJlYW06IEJlaGF2aW9yU3ViamVjdDxXb3Jrc3BhY2VbXT47XG4gIC8vIHB1YmxpYyB3b3Jrc3BhY2VzOiBPYnNlcnZhYmxlPFdvcmtzcGFjZVtdPjtcbiAgcHVibGljIGN1cnJlbnRXb3Jrc3BhY2U6IFdvcmtzcGFjZTtcblxuICBAQmluZE9ic2VydmFibGUoJ2RhdGFTdHJlYW0nKSBwcml2YXRlIGRhdGE6IFByb2plY3Q7XG4gIHB1YmxpYyBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPFByb2plY3Q+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBwcm9qZWN0c1NlcnZpY2U6IFByb2plY3RzTGliU2VydmljZVxuICApIHtcbiAgICAvLyB0aGlzLndvcmtzcGFjZXNTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdvcmtzcGFjZVtdPihbXSk7XG4gICAgLy8gdGhpcy53b3Jrc3BhY2VzID0gdGhpcy53b3Jrc3BhY2VzU3RyZWFtLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMucHJvamVjdHNTZXJ2aWNlLmN1cnJlbnRQcm9qZWN0LnN1YnNjcmliZShwcmogPT4gdGhpcy5kYXRhID0gcHJqKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZFdvcmtwYWNlKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0V29ya3NwYWNlKHdvcmtzcGFjZU5hbWU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBjb25zdCB3b3Jrc3BhY2VDb21wb25lbnQgPSB3b3Jrc3BhY2VMYXlvdXRzW3dvcmtzcGFjZU5hbWVdO1xuICAgIC8vIGlmICghd29ya3NwYWNlTmFtZSkge307IC8vIFVTRSBERUZBVUxUPz8/XG4gICAgdGhpcy5jdXJyZW50V29ya3NwYWNlID0gbmV3IFdvcmtzcGFjZShXb3Jrc3BhY2VDb2xzQ29tcG9uZW50LCBudWxsKTtcbiAgfVxuXG4gIGxvYWRXb3JrcGFjZSgpIHtcbiAgICB0aGlzLnNldFdvcmtzcGFjZSgpO1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmN1cnJlbnRXb3Jrc3BhY2UuY29tcG9uZW50KTtcbiAgICB0aGlzLnJvdXRlc3BhY2UuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLnJvdXRlc3BhY2UuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIChjb21wb25lbnRSZWYuaW5zdGFuY2UpLmRhdGFTdHJlYW0gPSB0aGlzLmRhdGFTdHJlYW07XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuaW1wb3J0IHsgV29ya3NwYWNlU2VydmljZSB9IGZyb20gJy4uL3dvcmtzcGFjZS1saWIuc2VydmljZSc7XG4vLyBpbXBvcnQgeyBMYXlvdXQgfSBmcm9tICcuLi9sYXlvdXRzL2xheW91dCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dvcmtzcGFjZS1jb25maWcnLFxuICB0ZW1wbGF0ZVVybDogJy4vd29ya3NwYWNlLWNvbmZpZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS1jb25maWcuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VDb25maWdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgbGF5b3V0czogU2VsZWN0SXRlbVtdO1xuICBwdWJsaWMgbGF5b3V0ID0gJ2ZpeGVkJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtzcGFjZVNlcnZpY2U6IFdvcmtzcGFjZVNlcnZpY2UpIHtcbiAgICB0aGlzLmxheW91dHMgPSBbXG4gICAgICB7IGxhYmVsOiAnRml4ZWQnLCB2YWx1ZTogJ2ZpeGVkJ30sXG4gICAgICB7IGxhYmVsOiAnUm93cycsIHZhbHVlOiAncm93cyd9LFxuICAgICAgeyBsYWJlbDogJ0NvbHVtbnMnLCB2YWx1ZTogJ2NvbHMnfSxcbiAgICAgIHsgbGFiZWw6ICdHcmlkc3RlcicsIHZhbHVlOiAnZ3JpZHN0ZXInfVxuICAgIF07XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAvLyAgIHRpdGxlOiBuZXcgRm9ybUNvbnRyb2woKVxuICAgIC8vIH0pO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKCkge1xuICAgIC8vIHRoaXMud29ya3NwYWNlU2VydmljZS5sYXlvdXRzLnN1YnNjcmliZShseXRzID0+IHRoaXMubGF5b3V0cyA9IGx5dHMpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubGF5b3V0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldCc7XG5pbXBvcnQgeyBXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi93aWRnZXQtc3Bhd25lci93aWRnZXQuY29tcG9uZW50JztcblxuLyoqXG4gKiBTdXBwb3J0ZWQgY29tbWVudCBNSUtFXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dvcmtzcGFjZS13aWRnZXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd2lkZ2V0LXNwYXduZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93aWRnZXQtc3Bhd25lci5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV2lkZ2V0U3Bhd25lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHdpZGdldDogV2lkZ2V0O1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ3dpZGdldCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgd29ya3NwYWNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sb2FkV2lkZ2V0KCk7XG4gIH1cblxuICBsb2FkV2lkZ2V0KCkge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLndpZGdldC5jb21wb25lbnQpO1xuICAgIHRoaXMud29ya3NwYWNlLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy53b3Jrc3BhY2UuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICg8V2lkZ2V0Q29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuZGF0YVN0cmVhbSA9IHRoaXMuZGF0YVN0cmVhbTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlRml4ZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICd3b3Jrc3BhY2UnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlUm93c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzc2VzID0gJ2NvbnRlbnQnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdvcmtzcGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi93b3Jrc3BhY2UtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vd2lkZ2V0LXNwYXduZXIvd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkc3RlckNvbmZpZywgR3JpZHN0ZXJJdGVtIH0gZnJvbSAnYW5ndWxhci1ncmlkc3RlcjInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlR3JpZHN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICd3b3Jrc3BhY2UnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG4gIHB1YmxpYyBvcHRpb25zOiBHcmlkc3RlckNvbmZpZztcbiAgcHVibGljIGRhc2hib2FyZDogR3JpZHN0ZXJJdGVtW107XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hcGkgJiYgdGhpcy5vcHRpb25zLmFwaS5yZXNpemUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZXNpemluZycpO1xuICAgICAgdGhpcy5vcHRpb25zLmFwaS5yZXNpemUoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHdvcmtzcGFjZVNlcnZpY2U6IFdvcmtzcGFjZVNlcnZpY2UsXG4gICkge1xuICAgIC8qIEFyZWFzIGF0dHJpYnV0ZXMgbm90IG9mZmljaWFsIEdyaWRzdGVyIHZhbHVlIGJ1dCB0byBoZWxwIGlkZW5pdGlmaWNhdGlvbiAqL1xuICAgIHRoaXMuZGFzaGJvYXJkID0gW1xuICAgICAge2FyZWE6ICdzcGF0aWFsJywgY29sczogMywgcm93czogMywgeDogMCwgeTogMH0sXG4gICAgICB7YXJlYTogJ21hdHJpeCcsICBjb2xzOiA5LCByb3dzOiAzLCB4OiAzLCB5OiAwfSxcbiAgICAgIHthcmVhOiAnaW5mbycsICAgIGNvbHM6IDMsIHJvd3M6IDMsIHg6IDAsIHk6IDN9LFxuICAgICAge2FyZWE6ICd0cmFja3MnLCAgY29sczogOSwgcm93czogMywgeDogMywgeTogM31cbiAgICBdO1xuXG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgcHVzaEl0ZW1zOiB0cnVlLFxuICAgICAgbWluQ29sczogNixcbiAgICAgIG1heENvbHM6IDEyLFxuICAgICAgbWluUm93czogNixcbiAgICAgIG1vYmlsZUJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgIGdyaWRUeXBlOiAnZml0JyxcbiAgICAgIHJlc2l6YWJsZToge1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgIH0sXG4gICAgICBkcmFnZ2FibGU6IHtcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIG1hcmdpbjogOFxuICAgfTtcblxuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS53aWRnZXRzLnN1YnNjcmliZSh3Z3RzID0+IHRoaXMud2lkZ2V0cyA9IHdndHMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZVdvcmtzcGFjZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplV29ya3NwYWNlKCk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5sb2FkV2lkZ2V0cygpO1xuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldCh3aWRnZXROYW1lKTogdm9pZCB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmFkZFdpZGdldHMod2lkZ2V0TmFtZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJvZ3Jlc3NzcGlubmVyJztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7IENvbmZpcm1EaWFsb2dNb2R1bGUgfSBmcm9tICdwcmltZW5nL2NvbmZpcm1kaWFsb2cnO1xuaW1wb3J0IHsgRHJvcGRvd25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2Ryb3Bkb3duJztcblxuaW1wb3J0IHsgV29ya3NwYWNlQ29uZmlnQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWcvd29ya3NwYWNlLWNvbmZpZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya3NwYWNlQ29tcG9uZW50IH0gZnJvbSAnLi93b3Jrc3BhY2Uvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXaWRnZXRTcGF3bmVyQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXQtc3Bhd25lci93aWRnZXQtc3Bhd25lci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBXb3Jrc3BhY2VGaXhlZENvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0cy9maXhlZC93b3Jrc3BhY2UuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTmd4UmVzaXphYmxlTW9kdWxlIH0gZnJvbSAnQDNkZ2Vub21lcy9uZ3gtcmVzaXphYmxlJztcbmltcG9ydCB7IFdvcmtzcGFjZVJvd3NDb21wb25lbnQgfSBmcm9tICcuL2xheW91dHMvcm93cy93b3Jrc3BhY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtzcGFjZUNvbHNDb21wb25lbnQgfSBmcm9tICcuL2xheW91dHMvY29scy93b3Jrc3BhY2UuY29tcG9uZW50JztcblxuaW1wb3J0IHsgR3JpZHN0ZXJNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWdyaWRzdGVyMic7XG5pbXBvcnQgeyBXb3Jrc3BhY2VHcmlkc3RlckNvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0cy9ncmlkc3Rlci93b3Jrc3BhY2UuY29tcG9uZW50JztcblxuaW1wb3J0IHsgR2Vub21pY3NMaWJNb2R1bGUgfSBmcm9tICdnZW5vbWljcy1saWInO1xuaW1wb3J0IHsgUHJvamVjdHNMaWJNb2R1bGUgfSBmcm9tICdwcm9qZWN0cy1saWInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBCdXR0b25Nb2R1bGUsXG4gICAgQ29uZmlybURpYWxvZ01vZHVsZSxcbiAgICBEcm9wZG93bk1vZHVsZSxcbiAgICBOZ3hSZXNpemFibGVNb2R1bGUsXG4gICAgR3JpZHN0ZXJNb2R1bGUsXG4gICAgR2Vub21pY3NMaWJNb2R1bGUsXG4gICAgUHJvamVjdHNMaWJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgV29ya3NwYWNlQ29uZmlnQ29tcG9uZW50LFxuICAgIFdpZGdldFNwYXduZXJDb21wb25lbnQsXG4gICAgV29ya3NwYWNlQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZUZpeGVkQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZVJvd3NDb21wb25lbnQsXG4gICAgV29ya3NwYWNlQ29sc0NvbXBvbmVudCxcbiAgICBXb3Jrc3BhY2VHcmlkc3RlckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW10sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIFdvcmtzcGFjZUZpeGVkQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZVJvd3NDb21wb25lbnQsXG4gICAgV29ya3NwYWNlQ29sc0NvbXBvbmVudCxcbiAgICBXb3Jrc3BhY2VHcmlkc3RlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZUxpYk1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19kZWNvcmF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBO0lBQ0UsZ0JBQ1MsU0FBb0IsRUFDcEIsVUFBMkI7UUFEM0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtLQUNoQztJQUNOLGFBQUM7Q0FBQSxJQUFBOzs7Ozs7O0lDVUMsMEJBQ1UsVUFBc0IsRUFDdEIsbUJBQXdDO1FBRHhDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUVoRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsMkNBQTJDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDbEQ7Ozs7O0lBRU8sd0NBQWE7Ozs7SUFBckIsVUFBc0IsWUFBWTtRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7S0FFdkM7Ozs7SUFFTSxzQ0FBVzs7O0lBQWxCOzs7Ozs7Ozs7WUFRUSxPQUFPLEdBQUcsRUFBRTtRQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLE9BQU8sR0FBRyxJQUFJLEdBQUEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9B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