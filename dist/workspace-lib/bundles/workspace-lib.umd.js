(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('ngx-store'), require('genomics-lib'), require('bind-observable'), require('projects-lib'), require('@angular/common'), require('@angular/forms'), require('primeng/progressspinner'), require('primeng/button'), require('primeng/confirmdialog'), require('primeng/dropdown'), require('@3dgenomes/ngx-resizable'), require('angular-gridster2')) :
    typeof define === 'function' && define.amd ? define('workspace-lib', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'ngx-store', 'genomics-lib', 'bind-observable', 'projects-lib', '@angular/common', '@angular/forms', 'primeng/progressspinner', 'primeng/button', 'primeng/confirmdialog', 'primeng/dropdown', '@3dgenomes/ngx-resizable', 'angular-gridster2'], factory) :
    (factory((global['workspace-lib'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.WebStorageModule,global.GenomicsLibModule,global.BindObservable,global.ProjectsLibModule,global.ng.common,global.ng.forms,global.ProgressSpinnerModule,global.ButtonModule,global.ConfirmDialogModule,global.DropdownModule,global.NgxResizableModule,global['angular-gridster2']));
}(this, (function (exports,i0,i1,rxjs,i2,genomicsWidgets,bindObservable,projectsLib,common,forms,progressspinner,button,confirmdialog,dropdown,ngxResizable,angularGridster2) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
            this.widgetsStream = new rxjs.BehaviorSubject([]);
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] }
        ];
        WorkspaceService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: i2.LocalStorageService }
            ];
        };
        /** @nocollapse */ WorkspaceService.ngInjectableDef = i0.defineInjectable({ factory: function WorkspaceService_Factory() { return new WorkspaceService(i0.inject(i1.HttpClient), i0.inject(i2.LocalStorageService)); }, token: WorkspaceService, providedIn: "root" });
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
            { type: i0.Component, args: [{
                        selector: 'workspace-layout',
                        template: "<rsz-layout class=\"row\" [directions]=\"['right']\" [rFlex]=\"true\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i;\">\n\t<rsz-layout *ngIf=\"i===0\" class=\"cell\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t</rsz-layout>\n\t<rsz-layout *ngIf=\"i===2\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n<rsz-layout class=\"row\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i;\">\n\t\t<rsz-layout *ngIf=\"i===1\" class=\"cell\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i===3\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n",
                        styles: [""]
                    }] }
        ];
        WorkspaceColsComponent.ctorParameters = function () {
            return [
                { type: WorkspaceService }
            ];
        };
        WorkspaceColsComponent.propDecorators = {
            classes: [{ type: i0.HostBinding, args: ['class',] }],
            dataStream: [{ type: i0.Input }]
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
            { type: i0.Component, args: [{
                        selector: 'workspace-layout',
                        template: "<ng-template #workspace></ng-template>  ",
                        styles: [":host{display:-ms-grid;display:grid}"]
                    }] }
        ];
        WorkspaceComponent.ctorParameters = function () {
            return [
                { type: i0.ComponentFactoryResolver },
                { type: projectsLib.ProjectsLibService }
            ];
        };
        WorkspaceComponent.propDecorators = {
            routespace: [{ type: i0.ViewChild, args: ['workspace', { read: i0.ViewContainerRef },] }]
        };
        __decorate([
            bindObservable.BindObservable('dataStream'),
            __metadata("design:type", projectsLib.Project)
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
            { type: i0.Component, args: [{
                        selector: 'workspace-config',
                        template: "<h2>Workspace Config</h2>\n<p-dropdown [options]=\"layouts\" [(ngModel)]=\"layout\" (onChange)=\"onChange()\"></p-dropdown>\n<p>Selected Layout: {{layout || 'none'}}</p>\n\n",
                        styles: [""]
                    }] }
        ];
        WorkspaceConfigComponent.ctorParameters = function () {
            return [
                { type: WorkspaceService }
            ];
        };
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
                (( /** @type {?} */(componentRef.instance))).dataStream = this.dataStream;
            };
        WidgetSpawnerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'workspace-widget',
                        template: "<ng-template #widget></ng-template>  ",
                        styles: [":host{height:100%;width:100%}"]
                    }] }
        ];
        WidgetSpawnerComponent.ctorParameters = function () {
            return [
                { type: i0.ComponentFactoryResolver }
            ];
        };
        WidgetSpawnerComponent.propDecorators = {
            widget: [{ type: i0.Input }],
            dataStream: [{ type: i0.Input }],
            workspace: [{ type: i0.ViewChild, args: ['widget', { read: i0.ViewContainerRef },] }]
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
            { type: i0.Component, args: [{
                        selector: 'workspace-layout',
                        template: "<workspace-widget *ngFor=\"let widget of widgets\" [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n",
                        styles: [":host{display:-ms-grid;display:grid;-ms-grid-columns:360px 1fr;grid-template-columns:360px 1fr;-ms-grid-rows:360px 1fr;grid-template-rows:360px 1fr;grid-gap:10px;border:8px solid #f0f0f0}"]
                    }] }
        ];
        WorkspaceFixedComponent.ctorParameters = function () {
            return [
                { type: WorkspaceService }
            ];
        };
        WorkspaceFixedComponent.propDecorators = {
            classes: [{ type: i0.HostBinding, args: ['class',] }],
            dataStream: [{ type: i0.Input }]
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
            { type: i0.Component, args: [{
                        selector: 'workspace-layout',
                        template: "<rsz-layout class=\"row\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i; even as flex;\">\n\t\t<rsz-layout *ngIf=\"i<2 && flex\" class=\"cell\" [directions]=\"['right']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i<2 && !flex\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n<rsz-layout class=\"row\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i; even as flex;\">\n\t\t<rsz-layout *ngIf=\"i>1 && flex\" class=\"cell\" [directions]=\"['right']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i>1 && !flex\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n",
                        styles: [""]
                    }] }
        ];
        WorkspaceRowsComponent.ctorParameters = function () {
            return [
                { type: WorkspaceService }
            ];
        };
        WorkspaceRowsComponent.propDecorators = {
            classes: [{ type: i0.HostBinding, args: ['class',] }],
            dataStream: [{ type: i0.Input }]
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
            { type: i0.Component, args: [{
                        selector: 'workspace-layout',
                        template: "<gridster [options]=\"options\">\n    <gridster-item [item]=\"item\" *ngFor=\"let item of dashboard; index as i\">\n        <workspace-widget [widget]=\"widgets[i]\" [dataStream]=\"dataStream\"></workspace-widget>\n    </gridster-item>\n</gridster>\n",
                        styles: ["gridster{background:#f0f0f0}"]
                    }] }
        ];
        WorkspaceGridsterComponent.ctorParameters = function () {
            return [
                { type: WorkspaceService }
            ];
        };
        WorkspaceGridsterComponent.propDecorators = {
            classes: [{ type: i0.HostBinding, args: ['class',] }],
            dataStream: [{ type: i0.Input }],
            onResize: [{ type: i0.HostListener, args: ['window:resize', ['$event'],] }]
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
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            progressspinner.ProgressSpinnerModule,
                            button.ButtonModule,
                            confirmdialog.ConfirmDialogModule,
                            dropdown.DropdownModule,
                            ngxResizable.NgxResizableModule,
                            angularGridster2.GridsterModule,
                            genomicsWidgets.GenomicsLibModule,
                            projectsLib.ProjectsLibModule
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

    exports.WorkspaceService = WorkspaceService;
    exports.WorkspaceComponent = WorkspaceComponent;
    exports.WorkspaceConfigComponent = WorkspaceConfigComponent;
    exports.WidgetSpawnerComponent = WidgetSpawnerComponent;
    exports.WorkspaceFixedComponent = WorkspaceFixedComponent;
    exports.WorkspaceRowsComponent = WorkspaceRowsComponent;
    exports.WorkspaceColsComponent = WorkspaceColsComponent;
    exports.WorkspaceGridsterComponent = WorkspaceGridsterComponent;
    exports.WorkspaceLibModule = WorkspaceLibModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLWxpYi51bWQuanMubWFwIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly93b3Jrc3BhY2UtbGliL2xpYi93aWRnZXQtc3Bhd25lci93aWRnZXQudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL3dvcmtzcGFjZS1saWIuc2VydmljZS50cyIsIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvd29ya3NwYWNlL3dvcmtzcGFjZS50cyIsIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvbGF5b3V0cy9jb2xzL3dvcmtzcGFjZS5jb21wb25lbnQudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL3dvcmtzcGFjZS93b3Jrc3BhY2UuY29tcG9uZW50LnRzIiwibmc6Ly93b3Jrc3BhY2UtbGliL2xpYi9jb25maWcvd29ya3NwYWNlLWNvbmZpZy5jb21wb25lbnQudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL3dpZGdldC1zcGF3bmVyL3dpZGdldC1zcGF3bmVyLmNvbXBvbmVudC50cyIsIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvbGF5b3V0cy9maXhlZC93b3Jrc3BhY2UuY29tcG9uZW50LnRzIiwibmc6Ly93b3Jrc3BhY2UtbGliL2xpYi9sYXlvdXRzL3Jvd3Mvd29ya3NwYWNlLmNvbXBvbmVudC50cyIsIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvbGF5b3V0cy9ncmlkc3Rlci93b3Jrc3BhY2UuY29tcG9uZW50LnRzIiwibmc6Ly93b3Jrc3BhY2UtbGliL2xpYi93b3Jrc3BhY2UtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIFdpZGdldCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb21wb25lbnQ6IFR5cGU8YW55PixcbiAgICBwdWJsaWMgZGF0YVN0cmVhbTogT2JzZXJ2YWJsZTxhbnk+XG4gICkge31cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnbmd4LXN0b3JlJztcbmltcG9ydCB7IExheW91dCB9IGZyb20gJy4vbGF5b3V0cy9sYXlvdXQnO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi93aWRnZXQtc3Bhd25lci93aWRnZXQnO1xuXG5pbXBvcnQgKiBhcyBnZW5vbWljc1dpZGdldHMgZnJvbSAnZ2Vub21pY3MtbGliJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlU2VydmljZSB7XG4gIHByaXZhdGUgd2lkZ2V0c1N0cmVhbVVybDogc3RyaW5nO1xuICBwcml2YXRlIHdpZGdldHNTdHJlYW06IEJlaGF2aW9yU3ViamVjdDxXaWRnZXRbXT47XG4gIHB1YmxpYyB3aWRnZXRzOiBPYnNlcnZhYmxlPFdpZGdldFtdPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndpZGdldHNTdHJlYW1VcmwgPSAnYXNzZXRzL2RlZmF1bHRzL3RrLWRlZmF1bHQtd29ya3NwYWNlLmpzb24nO1xuICAgIHRoaXMud2lkZ2V0c1N0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2lkZ2V0W10+KFtdKTtcbiAgICB0aGlzLndpZGdldHMgPSB0aGlzLndpZGdldHNTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVdpZGdldHMod2lkZ2V0c0FycmF5KSB7XG4gICAgdGhpcy53aWRnZXRzU3RyZWFtLm5leHQod2lkZ2V0c0FycmF5KTtcbiAgICAvLyB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCd3b3Jrc3BhY2UnLCB3aWRnZXRzQXJyYXkpO1xuICB9XG5cbiAgcHVibGljIGxvYWRXaWRnZXRzKCk6IHZvaWQge1xuICAgIC8vIGNvbnN0IHdpZGdldHNTdG9yZWQgPSB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCd3b3Jrc3BhY2UnKTtcbiAgICAvLyBpZiAoIXdpZGdldHNTdG9yZWQpIHtcbiAgICAvLyAgIHRoaXMuaHR0cENsaWVudC5nZXQ8V2lkZ2V0W10+KHRoaXMud2lkZ2V0c1N0cmVhbVVybClcbiAgICAvLyAgIC5zdWJzY3JpYmUod2lkZ2V0QXJyYXkgPT4ge1xuICAgIC8vICAgICB0aGlzLnVwZGF0ZVdpZGdldHMod2lkZ2V0QXJyYXkpO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAgIGxldCB3aWRnZXRzID0gW107XG4gICAgICBjb25zdCBkYXRhID0ge3RpdGxlOiAndGl0bGUnLCBzdGF0ZTogZmFsc2V9O1xuICAgICAgdGhpcy53aWRnZXRzLnN1YnNjcmliZSh3ZGd0ID0+IHdpZGdldHMgPSB3ZGd0KTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh3aWRnZXRzKSB8fCAhd2lkZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gRGVmYXVsdCBXaWRnZXRzXG4gICAgICAgIHRoaXMuYWRkV2lkZ2V0cyhcbiAgICAgICAgICAnR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50JyxcbiAgICAgICAgICAnR2Vub21pY3NNYXRyaXhDb21wb25lbnQnLFxuICAgICAgICAgICdHZW5vbWljc0luZm9Db21wb25lbnQnLFxuICAgICAgICAgICdHZW5vbWljc1RyYWNrc0NvbXBvbmVudCdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXRzKC4uLndpZGdldE5hbWVzQXJyYXk6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3Qgd2lkZ2V0c0FycmF5ID0gWyAuLi50aGlzLndpZGdldHNTdHJlYW0uZ2V0VmFsdWUoKSBdO1xuICAgIHdpZGdldE5hbWVzQXJyYXkuZm9yRWFjaCh3aWRnZXROYW1lID0+IHtcbiAgICAgIGNvbnN0IHdpZGdldENvbXBvbmVudCA9IGdlbm9taWNzV2lkZ2V0c1t3aWRnZXROYW1lXTtcbiAgICAgICAgICAvLyBpZiAoIXdpZGdldE5hbWUpIHt9OyAvLyBVU0UgREVGQVVMVD8/P1xuICAgICAgY29uc3QgbmV3V2lkZ2V0ID0gbmV3IFdpZGdldCh3aWRnZXRDb21wb25lbnQsIG51bGwpO1xuICAgICAgd2lkZ2V0c0FycmF5LnB1c2gobmV3V2lkZ2V0KTtcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZVdpZGdldHMod2lkZ2V0c0FycmF5KTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVXaWRnZXQod2lkZ2V0TmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy53aWRnZXRzLnN1YnNjcmliZSh3ZGd0ID0+IGNvbnNvbGUubG9nKHdkZ3QpKTtcbiAgICAvLyBjb25zdCB3aWRnZXRzQXJyYXkgPSB0aGlzLndpZGdldHNTdHJlYW0uZ2V0VmFsdWUoKS5maWx0ZXIoaXRlbSA9PiBpdGVtLmRhdGEudGl0bGUgIT09IHdpZGdldE5hbWUpO1xuICAgIC8vIHRoaXMudXBkYXRlV2lkZ2V0cyh3aWRnZXRzQXJyYXkpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb21wb25lbnQ6IFR5cGU8YW55PixcbiAgICBwdWJsaWMgZGF0YVN0cmVhbTogT2JzZXJ2YWJsZTxhbnk+XG4gICkge31cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdvcmtzcGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi93b3Jrc3BhY2UtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vd2lkZ2V0LXNwYXduZXIvd2lkZ2V0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dvcmtzcGFjZS1sYXlvdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd29ya3NwYWNlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd29ya3NwYWNlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VDb2xzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNsYXNzZXMgPSAnY29udGVudCBjb2xzJztcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuXG4gIHB1YmxpYyB3aWRnZXRzOiBXaWRnZXRDb21wb25lbnRbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgd29ya3NwYWNlU2VydmljZTogV29ya3NwYWNlU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLndpZGdldHMuc3Vic2NyaWJlKHdndHMgPT4gdGhpcy53aWRnZXRzID0gd2d0cyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplV29ya3NwYWNlKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVXb3Jrc3BhY2UoKTogdm9pZCB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmxvYWRXaWRnZXRzKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkV2lkZ2V0KHdpZGdldE5hbWUpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UuYWRkV2lkZ2V0cyh3aWRnZXROYW1lKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYsICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdvcmtzcGFjZSB9IGZyb20gJy4vd29ya3NwYWNlJztcbmltcG9ydCB7IEJpbmRPYnNlcnZhYmxlIH0gZnJvbSAnYmluZC1vYnNlcnZhYmxlJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICdwcm9qZWN0cy1saWInO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQcm9qZWN0c0xpYlNlcnZpY2UgfSBmcm9tICdwcm9qZWN0cy1saWInO1xuLy8gaW1wb3J0ICogYXMgd29ya3NwYWNlTGF5b3V0cyBmcm9tICd3b3Jrc3BhY2VzLWxpYic7XG5pbXBvcnQgeyBXb3Jrc3BhY2VGaXhlZENvbXBvbmVudCB9IGZyb20gJy4uL2xheW91dHMvZml4ZWQvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VSb3dzQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5b3V0cy9yb3dzL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya3NwYWNlQ29sc0NvbXBvbmVudCB9IGZyb20gJy4uL2xheW91dHMvY29scy93b3Jrc3BhY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtzcGFjZUdyaWRzdGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5b3V0cy9ncmlkc3Rlci93b3Jrc3BhY2UuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd29ya3NwYWNlLWxheW91dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93b3Jrc3BhY2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93b3Jrc3BhY2UuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKCd3b3Jrc3BhY2UnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHJvdXRlc3BhY2U7XG5cbiAgLy8gcHJpdmF0ZSB3b3Jrc3BhY2VzU3RyZWFtOiBCZWhhdmlvclN1YmplY3Q8V29ya3NwYWNlW10+O1xuICAvLyBwdWJsaWMgd29ya3NwYWNlczogT2JzZXJ2YWJsZTxXb3Jrc3BhY2VbXT47XG4gIHB1YmxpYyBjdXJyZW50V29ya3NwYWNlOiBXb3Jrc3BhY2U7XG5cbiAgQEJpbmRPYnNlcnZhYmxlKCdkYXRhU3RyZWFtJykgcHJpdmF0ZSBkYXRhOiBQcm9qZWN0O1xuICBwdWJsaWMgZGF0YVN0cmVhbTogT2JzZXJ2YWJsZTxQcm9qZWN0PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgcHJvamVjdHNTZXJ2aWNlOiBQcm9qZWN0c0xpYlNlcnZpY2VcbiAgKSB7XG4gICAgLy8gdGhpcy53b3Jrc3BhY2VzU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXb3Jrc3BhY2VbXT4oW10pO1xuICAgIC8vIHRoaXMud29ya3NwYWNlcyA9IHRoaXMud29ya3NwYWNlc1N0cmVhbS5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLnByb2plY3RzU2VydmljZS5jdXJyZW50UHJvamVjdC5zdWJzY3JpYmUocHJqID0+IHRoaXMuZGF0YSA9IHByaik7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxvYWRXb3JrcGFjZSgpO1xuICB9XG5cbiAgcHVibGljIHNldFdvcmtzcGFjZSh3b3Jrc3BhY2VOYW1lPzogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gY29uc3Qgd29ya3NwYWNlQ29tcG9uZW50ID0gd29ya3NwYWNlTGF5b3V0c1t3b3Jrc3BhY2VOYW1lXTtcbiAgICAvLyBpZiAoIXdvcmtzcGFjZU5hbWUpIHt9OyAvLyBVU0UgREVGQVVMVD8/P1xuICAgIHRoaXMuY3VycmVudFdvcmtzcGFjZSA9IG5ldyBXb3Jrc3BhY2UoV29ya3NwYWNlQ29sc0NvbXBvbmVudCwgbnVsbCk7XG4gIH1cblxuICBsb2FkV29ya3BhY2UoKSB7XG4gICAgdGhpcy5zZXRXb3Jrc3BhY2UoKTtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jdXJyZW50V29ya3NwYWNlLmNvbXBvbmVudCk7XG4gICAgdGhpcy5yb3V0ZXNwYWNlLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5yb3V0ZXNwYWNlLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAoY29tcG9uZW50UmVmLmluc3RhbmNlKS5kYXRhU3RyZWFtID0gdGhpcy5kYXRhU3RyZWFtO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbmltcG9ydCB7IFdvcmtzcGFjZVNlcnZpY2UgfSBmcm9tICcuLi93b3Jrc3BhY2UtbGliLnNlcnZpY2UnO1xuLy8gaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSAnLi4vbGF5b3V0cy9sYXlvdXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtY29uZmlnJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS1jb25maWcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93b3Jrc3BhY2UtY29uZmlnLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlQ29uZmlnQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIGxheW91dHM6IFNlbGVjdEl0ZW1bXTtcbiAgcHVibGljIGxheW91dCA9ICdmaXhlZCc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5sYXlvdXRzID0gW1xuICAgICAgeyBsYWJlbDogJ0ZpeGVkJywgdmFsdWU6ICdmaXhlZCd9LFxuICAgICAgeyBsYWJlbDogJ1Jvd3MnLCB2YWx1ZTogJ3Jvd3MnfSxcbiAgICAgIHsgbGFiZWw6ICdDb2x1bW5zJywgdmFsdWU6ICdjb2xzJ30sXG4gICAgICB7IGxhYmVsOiAnR3JpZHN0ZXInLCB2YWx1ZTogJ2dyaWRzdGVyJ31cbiAgICBdO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgLy8gICB0aXRsZTogbmV3IEZvcm1Db250cm9sKClcbiAgICAvLyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZSgpIHtcbiAgICAvLyB0aGlzLndvcmtzcGFjZVNlcnZpY2UubGF5b3V0cy5zdWJzY3JpYmUobHl0cyA9PiB0aGlzLmxheW91dHMgPSBseXRzKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmxheW91dCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuLi93aWRnZXQtc3Bhd25lci93aWRnZXQnO1xuaW1wb3J0IHsgV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi4vd2lkZ2V0LXNwYXduZXIvd2lkZ2V0LmNvbXBvbmVudCc7XG5cbi8qKlxuICogU3VwcG9ydGVkIGNvbW1lbnQgTUlLRVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2Utd2lkZ2V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dpZGdldC1zcGF3bmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2lkZ2V0LXNwYXduZXIuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFdpZGdldFNwYXduZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB3aWRnZXQ6IFdpZGdldDtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBAVmlld0NoaWxkKCd3aWRnZXQnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIHdvcmtzcGFjZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZFdpZGdldCgpO1xuICB9XG5cbiAgbG9hZFdpZGdldCgpIHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy53aWRnZXQuY29tcG9uZW50KTtcbiAgICB0aGlzLndvcmtzcGFjZS5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMud29ya3NwYWNlLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAoPFdpZGdldENvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpLmRhdGFTdHJlYW0gPSB0aGlzLmRhdGFTdHJlYW07XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSG9zdEJpbmRpbmcsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV29ya3NwYWNlU2VydmljZSB9IGZyb20gJy4uLy4uL3dvcmtzcGFjZS1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi93aWRnZXQtc3Bhd25lci93aWRnZXQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd29ya3NwYWNlLWxheW91dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93b3Jrc3BhY2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93b3Jrc3BhY2UuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZUZpeGVkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNsYXNzZXMgPSAnd29ya3NwYWNlJztcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuXG4gIHB1YmxpYyB3aWRnZXRzOiBXaWRnZXRDb21wb25lbnRbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgd29ya3NwYWNlU2VydmljZTogV29ya3NwYWNlU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLndpZGdldHMuc3Vic2NyaWJlKHdndHMgPT4gdGhpcy53aWRnZXRzID0gd2d0cyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplV29ya3NwYWNlKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVXb3Jrc3BhY2UoKTogdm9pZCB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmxvYWRXaWRnZXRzKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkV2lkZ2V0KHdpZGdldE5hbWUpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UuYWRkV2lkZ2V0cyh3aWRnZXROYW1lKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV29ya3NwYWNlU2VydmljZSB9IGZyb20gJy4uLy4uL3dvcmtzcGFjZS1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi93aWRnZXQtc3Bhd25lci93aWRnZXQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd29ya3NwYWNlLWxheW91dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93b3Jrc3BhY2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93b3Jrc3BhY2UuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZVJvd3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICdjb250ZW50JztcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuXG4gIHB1YmxpYyB3aWRnZXRzOiBXaWRnZXRDb21wb25lbnRbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgd29ya3NwYWNlU2VydmljZTogV29ya3NwYWNlU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLndpZGdldHMuc3Vic2NyaWJlKHdndHMgPT4gdGhpcy53aWRnZXRzID0gd2d0cyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplV29ya3NwYWNlKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVXb3Jrc3BhY2UoKTogdm9pZCB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmxvYWRXaWRnZXRzKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkV2lkZ2V0KHdpZGdldE5hbWUpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UuYWRkV2lkZ2V0cyh3aWRnZXROYW1lKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIEhvc3RMaXN0ZW5lciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JpZHN0ZXJDb25maWcsIEdyaWRzdGVySXRlbSB9IGZyb20gJ2FuZ3VsYXItZ3JpZHN0ZXIyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd29ya3NwYWNlLWxheW91dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93b3Jrc3BhY2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93b3Jrc3BhY2UuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZUdyaWRzdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNsYXNzZXMgPSAnd29ya3NwYWNlJztcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuXG4gIHB1YmxpYyB3aWRnZXRzOiBXaWRnZXRDb21wb25lbnRbXSA9IFtdO1xuICBwdWJsaWMgb3B0aW9uczogR3JpZHN0ZXJDb25maWc7XG4gIHB1YmxpYyBkYXNoYm9hcmQ6IEdyaWRzdGVySXRlbVtdO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZShldmVudCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYXBpICYmIHRoaXMub3B0aW9ucy5hcGkucmVzaXplKSB7XG4gICAgICBjb25zb2xlLmxvZygncmVzaXppbmcnKTtcbiAgICAgIHRoaXMub3B0aW9ucy5hcGkucmVzaXplKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICAvKiBBcmVhcyBhdHRyaWJ1dGVzIG5vdCBvZmZpY2lhbCBHcmlkc3RlciB2YWx1ZSBidXQgdG8gaGVscCBpZGVuaXRpZmljYXRpb24gKi9cbiAgICB0aGlzLmRhc2hib2FyZCA9IFtcbiAgICAgIHthcmVhOiAnc3BhdGlhbCcsIGNvbHM6IDMsIHJvd3M6IDMsIHg6IDAsIHk6IDB9LFxuICAgICAge2FyZWE6ICdtYXRyaXgnLCAgY29sczogOSwgcm93czogMywgeDogMywgeTogMH0sXG4gICAgICB7YXJlYTogJ2luZm8nLCAgICBjb2xzOiAzLCByb3dzOiAzLCB4OiAwLCB5OiAzfSxcbiAgICAgIHthcmVhOiAndHJhY2tzJywgIGNvbHM6IDksIHJvd3M6IDMsIHg6IDMsIHk6IDN9XG4gICAgXTtcblxuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIHB1c2hJdGVtczogdHJ1ZSxcbiAgICAgIG1pbkNvbHM6IDYsXG4gICAgICBtYXhDb2xzOiAxMixcbiAgICAgIG1pblJvd3M6IDYsXG4gICAgICBtb2JpbGVCcmVha3BvaW50OiA3NjgsXG4gICAgICBncmlkVHlwZTogJ2ZpdCcsXG4gICAgICByZXNpemFibGU6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICB9LFxuICAgICAgZHJhZ2dhYmxlOiB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgIH0sXG4gICAgICBtYXJnaW46IDhcbiAgIH07XG5cbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Byb2dyZXNzc3Bpbm5lcic7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5pbXBvcnQgeyBDb25maXJtRGlhbG9nTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb25maXJtZGlhbG9nJztcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XG5cbmltcG9ydCB7IFdvcmtzcGFjZUNvbmZpZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlnL3dvcmtzcGFjZS1jb25maWcuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtzcGFjZUNvbXBvbmVudCB9IGZyb20gJy4vd29ya3NwYWNlL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2lkZ2V0U3Bhd25lckNvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0LXNwYXduZXIvd2lkZ2V0LXNwYXduZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgV29ya3NwYWNlRml4ZWRDb21wb25lbnQgfSBmcm9tICcuL2xheW91dHMvZml4ZWQvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IE5neFJlc2l6YWJsZU1vZHVsZSB9IGZyb20gJ0AzZGdlbm9tZXMvbmd4LXJlc2l6YWJsZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VSb3dzQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXRzL3Jvd3Mvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VDb2xzQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXRzL2NvbHMvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEdyaWRzdGVyTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1ncmlkc3RlcjInO1xuaW1wb3J0IHsgV29ya3NwYWNlR3JpZHN0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xheW91dHMvZ3JpZHN0ZXIvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEdlbm9taWNzTGliTW9kdWxlIH0gZnJvbSAnZ2Vub21pY3MtbGliJztcbmltcG9ydCB7IFByb2plY3RzTGliTW9kdWxlIH0gZnJvbSAncHJvamVjdHMtbGliJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgQnV0dG9uTW9kdWxlLFxuICAgIENvbmZpcm1EaWFsb2dNb2R1bGUsXG4gICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgTmd4UmVzaXphYmxlTW9kdWxlLFxuICAgIEdyaWRzdGVyTW9kdWxlLFxuICAgIEdlbm9taWNzTGliTW9kdWxlLFxuICAgIFByb2plY3RzTGliTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFdvcmtzcGFjZUNvbmZpZ0NvbXBvbmVudCxcbiAgICBXaWRnZXRTcGF3bmVyQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZUNvbXBvbmVudCxcbiAgICBXb3Jrc3BhY2VGaXhlZENvbXBvbmVudCxcbiAgICBXb3Jrc3BhY2VSb3dzQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZUNvbHNDb21wb25lbnQsXG4gICAgV29ya3NwYWNlR3JpZHN0ZXJDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBXb3Jrc3BhY2VGaXhlZENvbXBvbmVudCxcbiAgICBXb3Jrc3BhY2VSb3dzQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZUNvbHNDb21wb25lbnQsXG4gICAgV29ya3NwYWNlR3JpZHN0ZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VMaWJNb2R1bGUge31cbiJdLCJuYW1lcyI6WyJCZWhhdmlvclN1YmplY3QiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIkxvY2FsU3RvcmFnZVNlcnZpY2UiLCJDb21wb25lbnQiLCJIb3N0QmluZGluZyIsIklucHV0IiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiUHJvamVjdHNMaWJTZXJ2aWNlIiwiVmlld0NoaWxkIiwiVmlld0NvbnRhaW5lclJlZiIsInRzbGliXzEuX19kZWNvcmF0ZSIsIkJpbmRPYnNlcnZhYmxlIiwiUHJvamVjdCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJQcm9ncmVzc1NwaW5uZXJNb2R1bGUiLCJCdXR0b25Nb2R1bGUiLCJDb25maXJtRGlhbG9nTW9kdWxlIiwiRHJvcGRvd25Nb2R1bGUiLCJOZ3hSZXNpemFibGVNb2R1bGUiLCJHcmlkc3Rlck1vZHVsZSIsIkdlbm9taWNzTGliTW9kdWxlIiwiUHJvamVjdHNMaWJNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLHdCQW9DMkIsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUNwRCxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7UUFDN0gsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVU7WUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFDMUgsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFBRSxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxD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