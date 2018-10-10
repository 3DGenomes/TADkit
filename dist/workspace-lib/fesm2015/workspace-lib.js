import { Injectable, NgModule, Component, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, HostBinding, HostListener, defineInjectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-store';
import * as genomicsWidgets from 'genomics-lib';
import { GenomicsLibModule } from 'genomics-lib';
import { __decorate, __metadata } from 'tslib';
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
class Widget {
    /**
     * @param {?} component
     * @param {?} dataStream
     */
    constructor(component, dataStream) {
        this.component = component;
        this.dataStream = dataStream;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WorkspaceService {
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
/** @nocollapse */ WorkspaceService.ngInjectableDef = defineInjectable({ factory: function WorkspaceService_Factory() { return new WorkspaceService(inject(HttpClient), inject(LocalStorageService)); }, token: WorkspaceService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Workspace {
    /**
     * @param {?} component
     * @param {?} dataStream
     */
    constructor(component, dataStream) {
        this.component = component;
        this.dataStream = dataStream;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WorkspaceColsComponent {
    /**
     * @param {?} workspaceService
     */
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
        this.classes = 'content cols';
        this.widgets = [];
        this.workspaceService.widgets.subscribe(wgts => this.widgets = wgts);
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
WorkspaceColsComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-layout',
                template: "<rsz-layout class=\"row\" [directions]=\"['right']\" [rFlex]=\"true\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i;\">\n\t<rsz-layout *ngIf=\"i===0\" class=\"cell\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t</rsz-layout>\n\t<rsz-layout *ngIf=\"i===2\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n<rsz-layout class=\"row\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i;\">\n\t\t<rsz-layout *ngIf=\"i===1\" class=\"cell\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i===3\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n",
                styles: [""]
            }] }
];
WorkspaceColsComponent.ctorParameters = () => [
    { type: WorkspaceService }
];
WorkspaceColsComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class',] }],
    dataStream: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WorkspaceComponent {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} projectsService
     */
    constructor(componentFactoryResolver, projectsService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.projectsService = projectsService;
        // this.workspacesStream = new BehaviorSubject<Workspace[]>([]);
        // this.workspaces = this.workspacesStream.asObservable();
        this.projectsService.currentProject.subscribe(prj => this.data = prj);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadWorkpace();
    }
    /**
     * @param {?=} workspaceName
     * @return {?}
     */
    setWorkspace(workspaceName) {
        // const workspaceComponent = workspaceLayouts[workspaceName];
        // if (!workspaceName) {}; // USE DEFAULT???
        this.currentWorkspace = new Workspace(WorkspaceColsComponent, null);
    }
    /**
     * @return {?}
     */
    loadWorkpace() {
        this.setWorkspace();
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentWorkspace.component);
        this.routespace.clear();
        /** @type {?} */
        const componentRef = this.routespace.createComponent(componentFactory);
        (componentRef.instance).dataStream = this.dataStream;
    }
}
WorkspaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-layout',
                template: "<ng-template #workspace></ng-template>  ",
                styles: [":host{display:-ms-grid;display:grid}"]
            }] }
];
WorkspaceComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ProjectsLibService }
];
WorkspaceComponent.propDecorators = {
    routespace: [{ type: ViewChild, args: ['workspace', { read: ViewContainerRef },] }]
};
__decorate([
    BindObservable('dataStream'),
    __metadata("design:type", Project)
], WorkspaceComponent.prototype, "data", void 0);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// import { Layout } from '../layouts/layout';
class WorkspaceConfigComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Supported comment MIKE
 */
