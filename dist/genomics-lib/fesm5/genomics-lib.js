import { Injectable, NgModule, Component, Input, defineInjectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeLibModule } from 'three-lib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GenomicsLibService = /** @class */ (function () {
    function GenomicsLibService() {
    }
    GenomicsLibService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GenomicsLibService.ctorParameters = function () { return []; };
    /** @nocollapse */ GenomicsLibService.ngInjectableDef = defineInjectable({ factory: function GenomicsLibService_Factory() { return new GenomicsLibService(); }, token: GenomicsLibService, providedIn: "root" });
    return GenomicsLibService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GenomicsSpatialComponent = /** @class */ (function () {
    function GenomicsSpatialComponent() {
    }
    /**
     * @return {?}
     */
    GenomicsSpatialComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dataStream.subscribe(function (strm) { return _this.data = strm; });
    };
    GenomicsSpatialComponent.decorators = [
        { type: Component, args: [{
                    selector: 'genomics-spatial',
                    template: "<section class=\"tk-list\">\n\t<h3>\n\t\tSpatial: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                    styles: [""]
                }] }
    ];
    GenomicsSpatialComponent.ctorParameters = function () { return []; };
    GenomicsSpatialComponent.propDecorators = {
        dataStream: [{ type: Input }]
    };
    return GenomicsSpatialComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GenomicsThreejsComponent = /** @class */ (function () {
    function GenomicsThreejsComponent() {
        this.x = 20;
        this.z = 20;
        this.rotationX = 1;
        this.rotationY = 2;
        this.rotationZ = 3;
        this.translationY = 0;
    }
    /**
     * @return {?}
     */
    GenomicsThreejsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dataStream.subscribe(function (strm) { return _this.data = strm; });
        // console.log('ThreeWidgets: ', ThreeWidgets);
    };
    GenomicsThreejsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'genomics-threejs',
                    template: "<three-test></three-test>\n<!-- <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>\n  <three-webgl-renderer #mainRenderer>\n    <three-perspective-camera [fov]=60 [near]=1 [far]=1100 positionX=20 positionY=50 positionZ=50></three-perspective-camera>\n    <three-scene>\n      <three-axes-helper size=200></three-axes-helper>\n      <three-grid-helper size=100 divisions=10></three-grid-helper>\n      <three-point-light color=\"white\" intensity=\"1\" distance=\"1000\" translateX=50 translateY=50 translateZ=50></three-point-light>\n      <three-object-loader\n        model=\"assets/examples/threejs-test.json\"\n        [translateX]=\"x\"\n        [translateZ]=\"z\"\n        [renderer]=\"mainRenderer\"\n        [rotateX]=\"rotationX\"\n        [rotateY]=\"rotationY\"\n        [rotateZ]=\"rotationZ\"\n        [translateY]=\"translationY\"\n      >\n      </three-object-loader>\n    </three-scene>\n  </three-webgl-renderer>\n</three-orbit-controls> -->\n",
                    styles: [""]
                }] }
    ];
    GenomicsThreejsComponent.ctorParameters = function () { return []; };
    GenomicsThreejsComponent.propDecorators = {
        dataStream: [{ type: Input }]
    };
    return GenomicsThreejsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GenomicsMatrixComponent = /** @class */ (function () {
    function GenomicsMatrixComponent() {
    }
    /**
     * @return {?}
     */
    GenomicsMatrixComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dataStream.subscribe(function (strm) { return _this.data = strm; });
    };
    GenomicsMatrixComponent.decorators = [
        { type: Component, args: [{
                    selector: 'genomics-matrix',
                    template: "<section class=\"tk-list\">\n\t<h3>\n\t\tMatrix: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                    styles: [""]
                }] }
    ];
    GenomicsMatrixComponent.ctorParameters = function () { return []; };
    GenomicsMatrixComponent.propDecorators = {
        dataStream: [{ type: Input }]
    };
    return GenomicsMatrixComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GenomicsInfoComponent = /** @class */ (function () {
    function GenomicsInfoComponent() {
    }
    /**
     * @return {?}
     */
    GenomicsInfoComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dataStream.subscribe(function (strm) { return _this.data = strm; });
    };
    GenomicsInfoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'genomics-info',
                    template: "<section class=\"tk-list\">\n\t<h3>\n\t\tInfo: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                    styles: [""]
                }] }
    ];
    GenomicsInfoComponent.ctorParameters = function () { return []; };
    GenomicsInfoComponent.propDecorators = {
        dataStream: [{ type: Input }]
    };
    return GenomicsInfoComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GenomicsTracksComponent = /** @class */ (function () {
    function GenomicsTracksComponent() {
    }
    /**
     * @return {?}
     */
    GenomicsTracksComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dataStream.subscribe(function (strm) { return _this.data = strm; });
    };
    GenomicsTracksComponent.decorators = [
        { type: Component, args: [{
                    selector: 'genomics-tracks',
                    template: "<section class=\"tk-list\">\n\t<h3>\n\t\tTracks: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                    styles: [""]
                }] }
    ];
    GenomicsTracksComponent.ctorParameters = function () { return []; };
    GenomicsTracksComponent.propDecorators = {
        dataStream: [{ type: Input }]
    };
    return GenomicsTracksComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GenomicsLibModule = /** @class */ (function () {
    function GenomicsLibModule() {
    }
    GenomicsLibModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ThreeLibModule
                    ],
                    declarations: [
                        GenomicsInfoComponent,
                        GenomicsMatrixComponent,
                        GenomicsTracksComponent,
                        GenomicsSpatialComponent,
                        GenomicsThreejsComponent
                    ],
                    exports: [
                        GenomicsInfoComponent,
                        GenomicsMatrixComponent,
                        GenomicsTracksComponent,
                        GenomicsSpatialComponent,
                        GenomicsThreejsComponent
                    ],
                    providers: [],
                    entryComponents: [
                        GenomicsInfoComponent,
                        GenomicsMatrixComponent,
                        GenomicsSpatialComponent,
                        GenomicsTracksComponent,
                        GenomicsThreejsComponent
                    ]
                },] }
    ];
    return GenomicsLibModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { GenomicsLibService, GenomicsSpatialComponent, GenomicsThreejsComponent, GenomicsMatrixComponent, GenomicsInfoComponent, GenomicsTracksComponent, GenomicsLibModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLXNwYXRpYWwvZ2Vub21pY3Mtc3BhdGlhbC5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3MtdGhyZWVqcy9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudC50cyIsIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1tYXRyaXgvZ2Vub21pY3MtbWF0cml4LmNvbXBvbmVudC50cyIsIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1pbmZvL2dlbm9taWNzLWluZm8uY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLXRyYWNrcy9nZW5vbWljcy10cmFja3MuY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLWxpYi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc0xpYlNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2Vub21pY3Mtc3BhdGlhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW5vbWljcy1zcGF0aWFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ2Vub21pY3Mtc3BhdGlhbC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRocmVlV2lkZ2V0cyBmcm9tICd0aHJlZS1saWInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZW5vbWljcy10aHJlZWpzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dlbm9taWNzLXRocmVlanMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc1RocmVlanNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG4gIHB1YmxpYyB4ID0gMjA7XG4gIHB1YmxpYyB6ID0gMjA7XG4gIHB1YmxpYyByb3RhdGlvblggPSAxO1xuICBwdWJsaWMgcm90YXRpb25ZID0gMjtcbiAgcHVibGljIHJvdGF0aW9uWiA9IDM7XG4gIHB1YmxpYyB0cmFuc2xhdGlvblkgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgICAvLyBjb25zb2xlLmxvZygnVGhyZWVXaWRnZXRzOiAnLCBUaHJlZVdpZGdldHMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2Vub21pY3MtbWF0cml4JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dlbm9taWNzLW1hdHJpeC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dlbm9taWNzLW1hdHJpeC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NNYXRyaXhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZW5vbWljcy1pbmZvJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dlbm9taWNzLWluZm8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9nZW5vbWljcy1pbmZvLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc0luZm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2Vub21pY3MtdHJhY2tzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NUcmFja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgR2Vub21pY3NJbmZvQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1pbmZvL2dlbm9taWNzLWluZm8uY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzTWF0cml4Q29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1tYXRyaXgvZ2Vub21pY3MtbWF0cml4LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtdHJhY2tzL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1zcGF0aWFsL2dlbm9taWNzLXNwYXRpYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtdGhyZWVqcy9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaHJlZUxpYk1vZHVsZSB9IGZyb20gJ3RocmVlLWxpYic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVGhyZWVMaWJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR2Vub21pY3NJbmZvQ29tcG9uZW50LFxuICAgIEdlbm9taWNzTWF0cml4Q29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RocmVlanNDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUcmFja3NDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NMaWJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs2QkFKRDtDQUVBOzs7Ozs7QUNGQTtJQVdFO0tBQWlCOzs7O0lBRVYsMkNBQVE7OztJQUFmO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENB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