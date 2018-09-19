(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('three-lib'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('genomics-lib', ['exports', '@angular/core', 'three-lib', '@angular/common'], factory) :
    (factory((global['genomics-lib'] = {}),global.ng.core,null,global.ng.common));
}(this, (function (exports,i0,ThreeWidgets,common) { 'use strict';

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
                    },] },
        ];
        /** @nocollapse */
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
                        selector: 'tk-genomics-info',
                        template: "<section class=\"tk-list\">\n\t<h3>\n\t\tInfo: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
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
                        selector: 'tk-genomics-matrix',
                        template: "<section class=\"tk-list\">\n\t<h3>\n\t\tMatrix: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
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
                        selector: 'tk-genomics-tracks',
                        template: "<section class=\"tk-list\">\n\t<h3>\n\t\tTracks: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
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
                        selector: 'tk-genomics-spatial',
                        template: "<section class=\"tk-list\">\n\t<h3>\n\t\tSpatial: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
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
                console.log('ThreeWidgets: ', ThreeWidgets);
            };
        GenomicsThreejsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'genomics-threejs',
                        template: "<three-test></three-test>\n<!-- <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>\n  <three-webgl-renderer #mainRenderer>\n    <three-perspective-camera [fov]=60 [near]=1 [far]=1100 positionX=20 positionY=50 positionZ=50></three-perspective-camera>\n    <three-scene>\n      <three-axes-helper size=200></three-axes-helper>\n      <three-grid-helper size=100 divisions=10></three-grid-helper>\n      <three-point-light color=\"white\" intensity=\"1\" distance=\"1000\" translateX=50 translateY=50 translateZ=50></three-point-light>\n      <three-object-loader\n        model=\"assets/examples/threejs-test.json\"\n        [translateX]=\"x\"\n        [translateZ]=\"z\"\n        [renderer]=\"mainRenderer\"\n        [rotateX]=\"rotationX\"\n        [rotateY]=\"rotationY\"\n        [rotateZ]=\"rotationZ\"\n        [translateY]=\"translationY\"\n      >\n      </three-object-loader>\n    </three-scene>\n  </three-webgl-renderer>\n</three-orbit-controls> -->\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
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
                        imports: [common.CommonModule, ThreeWidgets.ThreeLibModule],
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
                    },] },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1saWIuc2VydmljZS50cyIsIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1pbmZvL2dlbm9taWNzLWluZm8uY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLW1hdHJpeC9nZW5vbWljcy1tYXRyaXguY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLXRyYWNrcy9nZW5vbWljcy10cmFja3MuY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLXNwYXRpYWwvZ2Vub21pY3Mtc3BhdGlhbC5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3MtdGhyZWVqcy9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudC50cyIsIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NMaWJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RrLWdlbm9taWNzLWluZm8nLFxuICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwidGstbGlzdFwiPlxuXHQ8aDM+XG5cdFx0SW5mbzogPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPnt7ZGF0YS50aXRsZX19PC9uZy1jb250YWluZXI+XG5cdDwvaDM+XG5cdDxkaXYgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj5cblx0XHQ8dGFibGU+XG5cdFx0PHRyPjx0ZD5UaXRsZTwvdGQ+PHRkPnt7ZGF0YS50aXRsZX19PC90ZD48L3RyPlxuXHRcdDx0cj48dGQ+U3RhdGU8L3RkPjx0ZD57e2RhdGEuc3RhdGV9fTwvdGQ+PC90cj5cblx0XHQ8L3RhYmxlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5ObyBJdGVtcyE8L25nLXRlbXBsYXRlPlxuXHQ8L2Rpdj5cbjwvc2VjdGlvbj5cbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5Mb2FkaW5nLi4uPC9uZy10ZW1wbGF0ZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NJbmZvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RrLWdlbm9taWNzLW1hdHJpeCcsXG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJ0ay1saXN0XCI+XG5cdDxoMz5cblx0XHRNYXRyaXg6IDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj57e2RhdGEudGl0bGV9fTwvbmctY29udGFpbmVyPlxuXHQ8L2gzPlxuXHQ8ZGl2ICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+XG5cdFx0PHRhYmxlPlxuXHRcdDx0cj48dGQ+VGl0bGU8L3RkPjx0ZD57e2RhdGEudGl0bGV9fTwvdGQ+PC90cj5cblx0XHQ8dHI+PHRkPlN0YXRlPC90ZD48dGQ+e3tkYXRhLnN0YXRlfX08L3RkPjwvdHI+XG5cdFx0PC90YWJsZT5cblx0XHQ8bmctdGVtcGxhdGUgI25vSXRlbXM+Tm8gSXRlbXMhPC9uZy10ZW1wbGF0ZT5cblx0PC9kaXY+XG48L3NlY3Rpb24+XG48bmctdGVtcGxhdGUgI2xvYWRpbmc+TG9hZGluZy4uLjwvbmctdGVtcGxhdGU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzTWF0cml4Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGstZ2Vub21pY3MtdHJhY2tzJyxcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cInRrLWxpc3RcIj5cblx0PGgzPlxuXHRcdFRyYWNrczogPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPnt7ZGF0YS50aXRsZX19PC9uZy1jb250YWluZXI+XG5cdDwvaDM+XG5cdDxkaXYgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj5cblx0XHQ8dGFibGU+XG5cdFx0PHRyPjx0ZD5UaXRsZTwvdGQ+PHRkPnt7ZGF0YS50aXRsZX19PC90ZD48L3RyPlxuXHRcdDx0cj48dGQ+U3RhdGU8L3RkPjx0ZD57e2RhdGEuc3RhdGV9fTwvdGQ+PC90cj5cblx0XHQ8L3RhYmxlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5ObyBJdGVtcyE8L25nLXRlbXBsYXRlPlxuXHQ8L2Rpdj5cbjwvc2VjdGlvbj5cbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5Mb2FkaW5nLi4uPC9uZy10ZW1wbGF0ZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NUcmFja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ay1nZW5vbWljcy1zcGF0aWFsJyxcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cInRrLWxpc3RcIj5cblx0PGgzPlxuXHRcdFNwYXRpYWw6IDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj57e2RhdGEudGl0bGV9fTwvbmctY29udGFpbmVyPlxuXHQ8L2gzPlxuXHQ8ZGl2ICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+XG5cdFx0PHRhYmxlPlxuXHRcdDx0cj48dGQ+VGl0bGU8L3RkPjx0ZD57e2RhdGEudGl0bGV9fTwvdGQ+PC90cj5cblx0XHQ8dHI+PHRkPlN0YXRlPC90ZD48dGQ+e3tkYXRhLnN0YXRlfX08L3RkPjwvdHI+XG5cdFx0PC90YWJsZT5cblx0XHQ8bmctdGVtcGxhdGUgI25vSXRlbXM+Tm8gSXRlbXMhPC9uZy10ZW1wbGF0ZT5cblx0PC9kaXY+XG48L3NlY3Rpb24+XG48bmctdGVtcGxhdGUgI2xvYWRpbmc+TG9hZGluZy4uLjwvbmctdGVtcGxhdGU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0uc3Vic2NyaWJlKHN0cm0gPT4gdGhpcy5kYXRhID0gc3RybSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUaHJlZVdpZGdldHMgZnJvbSAndGhyZWUtbGliJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2Vub21pY3MtdGhyZWVqcycsXG4gIHRlbXBsYXRlOiBgPHRocmVlLXRlc3Q+PC90aHJlZS10ZXN0PlxuPCEtLSA8dGhyZWUtb3JiaXQtY29udHJvbHMgW3JvdGF0ZVNwZWVkXT0xIFt6b29tU3BlZWRdPTEuMiBbbGlzdGVuaW5nQ29udHJvbEVsZW1lbnRdPW1haW5SZW5kZXJlci5yZW5kZXJQYW5lPlxuICA8dGhyZWUtd2ViZ2wtcmVuZGVyZXIgI21haW5SZW5kZXJlcj5cbiAgICA8dGhyZWUtcGVyc3BlY3RpdmUtY2FtZXJhIFtmb3ZdPTYwIFtuZWFyXT0xIFtmYXJdPTExMDAgcG9zaXRpb25YPTIwIHBvc2l0aW9uWT01MCBwb3NpdGlvblo9NTA+PC90aHJlZS1wZXJzcGVjdGl2ZS1jYW1lcmE+XG4gICAgPHRocmVlLXNjZW5lPlxuICAgICAgPHRocmVlLWF4ZXMtaGVscGVyIHNpemU9MjAwPjwvdGhyZWUtYXhlcy1oZWxwZXI+XG4gICAgICA8dGhyZWUtZ3JpZC1oZWxwZXIgc2l6ZT0xMDAgZGl2aXNpb25zPTEwPjwvdGhyZWUtZ3JpZC1oZWxwZXI+XG4gICAgICA8dGhyZWUtcG9pbnQtbGlnaHQgY29sb3I9XCJ3aGl0ZVwiIGludGVuc2l0eT1cIjFcIiBkaXN0YW5jZT1cIjEwMDBcIiB0cmFuc2xhdGVYPTUwIHRyYW5zbGF0ZVk9NTAgdHJhbnNsYXRlWj01MD48L3RocmVlLXBvaW50LWxpZ2h0PlxuICAgICAgPHRocmVlLW9iamVjdC1sb2FkZXJcbiAgICAgICAgbW9kZWw9XCJhc3NldHMvZXhhbXBsZXMvdGhyZWVqcy10ZXN0Lmpzb25cIlxuICAgICAgICBbdHJhbnNsYXRlWF09XCJ4XCJcbiAgICAgICAgW3RyYW5zbGF0ZVpdPVwielwiXG4gICAgICAgIFtyZW5kZXJlcl09XCJtYWluUmVuZGVyZXJcIlxuICAgICAgICBbcm90YXRlWF09XCJyb3RhdGlvblhcIlxuICAgICAgICBbcm90YXRlWV09XCJyb3RhdGlvbllcIlxuICAgICAgICBbcm90YXRlWl09XCJyb3RhdGlvblpcIlxuICAgICAgICBbdHJhbnNsYXRlWV09XCJ0cmFuc2xhdGlvbllcIlxuICAgICAgPlxuICAgICAgPC90aHJlZS1vYmplY3QtbG9hZGVyPlxuICAgIDwvdGhyZWUtc2NlbmU+XG4gIDwvdGhyZWUtd2ViZ2wtcmVuZGVyZXI+XG48L3RocmVlLW9yYml0LWNvbnRyb2xzPiAtLT5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc1RocmVlanNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG4gIHB1YmxpYyB4ID0gMjA7XG4gIHB1YmxpYyB6ID0gMjA7XG4gIHB1YmxpYyByb3RhdGlvblggPSAxO1xuICBwdWJsaWMgcm90YXRpb25ZID0gMjtcbiAgcHVibGljIHJvdGF0aW9uWiA9IDM7XG4gIHB1YmxpYyB0cmFuc2xhdGlvblkgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgICBjb25zb2xlLmxvZygnVGhyZWVXaWRnZXRzOiAnLCBUaHJlZVdpZGdldHMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEdlbm9taWNzSW5mb0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtaW5mby9nZW5vbWljcy1pbmZvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc01hdHJpeENvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtbWF0cml4L2dlbm9taWNzLW1hdHJpeC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NUcmFja3NDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLXRyYWNrcy9nZW5vbWljcy10cmFja3MuY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3Mtc3BhdGlhbC9nZW5vbWljcy1zcGF0aWFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1RocmVlanNDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLXRocmVlanMvZ2Vub21pY3MtdGhyZWVqcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGhyZWVMaWJNb2R1bGUgfSBmcm9tICd0aHJlZS1saWInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBUaHJlZUxpYk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBHZW5vbWljc0luZm9Db21wb25lbnQsXG4gICAgR2Vub21pY3NNYXRyaXhDb21wb25lbnQsXG4gICAgR2Vub21pY3NUcmFja3NDb21wb25lbnQsXG4gICAgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBHZW5vbWljc0luZm9Db21wb25lbnQsXG4gICAgR2Vub21pY3NNYXRyaXhDb21wb25lbnQsXG4gICAgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzTGliTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb21wb25lbnQiLCJJbnB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiVGhyZWVMaWJNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7O2lDQUpEOzs7Ozs7O0FDQUE7UUF1QkU7U0FBaUI7Ozs7UUFFVix3Q0FBUTs7Ozs7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBQSxDQUFDLENBQUM7OztvQkF4QnZEQyxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsUUFBUSxFQUFFLGtjQVltQzt3QkFDN0MsTUFBTSxFQUFFLENB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