class WidgetSpawnerComponent {
    /**
     * @param {?} componentFactoryResolver
     */
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadWidget();
    }
    /**
     * @return {?}
     */
    loadWidget() {
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widget.component);
        this.workspace.clear();
        /** @type {?} */
        const componentRef = this.workspace.createComponent(componentFactory);
        ((/** @type {?} */ (componentRef.instance))).dataStream = this.dataStream;
    }
}
WidgetSpawnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-widget',
                template: "<ng-template #widget></ng-template>  ",
                styles: [":host{height:100%;width:100%}"]
            }] }
];
WidgetSpawnerComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
WidgetSpawnerComponent.propDecorators = {
    widget: [{ type: Input }],
    dataStream: [{ type: Input }],
    workspace: [{ type: ViewChild, args: ['widget', { read: ViewContainerRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WorkspaceFixedComponent {
    /**
     * @param {?} workspaceService
     */
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
        this.classes = 'workspace';
        this.widgets = [];
        this.workspaceService.widgets.subscribe(wgts => this.widgets = wgts);
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
WorkspaceFixedComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-layout',
                template: "<workspace-widget *ngFor=\"let widget of widgets\" [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n",
                styles: [":host{display:-ms-grid;display:grid;-ms-grid-columns:360px 1fr;grid-template-columns:360px 1fr;-ms-grid-rows:360px 1fr;grid-template-rows:360px 1fr;grid-gap:10px;border:8px solid #f0f0f0}"]
            }] }
];
WorkspaceFixedComponent.ctorParameters = () => [
    { type: WorkspaceService }
];
WorkspaceFixedComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class',] }],
    dataStream: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WorkspaceRowsComponent {
    /**
     * @param {?} workspaceService
     */
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
        this.classes = 'content';
        this.widgets = [];
        this.workspaceService.widgets.subscribe(wgts => this.widgets = wgts);
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
WorkspaceRowsComponent.decorators = [
    { type: Component, args: [{
                selector: 'workspace-layout',
                template: "<rsz-layout class=\"row\" [directions]=\"['bottom']\" [rFlex]=\"true\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i; even as flex;\">\n\t\t<rsz-layout *ngIf=\"i<2 && flex\" class=\"cell\" [directions]=\"['right']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i<2 && !flex\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n<rsz-layout class=\"row\" [directions]=\"['none']\" [rFlex]=\"false\">\n\t<ng-container *ngFor=\"let widget of widgets; index as i; even as flex;\">\n\t\t<rsz-layout *ngIf=\"i>1 && flex\" class=\"cell\" [directions]=\"['right']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t\t<rsz-layout *ngIf=\"i>1 && !flex\" class=\"cell\" [directions]=\"['none']\" [rFlex]=\"flex\">\n\t\t\t<workspace-widget [widget]=\"widget\" [dataStream]=\"dataStream\"></workspace-widget>\n\t\t</rsz-layout>\n\t</ng-container>\n</rsz-layout>\n",
                styles: [""]
            }] }
];
WorkspaceRowsComponent.ctorParameters = () => [
    { type: WorkspaceService }
];
WorkspaceRowsComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class',] }],
    dataStream: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WorkspaceGridsterComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WorkspaceLibModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { WorkspaceService, WorkspaceComponent, WorkspaceConfigComponent, WidgetSpawnerComponent, WorkspaceFixedComponent, WorkspaceRowsComponent, WorkspaceColsComponent, WorkspaceGridsterComponent, WorkspaceLibModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLWxpYi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvd2lkZ2V0LXNwYXduZXIvd2lkZ2V0LnRzIiwibmc6Ly93b3Jrc3BhY2UtbGliL2xpYi93b3Jrc3BhY2UtbGliLnNlcnZpY2UudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL3dvcmtzcGFjZS93b3Jrc3BhY2UudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL2xheW91dHMvY29scy93b3Jrc3BhY2UuY29tcG9uZW50LnRzIiwibmc6Ly93b3Jrc3BhY2UtbGliL2xpYi93b3Jrc3BhY2Uvd29ya3NwYWNlLmNvbXBvbmVudC50cyIsIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvY29uZmlnL3dvcmtzcGFjZS1jb25maWcuY29tcG9uZW50LnRzIiwibmc6Ly93b3Jrc3BhY2UtbGliL2xpYi93aWRnZXQtc3Bhd25lci93aWRnZXQtc3Bhd25lci5jb21wb25lbnQudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL2xheW91dHMvZml4ZWQvd29ya3NwYWNlLmNvbXBvbmVudC50cyIsIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvbGF5b3V0cy9yb3dzL3dvcmtzcGFjZS5jb21wb25lbnQudHMiLCJuZzovL3dvcmtzcGFjZS1saWIvbGliL2xheW91dHMvZ3JpZHN0ZXIvd29ya3NwYWNlLmNvbXBvbmVudC50cyIsIm5nOi8vd29ya3NwYWNlLWxpYi9saWIvd29ya3NwYWNlLWxpYi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgV2lkZ2V0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbXBvbmVudDogVHlwZTxhbnk+LFxuICAgIHB1YmxpYyBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPGFueT5cbiAgKSB7fVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICduZ3gtc3RvcmUnO1xuaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSAnLi9sYXlvdXRzL2xheW91dCc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuL3dpZGdldC1zcGF3bmVyL3dpZGdldCc7XG5cbmltcG9ydCAqIGFzIGdlbm9taWNzV2lkZ2V0cyBmcm9tICdnZW5vbWljcy1saWInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB3aWRnZXRzU3RyZWFtVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgd2lkZ2V0c1N0cmVhbTogQmVoYXZpb3JTdWJqZWN0PFdpZGdldFtdPjtcbiAgcHVibGljIHdpZGdldHM6IE9ic2VydmFibGU8V2lkZ2V0W10+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMud2lkZ2V0c1N0cmVhbVVybCA9ICdhc3NldHMvZGVmYXVsdHMvdGstZGVmYXVsdC13b3Jrc3BhY2UuanNvbic7XG4gICAgdGhpcy53aWRnZXRzU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXaWRnZXRbXT4oW10pO1xuICAgIHRoaXMud2lkZ2V0cyA9IHRoaXMud2lkZ2V0c1N0cmVhbS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlV2lkZ2V0cyh3aWRnZXRzQXJyYXkpIHtcbiAgICB0aGlzLndpZGdldHNTdHJlYW0ubmV4dCh3aWRnZXRzQXJyYXkpO1xuICAgIC8vIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ3dvcmtzcGFjZScsIHdpZGdldHNBcnJheSk7XG4gIH1cblxuICBwdWJsaWMgbG9hZFdpZGdldHMoKTogdm9pZCB7XG4gICAgLy8gY29uc3Qgd2lkZ2V0c1N0b3JlZCA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ3dvcmtzcGFjZScpO1xuICAgIC8vIGlmICghd2lkZ2V0c1N0b3JlZCkge1xuICAgIC8vICAgdGhpcy5odHRwQ2xpZW50LmdldDxXaWRnZXRbXT4odGhpcy53aWRnZXRzU3RyZWFtVXJsKVxuICAgIC8vICAgLnN1YnNjcmliZSh3aWRnZXRBcnJheSA9PiB7XG4gICAgLy8gICAgIHRoaXMudXBkYXRlV2lkZ2V0cyh3aWRnZXRBcnJheSk7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9IGVsc2Uge1xuICAgICAgbGV0IHdpZGdldHMgPSBbXTtcbiAgICAgIGNvbnN0IGRhdGEgPSB7dGl0bGU6ICd0aXRsZScsIHN0YXRlOiBmYWxzZX07XG4gICAgICB0aGlzLndpZGdldHMuc3Vic2NyaWJlKHdkZ3QgPT4gd2lkZ2V0cyA9IHdkZ3QpO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHdpZGdldHMpIHx8ICF3aWRnZXRzLmxlbmd0aCkge1xuICAgICAgICAvLyBEZWZhdWx0IFdpZGdldHNcbiAgICAgICAgdGhpcy5hZGRXaWRnZXRzKFxuICAgICAgICAgICdHZW5vbWljc1RocmVlanNDb21wb25lbnQnLFxuICAgICAgICAgICdHZW5vbWljc01hdHJpeENvbXBvbmVudCcsXG4gICAgICAgICAgJ0dlbm9taWNzSW5mb0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0dlbm9taWNzVHJhY2tzQ29tcG9uZW50J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gfVxuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldHMoLi4ud2lkZ2V0TmFtZXNBcnJheTogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCB3aWRnZXRzQXJyYXkgPSBbIC4uLnRoaXMud2lkZ2V0c1N0cmVhbS5nZXRWYWx1ZSgpIF07XG4gICAgd2lkZ2V0TmFtZXNBcnJheS5mb3JFYWNoKHdpZGdldE5hbWUgPT4ge1xuICAgICAgY29uc3Qgd2lkZ2V0Q29tcG9uZW50ID0gZ2Vub21pY3NXaWRnZXRzW3dpZGdldE5hbWVdO1xuICAgICAgICAgIC8vIGlmICghd2lkZ2V0TmFtZSkge307IC8vIFVTRSBERUZBVUxUPz8/XG4gICAgICBjb25zdCBuZXdXaWRnZXQgPSBuZXcgV2lkZ2V0KHdpZGdldENvbXBvbmVudCwgbnVsbCk7XG4gICAgICB3aWRnZXRzQXJyYXkucHVzaChuZXdXaWRnZXQpO1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlV2lkZ2V0cyh3aWRnZXRzQXJyYXkpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZVdpZGdldCh3aWRnZXROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLndpZGdldHMuc3Vic2NyaWJlKHdkZ3QgPT4gY29uc29sZS5sb2cod2RndCkpO1xuICAgIC8vIGNvbnN0IHdpZGdldHNBcnJheSA9IHRoaXMud2lkZ2V0c1N0cmVhbS5nZXRWYWx1ZSgpLmZpbHRlcihpdGVtID0+IGl0ZW0uZGF0YS50aXRsZSAhPT0gd2lkZ2V0TmFtZSk7XG4gICAgLy8gdGhpcy51cGRhdGVXaWRnZXRzKHdpZGdldHNBcnJheSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbXBvbmVudDogVHlwZTxhbnk+LFxuICAgIHB1YmxpYyBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPGFueT5cbiAgKSB7fVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV29ya3NwYWNlU2VydmljZSB9IGZyb20gJy4uLy4uL3dvcmtzcGFjZS1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi93aWRnZXQtc3Bhd25lci93aWRnZXQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd29ya3NwYWNlLWxheW91dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93b3Jrc3BhY2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93b3Jrc3BhY2UuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZUNvbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICdjb250ZW50IGNvbHMnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV29ya3NwYWNlIH0gZnJvbSAnLi93b3Jrc3BhY2UnO1xuaW1wb3J0IHsgQmluZE9ic2VydmFibGUgfSBmcm9tICdiaW5kLW9ic2VydmFibGUnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJ3Byb2plY3RzLWxpYic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFByb2plY3RzTGliU2VydmljZSB9IGZyb20gJ3Byb2plY3RzLWxpYic7XG4vLyBpbXBvcnQgKiBhcyB3b3Jrc3BhY2VMYXlvdXRzIGZyb20gJ3dvcmtzcGFjZXMtbGliJztcbmltcG9ydCB7IFdvcmtzcGFjZUZpeGVkQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5b3V0cy9maXhlZC93b3Jrc3BhY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtzcGFjZVJvd3NDb21wb25lbnQgfSBmcm9tICcuLi9sYXlvdXRzL3Jvd3Mvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VDb2xzQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5b3V0cy9jb2xzL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya3NwYWNlR3JpZHN0ZXJDb21wb25lbnQgfSBmcm9tICcuLi9sYXlvdXRzL2dyaWRzdGVyL3dvcmtzcGFjZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3dvcmtzcGFjZScsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgcm91dGVzcGFjZTtcblxuICAvLyBwcml2YXRlIHdvcmtzcGFjZXNTdHJlYW06IEJlaGF2aW9yU3ViamVjdDxXb3Jrc3BhY2VbXT47XG4gIC8vIHB1YmxpYyB3b3Jrc3BhY2VzOiBPYnNlcnZhYmxlPFdvcmtzcGFjZVtdPjtcbiAgcHVibGljIGN1cnJlbnRXb3Jrc3BhY2U6IFdvcmtzcGFjZTtcblxuICBAQmluZE9ic2VydmFibGUoJ2RhdGFTdHJlYW0nKSBwcml2YXRlIGRhdGE6IFByb2plY3Q7XG4gIHB1YmxpYyBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPFByb2plY3Q+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBwcm9qZWN0c1NlcnZpY2U6IFByb2plY3RzTGliU2VydmljZVxuICApIHtcbiAgICAvLyB0aGlzLndvcmtzcGFjZXNTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdvcmtzcGFjZVtdPihbXSk7XG4gICAgLy8gdGhpcy53b3Jrc3BhY2VzID0gdGhpcy53b3Jrc3BhY2VzU3RyZWFtLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMucHJvamVjdHNTZXJ2aWNlLmN1cnJlbnRQcm9qZWN0LnN1YnNjcmliZShwcmogPT4gdGhpcy5kYXRhID0gcHJqKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZFdvcmtwYWNlKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0V29ya3NwYWNlKHdvcmtzcGFjZU5hbWU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBjb25zdCB3b3Jrc3BhY2VDb21wb25lbnQgPSB3b3Jrc3BhY2VMYXlvdXRzW3dvcmtzcGFjZU5hbWVdO1xuICAgIC8vIGlmICghd29ya3NwYWNlTmFtZSkge307IC8vIFVTRSBERUZBVUxUPz8/XG4gICAgdGhpcy5jdXJyZW50V29ya3NwYWNlID0gbmV3IFdvcmtzcGFjZShXb3Jrc3BhY2VDb2xzQ29tcG9uZW50LCBudWxsKTtcbiAgfVxuXG4gIGxvYWRXb3JrcGFjZSgpIHtcbiAgICB0aGlzLnNldFdvcmtzcGFjZSgpO1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmN1cnJlbnRXb3Jrc3BhY2UuY29tcG9uZW50KTtcbiAgICB0aGlzLnJvdXRlc3BhY2UuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLnJvdXRlc3BhY2UuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIChjb21wb25lbnRSZWYuaW5zdGFuY2UpLmRhdGFTdHJlYW0gPSB0aGlzLmRhdGFTdHJlYW07XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuaW1wb3J0IHsgV29ya3NwYWNlU2VydmljZSB9IGZyb20gJy4uL3dvcmtzcGFjZS1saWIuc2VydmljZSc7XG4vLyBpbXBvcnQgeyBMYXlvdXQgfSBmcm9tICcuLi9sYXlvdXRzL2xheW91dCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dvcmtzcGFjZS1jb25maWcnLFxuICB0ZW1wbGF0ZVVybDogJy4vd29ya3NwYWNlLWNvbmZpZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS1jb25maWcuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VDb25maWdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgbGF5b3V0czogU2VsZWN0SXRlbVtdO1xuICBwdWJsaWMgbGF5b3V0ID0gJ2ZpeGVkJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtzcGFjZVNlcnZpY2U6IFdvcmtzcGFjZVNlcnZpY2UpIHtcbiAgICB0aGlzLmxheW91dHMgPSBbXG4gICAgICB7IGxhYmVsOiAnRml4ZWQnLCB2YWx1ZTogJ2ZpeGVkJ30sXG4gICAgICB7IGxhYmVsOiAnUm93cycsIHZhbHVlOiAncm93cyd9LFxuICAgICAgeyBsYWJlbDogJ0NvbHVtbnMnLCB2YWx1ZTogJ2NvbHMnfSxcbiAgICAgIHsgbGFiZWw6ICdHcmlkc3RlcicsIHZhbHVlOiAnZ3JpZHN0ZXInfVxuICAgIF07XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAvLyAgIHRpdGxlOiBuZXcgRm9ybUNvbnRyb2woKVxuICAgIC8vIH0pO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKCkge1xuICAgIC8vIHRoaXMud29ya3NwYWNlU2VydmljZS5sYXlvdXRzLnN1YnNjcmliZShseXRzID0+IHRoaXMubGF5b3V0cyA9IGx5dHMpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubGF5b3V0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldCc7XG5pbXBvcnQgeyBXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi93aWRnZXQtc3Bhd25lci93aWRnZXQuY29tcG9uZW50JztcblxuLyoqXG4gKiBTdXBwb3J0ZWQgY29tbWVudCBNSUtFXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dvcmtzcGFjZS13aWRnZXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd2lkZ2V0LXNwYXduZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93aWRnZXQtc3Bhd25lci5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV2lkZ2V0U3Bhd25lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHdpZGdldDogV2lkZ2V0O1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ3dpZGdldCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgd29ya3NwYWNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sb2FkV2lkZ2V0KCk7XG4gIH1cblxuICBsb2FkV2lkZ2V0KCkge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLndpZGdldC5jb21wb25lbnQpO1xuICAgIHRoaXMud29ya3NwYWNlLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy53b3Jrc3BhY2UuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICg8V2lkZ2V0Q29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuZGF0YVN0cmVhbSA9IHRoaXMuZGF0YVN0cmVhbTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlRml4ZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICd3b3Jrc3BhY2UnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd29ya3NwYWNlLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3dpZGdldC1zcGF3bmVyL3dpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlUm93c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzc2VzID0gJ2NvbnRlbnQnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB3b3Jrc3BhY2VTZXJ2aWNlOiBXb3Jrc3BhY2VTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud2lkZ2V0cy5zdWJzY3JpYmUod2d0cyA9PiB0aGlzLndpZGdldHMgPSB3Z3RzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVdvcmtzcGFjZSgpOiB2b2lkIHtcbiAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UubG9hZFdpZGdldHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRXaWRnZXQod2lkZ2V0TmFtZSk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5hZGRXaWRnZXRzKHdpZGdldE5hbWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdvcmtzcGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi93b3Jrc3BhY2UtbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vd2lkZ2V0LXNwYXduZXIvd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkc3RlckNvbmZpZywgR3JpZHN0ZXJJdGVtIH0gZnJvbSAnYW5ndWxhci1ncmlkc3RlcjInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3Jrc3BhY2UtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlR3JpZHN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NlcyA9ICd3b3Jrc3BhY2UnO1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG5cbiAgcHVibGljIHdpZGdldHM6IFdpZGdldENvbXBvbmVudFtdID0gW107XG4gIHB1YmxpYyBvcHRpb25zOiBHcmlkc3RlckNvbmZpZztcbiAgcHVibGljIGRhc2hib2FyZDogR3JpZHN0ZXJJdGVtW107XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hcGkgJiYgdGhpcy5vcHRpb25zLmFwaS5yZXNpemUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZXNpemluZycpO1xuICAgICAgdGhpcy5vcHRpb25zLmFwaS5yZXNpemUoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHdvcmtzcGFjZVNlcnZpY2U6IFdvcmtzcGFjZVNlcnZpY2UsXG4gICkge1xuICAgIC8qIEFyZWFzIGF0dHJpYnV0ZXMgbm90IG9mZmljaWFsIEdyaWRzdGVyIHZhbHVlIGJ1dCB0byBoZWxwIGlkZW5pdGlmaWNhdGlvbiAqL1xuICAgIHRoaXMuZGFzaGJvYXJkID0gW1xuICAgICAge2FyZWE6ICdzcGF0aWFsJywgY29sczogMywgcm93czogMywgeDogMCwgeTogMH0sXG4gICAgICB7YXJlYTogJ21hdHJpeCcsICBjb2xzOiA5LCByb3dzOiAzLCB4OiAzLCB5OiAwfSxcbiAgICAgIHthcmVhOiAnaW5mbycsICAgIGNvbHM6IDMsIHJvd3M6IDMsIHg6IDAsIHk6IDN9LFxuICAgICAge2FyZWE6ICd0cmFja3MnLCAgY29sczogOSwgcm93czogMywgeDogMywgeTogM31cbiAgICBdO1xuXG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgcHVzaEl0ZW1zOiB0cnVlLFxuICAgICAgbWluQ29sczogNixcbiAgICAgIG1heENvbHM6IDEyLFxuICAgICAgbWluUm93czogNixcbiAgICAgIG1vYmlsZUJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgIGdyaWRUeXBlOiAnZml0JyxcbiAgICAgIHJlc2l6YWJsZToge1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgIH0sXG4gICAgICBkcmFnZ2FibGU6IHtcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIG1hcmdpbjogOFxuICAgfTtcblxuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS53aWRnZXRzLnN1YnNjcmliZSh3Z3RzID0+IHRoaXMud2lkZ2V0cyA9IHdndHMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZVdvcmtzcGFjZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplV29ya3NwYWNlKCk6IHZvaWQge1xuICAgIHRoaXMud29ya3NwYWNlU2VydmljZS5sb2FkV2lkZ2V0cygpO1xuICB9XG5cbiAgcHVibGljIGFkZFdpZGdldCh3aWRnZXROYW1lKTogdm9pZCB7XG4gICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmFkZFdpZGdldHMod2lkZ2V0TmFtZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJvZ3Jlc3NzcGlubmVyJztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7IENvbmZpcm1EaWFsb2dNb2R1bGUgfSBmcm9tICdwcmltZW5nL2NvbmZpcm1kaWFsb2cnO1xuaW1wb3J0IHsgRHJvcGRvd25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2Ryb3Bkb3duJztcblxuaW1wb3J0IHsgV29ya3NwYWNlQ29uZmlnQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWcvd29ya3NwYWNlLWNvbmZpZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya3NwYWNlQ29tcG9uZW50IH0gZnJvbSAnLi93b3Jrc3BhY2Uvd29ya3NwYWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXaWRnZXRTcGF3bmVyQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXQtc3Bhd25lci93aWRnZXQtc3Bhd25lci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBXb3Jrc3BhY2VGaXhlZENvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0cy9maXhlZC93b3Jrc3BhY2UuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTmd4UmVzaXphYmxlTW9kdWxlIH0gZnJvbSAnQDNkZ2Vub21lcy9uZ3gtcmVzaXphYmxlJztcbmltcG9ydCB7IFdvcmtzcGFjZVJvd3NDb21wb25lbnQgfSBmcm9tICcuL2xheW91dHMvcm93cy93b3Jrc3BhY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFdvcmtzcGFjZUNvbHNDb21wb25lbnQgfSBmcm9tICcuL2xheW91dHMvY29scy93b3Jrc3BhY2UuY29tcG9uZW50JztcblxuaW1wb3J0IHsgR3JpZHN0ZXJNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWdyaWRzdGVyMic7XG5pbXBvcnQgeyBXb3Jrc3BhY2VHcmlkc3RlckNvbXBvbmVudCB9IGZyb20gJy4vbGF5b3V0cy9ncmlkc3Rlci93b3Jrc3BhY2UuY29tcG9uZW50JztcblxuaW1wb3J0IHsgR2Vub21pY3NMaWJNb2R1bGUgfSBmcm9tICdnZW5vbWljcy1saWInO1xuaW1wb3J0IHsgUHJvamVjdHNMaWJNb2R1bGUgfSBmcm9tICdwcm9qZWN0cy1saWInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBCdXR0b25Nb2R1bGUsXG4gICAgQ29uZmlybURpYWxvZ01vZHVsZSxcbiAgICBEcm9wZG93bk1vZHVsZSxcbiAgICBOZ3hSZXNpemFibGVNb2R1bGUsXG4gICAgR3JpZHN0ZXJNb2R1bGUsXG4gICAgR2Vub21pY3NMaWJNb2R1bGUsXG4gICAgUHJvamVjdHNMaWJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgV29ya3NwYWNlQ29uZmlnQ29tcG9uZW50LFxuICAgIFdpZGdldFNwYXduZXJDb21wb25lbnQsXG4gICAgV29ya3NwYWNlQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZUZpeGVkQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZVJvd3NDb21wb25lbnQsXG4gICAgV29ya3NwYWNlQ29sc0NvbXBvbmVudCxcbiAgICBXb3Jrc3BhY2VHcmlkc3RlckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW10sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIFdvcmtzcGFjZUZpeGVkQ29tcG9uZW50LFxuICAgIFdvcmtzcGFjZVJvd3NDb21wb25lbnQsXG4gICAgV29ya3NwYWNlQ29sc0NvbXBvbmVudCxcbiAgICBXb3Jrc3BhY2VHcmlkc3RlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZUxpYk1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19kZWNvcmF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7OztJQUNFLFlBQ1MsU0FBb0IsRUFDcEIsVUFBMkI7UUFEM0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtLQUNoQztDQUNMOzs7Ozs7QUNSRDs7Ozs7SUFrQkUsWUFDVSxVQUFzQixFQUN0QixtQkFBd0M7UUFEeEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBRWhELElBQUksQ0FBQyxnQkFBZ0IsR0FBRywyQ0FBMkMsQ0FBQztRQUNwRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNsRDs7Ozs7SUFFTyxhQUFhLENBQUMsWUFBWTtRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7S0FFdkM7Ozs7SUFFTSxXQUFXOzs7Ozs7Ozs7WUFRVixPQUFPLEdBQUcsRUFBRTtRQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTs7WUFFOUMsSUFBSSxDQUFDLFVBQVUsQ0FDYiwwQkFBMEIsRUFDMUIseUJBQXlCLEVBQ3pCLHVCQUF1QixFQUN2Qix5QkFBeUIsQ0FDMUIsQ0FBQztTQUNIOztLQUVKOzs7OztJQUVNLFVBQVUsQ0FBQyxHQUFHLGdCQUEwQjs7Y0FDdkMsWUFBWSxHQUFHLENBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFFO1FBQ3pELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFVOztrQkFDM0IsZUFBZSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUM7OztrQkFFN0MsU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUM7WUFDbkQsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQUVNLFlBQVksQ0FBQyxVQUFrQjtRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7S0FHbkQ7OztZQTdERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQVZRLFVBQVU7WUFFVixtQkFBbUI7Ozs7Ozs7O0FDQTVCOzs7OztJQUNFLFlBQ1MsU0FBb0IsRUFDcEIsVUFBMkI7UUFEM0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtLQUNoQztDQUNMOzs7Ozs7QUNSRDs7OztJQWdCRSxZQUNVLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBTnRCLFlBQU8sR0FBRyxjQUFjLENBQUM7UUFHeEMsWUFBTyxHQUFzQixFQUFFLENBQUM7UUFLckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDdEU7Ozs7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDNUI7Ozs7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3JDOzs7OztJQUVNLFNBQVMsQ0FBQyxVQUFVO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDOUM7OztZQTVCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsMG9DQUF5Qzs7YUFFMUM7OztZQVBRLGdCQUFnQjs7O3NCQVV0QixXQUFXLFNBQUMsT0FBTzt5QkFDbkIsS0FBSzs7Ozs7Ozs7Ozs7O0lDZU4sWUFDVSx3QkFBa0QsRUFDbEQsZUFBbUM7UUFEbkMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7OztRQUkzQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDdkU7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCOzs7OztJQUVNLFlBQVksQ0FBQyxhQUFzQjs7O1FBR3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNyRTs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7O2NBQ2QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7UUFDL0csSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Y0FDbEIsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1FBQ3RFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN0RDs7O1lBeENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixvREFBeUM7O2FBRTFDOzs7WUFoQmdFLHdCQUF3QjtZQUtoRixrQkFBa0I7Ozt5QkFheEIsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzs7QUFNbEJBO0lBQTdCLGNBQWMsQ0FBQyxZQUFZLENBQUM7OEJBQWUsT0FBTztnREFBQzs7Ozs7O0FDeEJ0RDtBQVdBOzs7O0lBSUUsWUFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFGL0MsV0FBTSxHQUFHLE9BQU8sQ0FBQztRQUd0QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7WUFDakMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUM7WUFDL0IsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUM7WUFDbEMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUM7U0FDeEMsQ0FBQztLQUNIOzs7O0lBRUQsUUFBUTs7OztLQUlQOzs7O0lBRU0sUUFBUTs7UUFFYixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQjs7O1lBM0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1Qix5TEFBZ0Q7O2FBRWpEOzs7WUFQUSxnQkFBZ0I7Ozs7Ozs7QUNIekI7OztBQWNBOzs7O0lBS0UsWUFBb0Isd0JBQWtEO1FBQWxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7S0FBSTs7OztJQUUxRSxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ25COzs7O0lBRUQsVUFBVTs7Y0FDRixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Y0FDakIsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1FBQ3JFLG9CQUFrQixZQUFZLENBQUMsUUFBUSxJQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3ZFOzs7WUF0QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGlEQUE4Qzs7YUFFL0M7OztZQVo2Qyx3QkFBd0I7OztxQkFlbkUsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7Ozs7Ozs7QUNqQi9DOzs7O0lBZ0JFLFlBQ1UsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFOdEIsWUFBTyxHQUFHLFdBQVcsQ0FBQztRQUdyQyxZQUFPLEdBQXNCLEVBQUUsQ0FBQztRQUtyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN0RTs7OztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUM1Qjs7OztJQUVPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDckM7Ozs7O0lBRU0sU0FBUyxDQUFDLFVBQVU7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM5Qzs7O1lBNUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixvSUFBeUM7O2FBRTFDOzs7WUFQUSxnQkFBZ0I7OztzQkFVdEIsV0FBVyxTQUFDLE9BQU87eUJBQ25CLEtBQUs7Ozs7Ozs7QUNaUjs7OztJQWdCRSxZQUNVLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBTnRCLFlBQU8sR0FBRyxTQUFTLENBQUM7UUFHbkMsWUFBTyxHQUFzQixFQUFFLENBQUM7UUFLckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDdEU7Ozs7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDNUI7Ozs7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3JDOzs7OztJQUVNLFNBQVMsQ0FBQyxVQUFVO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDOUM7OztZQTVCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIseXNDQUF5Qzs7YUFFMUM7OztZQVBRLGdCQUFnQjs7O3NCQVV0QixXQUFXLFNBQUMsT0FBTzt5QkFDbkIsS0FBSzs7Ozs7OztBQ1pSOzs7O0lBMkJFLFlBQ1UsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFoQnRCLFlBQU8sR0FBRyxXQUFXLENBQUM7UUFHckMsWUFBTyxHQUFzQixFQUFFLENBQUM7O1FBZ0JyQyxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2YsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDL0MsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDL0MsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFLLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDL0MsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUM7U0FDaEQsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQztZQUNWLGdCQUFnQixFQUFFLEdBQUc7WUFDckIsUUFBUSxFQUFFLEtBQUs7WUFDZixTQUFTLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxNQUFNLEVBQUUsQ0FBQztTQUNYLENBQUM7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN0RTs7Ozs7SUFuQ0QsUUFBUSxDQUFDLEtBQUs7UUFDWixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzNCO0tBQ0Y7Ozs7SUFnQ00sUUFBUTtRQUNiLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0tBQzVCOzs7O0lBRU8sbUJBQW1CO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNyQzs7Ozs7SUFFTSxTQUFTLENBQUMsVUFBVTtRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzlDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHNRQUF5Qzs7YUFFMUM7OztZQVJRLGdCQUFnQjs7O3NCQVd0QixXQUFXLFNBQUMsT0FBTzt5QkFDbkIsS0FBSzt1QkFNTCxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0FDbkIzQzs7O1lBeUJDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUNYLHFCQUFxQjtvQkFDckIsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLGNBQWM7b0JBQ2Qsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGlCQUFpQjtvQkFDakIsaUJBQWlCO2lCQUNsQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osd0JBQXdCO29CQUN4QixzQkFBc0I7b0JBQ3RCLGtCQUFrQjtvQkFDbEIsdUJBQXVCO29CQUN2QixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO2lCQUMzQjtnQkFDRCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsRUFBRTtnQkFDYixlQUFlLEVBQUU7b0JBQ2YsdUJBQXVCO29CQUN2QixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO2lCQUMzQjthQUNGOzs7Ozs7Ozs7Ozs7Ozs7In0=