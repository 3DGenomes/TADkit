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
var GenomicsLibModule = /** @class */ (function () {
    function GenomicsLibModule() {
    }
    GenomicsLibModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ThreeLibModule],
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

export { GenomicsLibService, GenomicsLibModule, GenomicsSpatialComponent, GenomicsThreejsComponent, GenomicsMatrixComponent, GenomicsInfoComponent, GenomicsTracksComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLWluZm8vZ2Vub21pY3MtaW5mby5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3MtbWF0cml4L2dlbm9taWNzLW1hdHJpeC5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3MtdHJhY2tzL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3Mtc3BhdGlhbC9nZW5vbWljcy1zcGF0aWFsLmNvbXBvbmVudC50cyIsIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy10aHJlZWpzL2dlbm9taWNzLXRocmVlanMuY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLWxpYi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc0xpYlNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2Vub21pY3MtaW5mbycsXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW5vbWljcy1pbmZvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ2Vub21pY3MtaW5mby5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NJbmZvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dlbm9taWNzLW1hdHJpeCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW5vbWljcy1tYXRyaXguY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9nZW5vbWljcy1tYXRyaXguY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzTWF0cml4Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2Vub21pY3MtdHJhY2tzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NUcmFja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZW5vbWljcy1zcGF0aWFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dlbm9taWNzLXNwYXRpYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9nZW5vbWljcy1zcGF0aWFsLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVGhyZWVXaWRnZXRzIGZyb20gJ3RocmVlLWxpYic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dlbm9taWNzLXRocmVlanMnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ2Vub21pY3MtdGhyZWVqcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dlbm9taWNzLXRocmVlanMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcbiAgcHVibGljIHggPSAyMDtcbiAgcHVibGljIHogPSAyMDtcbiAgcHVibGljIHJvdGF0aW9uWCA9IDE7XG4gIHB1YmxpYyByb3RhdGlvblkgPSAyO1xuICBwdWJsaWMgcm90YXRpb25aID0gMztcbiAgcHVibGljIHRyYW5zbGF0aW9uWSA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICAgIC8vIGNvbnNvbGUubG9nKCdUaHJlZVdpZGdldHM6ICcsIFRocmVlV2lkZ2V0cyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgR2Vub21pY3NJbmZvQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1pbmZvL2dlbm9taWNzLWluZm8uY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzTWF0cml4Q29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1tYXRyaXgvZ2Vub21pY3MtbWF0cml4LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtdHJhY2tzL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1zcGF0aWFsL2dlbm9taWNzLXNwYXRpYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtdGhyZWVqcy9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaHJlZUxpYk1vZHVsZSB9IGZyb20gJ3RocmVlLWxpYic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFRocmVlTGliTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR2Vub21pY3NJbmZvQ29tcG9uZW50LFxuICAgIEdlbm9taWNzTWF0cml4Q29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RocmVlanNDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUcmFja3NDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NMaWJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs2QkFKRDtDQUVBOzs7Ozs7QUNGQTtJQVdFO0tBQWlCOzs7O0lBRVYsd0NBQVE7OztJQUFmO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNB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