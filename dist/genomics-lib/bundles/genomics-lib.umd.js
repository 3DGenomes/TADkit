(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('three-lib')) :
    typeof define === 'function' && define.amd ? define('genomics-lib', ['exports', '@angular/core', '@angular/common', 'three-lib'], factory) :
    (factory((global['genomics-lib'] = {}),global.ng.core,global.ng.common,global.threeLib));
}(this, (function (exports,i0,common,threeLib) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GenomicsLibService = /** @class */ (function () {
        function GenomicsLibService() {
        }
        GenomicsLibService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        GenomicsLibService.ctorParameters = function () { return []; };
        /** @nocollapse */ GenomicsLibService.ngInjectableDef = i0.defineInjectable({ factory: function GenomicsLibService_Factory() { return new GenomicsLibService(); }, token: GenomicsLibService, providedIn: "root" });
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
            { type: i0.Component, args: [{
                        selector: 'genomics-info',
                        template: "<section class=\"tk-list\">\n\t<h3>\n\t\tInfo: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                        styles: [""]
                    }] }
        ];
        GenomicsInfoComponent.ctorParameters = function () { return []; };
        GenomicsInfoComponent.propDecorators = {
            dataStream: [{ type: i0.Input }]
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
            { type: i0.Component, args: [{
                        selector: 'genomics-matrix',
                        template: "<section class=\"tk-list\">\n\t<h3>\n\t\tMatrix: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                        styles: [""]
                    }] }
        ];
        GenomicsMatrixComponent.ctorParameters = function () { return []; };
        GenomicsMatrixComponent.propDecorators = {
            dataStream: [{ type: i0.Input }]
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
            { type: i0.Component, args: [{
                        selector: 'genomics-tracks',
                        template: "<section class=\"tk-list\">\n\t<h3>\n\t\tTracks: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                        styles: [""]
                    }] }
        ];
        GenomicsTracksComponent.ctorParameters = function () { return []; };
        GenomicsTracksComponent.propDecorators = {
            dataStream: [{ type: i0.Input }]
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
            { type: i0.Component, args: [{
                        selector: 'genomics-spatial',
                        template: "<section class=\"tk-list\">\n\t<h3>\n\t\tSpatial: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                        styles: [""]
                    }] }
        ];
        GenomicsSpatialComponent.ctorParameters = function () { return []; };
        GenomicsSpatialComponent.propDecorators = {
            dataStream: [{ type: i0.Input }]
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
            { type: i0.Component, args: [{
                        selector: 'genomics-threejs',
                        template: "<three-test></three-test>\n<!-- <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>\n  <three-webgl-renderer #mainRenderer>\n    <three-perspective-camera [fov]=60 [near]=1 [far]=1100 positionX=20 positionY=50 positionZ=50></three-perspective-camera>\n    <three-scene>\n      <three-axes-helper size=200></three-axes-helper>\n      <three-grid-helper size=100 divisions=10></three-grid-helper>\n      <three-point-light color=\"white\" intensity=\"1\" distance=\"1000\" translateX=50 translateY=50 translateZ=50></three-point-light>\n      <three-object-loader\n        model=\"assets/examples/threejs-test.json\"\n        [translateX]=\"x\"\n        [translateZ]=\"z\"\n        [renderer]=\"mainRenderer\"\n        [rotateX]=\"rotationX\"\n        [rotateY]=\"rotationY\"\n        [rotateZ]=\"rotationZ\"\n        [translateY]=\"translationY\"\n      >\n      </three-object-loader>\n    </three-scene>\n  </three-webgl-renderer>\n</three-orbit-controls> -->\n",
                        styles: [""]
                    }] }
        ];
        GenomicsThreejsComponent.ctorParameters = function () { return []; };
        GenomicsThreejsComponent.propDecorators = {
            dataStream: [{ type: i0.Input }]
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
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule, threeLib.ThreeLibModule],
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

    exports.GenomicsLibService = GenomicsLibService;
    exports.GenomicsLibModule = GenomicsLibModule;
    exports.GenomicsSpatialComponent = GenomicsSpatialComponent;
    exports.GenomicsThreejsComponent = GenomicsThreejsComponent;
    exports.GenomicsMatrixComponent = GenomicsMatrixComponent;
    exports.GenomicsInfoComponent = GenomicsInfoComponent;
    exports.GenomicsTracksComponent = GenomicsTracksComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1saWIuc2VydmljZS50cyIsIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1pbmZvL2dlbm9taWNzLWluZm8uY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLW1hdHJpeC9nZW5vbWljcy1tYXRyaXguY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLXRyYWNrcy9nZW5vbWljcy10cmFja3MuY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLXNwYXRpYWwvZ2Vub21pY3Mtc3BhdGlhbC5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3MtdGhyZWVqcy9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudC50cyIsIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NMaWJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dlbm9taWNzLWluZm8nLFxuICB0ZW1wbGF0ZVVybDogJy4vZ2Vub21pY3MtaW5mby5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dlbm9taWNzLWluZm8uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzSW5mb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0uc3Vic2NyaWJlKHN0cm0gPT4gdGhpcy5kYXRhID0gc3RybSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZW5vbWljcy1tYXRyaXgnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ2Vub21pY3MtbWF0cml4LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ2Vub21pY3MtbWF0cml4LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc01hdHJpeENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0uc3Vic2NyaWJlKHN0cm0gPT4gdGhpcy5kYXRhID0gc3RybSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dlbm9taWNzLXRyYWNrcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW5vbWljcy10cmFja3MuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9nZW5vbWljcy10cmFja3MuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2Vub21pY3Mtc3BhdGlhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW5vbWljcy1zcGF0aWFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ2Vub21pY3Mtc3BhdGlhbC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRocmVlV2lkZ2V0cyBmcm9tICd0aHJlZS1saWInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZW5vbWljcy10aHJlZWpzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dlbm9taWNzLXRocmVlanMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc1RocmVlanNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG4gIHB1YmxpYyB4ID0gMjA7XG4gIHB1YmxpYyB6ID0gMjA7XG4gIHB1YmxpYyByb3RhdGlvblggPSAxO1xuICBwdWJsaWMgcm90YXRpb25ZID0gMjtcbiAgcHVibGljIHJvdGF0aW9uWiA9IDM7XG4gIHB1YmxpYyB0cmFuc2xhdGlvblkgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgICAvLyBjb25zb2xlLmxvZygnVGhyZWVXaWRnZXRzOiAnLCBUaHJlZVdpZGdldHMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEdlbm9taWNzSW5mb0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtaW5mby9nZW5vbWljcy1pbmZvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc01hdHJpeENvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtbWF0cml4L2dlbm9taWNzLW1hdHJpeC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NUcmFja3NDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLXRyYWNrcy9nZW5vbWljcy10cmFja3MuY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3Mtc3BhdGlhbC9nZW5vbWljcy1zcGF0aWFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1RocmVlanNDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLXRocmVlanMvZ2Vub21pY3MtdGhyZWVqcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGhyZWVMaWJNb2R1bGUgfSBmcm9tICd0aHJlZS1saWInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBUaHJlZUxpYk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBHZW5vbWljc0luZm9Db21wb25lbnQsXG4gICAgR2Vub21pY3NNYXRyaXhDb21wb25lbnQsXG4gICAgR2Vub21pY3NUcmFja3NDb21wb25lbnQsXG4gICAgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBHZW5vbWljc0luZm9Db21wb25lbnQsXG4gICAgR2Vub21pY3NNYXRyaXhDb21wb25lbnQsXG4gICAgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzTGliTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb21wb25lbnQiLCJJbnB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiVGhyZWVMaWJNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7aUNBSkQ7S0FF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