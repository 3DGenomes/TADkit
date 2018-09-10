(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('genomics-lib', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['genomics-lib'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,i0,common) { 'use strict';

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
    var GenomicsLibModule = /** @class */ (function () {
        function GenomicsLibModule() {
        }
        GenomicsLibModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [
                            GenomicsInfoComponent,
                            GenomicsMatrixComponent,
                            GenomicsTracksComponent,
                            GenomicsSpatialComponent
                        ],
                        exports: [
                            GenomicsInfoComponent,
                            GenomicsMatrixComponent,
                            GenomicsTracksComponent,
                            GenomicsSpatialComponent
                        ],
                        providers: [],
                        entryComponents: [
                            GenomicsInfoComponent,
                            GenomicsMatrixComponent,
                            GenomicsSpatialComponent,
                            GenomicsTracksComponent
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
    exports.GenomicsMatrixComponent = GenomicsMatrixComponent;
    exports.GenomicsInfoComponent = GenomicsInfoComponent;
    exports.GenomicsTracksComponent = GenomicsTracksComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1saWIuc2VydmljZS50cyIsIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1pbmZvL2dlbm9taWNzLWluZm8uY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLW1hdHJpeC9nZW5vbWljcy1tYXRyaXguY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLXRyYWNrcy9nZW5vbWljcy10cmFja3MuY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLXNwYXRpYWwvZ2Vub21pY3Mtc3BhdGlhbC5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3MtbGliLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzTGliU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ay1nZW5vbWljcy1pbmZvJyxcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cInRrLWxpc3RcIj5cblx0PGgzPlxuXHRcdEluZm86IDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj57e2RhdGEudGl0bGV9fTwvbmctY29udGFpbmVyPlxuXHQ8L2gzPlxuXHQ8ZGl2ICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+XG5cdFx0PHRhYmxlPlxuXHRcdDx0cj48dGQ+VGl0bGU8L3RkPjx0ZD57e2RhdGEudGl0bGV9fTwvdGQ+PC90cj5cblx0XHQ8dHI+PHRkPlN0YXRlPC90ZD48dGQ+e3tkYXRhLnN0YXRlfX08L3RkPjwvdHI+XG5cdFx0PC90YWJsZT5cblx0XHQ8bmctdGVtcGxhdGUgI25vSXRlbXM+Tm8gSXRlbXMhPC9uZy10ZW1wbGF0ZT5cblx0PC9kaXY+XG48L3NlY3Rpb24+XG48bmctdGVtcGxhdGUgI2xvYWRpbmc+TG9hZGluZy4uLjwvbmctdGVtcGxhdGU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzSW5mb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0uc3Vic2NyaWJlKHN0cm0gPT4gdGhpcy5kYXRhID0gc3RybSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ay1nZW5vbWljcy1tYXRyaXgnLFxuICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwidGstbGlzdFwiPlxuXHQ8aDM+XG5cdFx0TWF0cml4OiA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+e3tkYXRhLnRpdGxlfX08L25nLWNvbnRhaW5lcj5cblx0PC9oMz5cblx0PGRpdiAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPlxuXHRcdDx0YWJsZT5cblx0XHQ8dHI+PHRkPlRpdGxlPC90ZD48dGQ+e3tkYXRhLnRpdGxlfX08L3RkPjwvdHI+XG5cdFx0PHRyPjx0ZD5TdGF0ZTwvdGQ+PHRkPnt7ZGF0YS5zdGF0ZX19PC90ZD48L3RyPlxuXHRcdDwvdGFibGU+XG5cdFx0PG5nLXRlbXBsYXRlICNub0l0ZW1zPk5vIEl0ZW1zITwvbmctdGVtcGxhdGU+XG5cdDwvZGl2PlxuPC9zZWN0aW9uPlxuPG5nLXRlbXBsYXRlICNsb2FkaW5nPkxvYWRpbmcuLi48L25nLXRlbXBsYXRlPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc01hdHJpeENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0uc3Vic2NyaWJlKHN0cm0gPT4gdGhpcy5kYXRhID0gc3RybSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RrLWdlbm9taWNzLXRyYWNrcycsXG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJ0ay1saXN0XCI+XG5cdDxoMz5cblx0XHRUcmFja3M6IDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj57e2RhdGEudGl0bGV9fTwvbmctY29udGFpbmVyPlxuXHQ8L2gzPlxuXHQ8ZGl2ICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+XG5cdFx0PHRhYmxlPlxuXHRcdDx0cj48dGQ+VGl0bGU8L3RkPjx0ZD57e2RhdGEudGl0bGV9fTwvdGQ+PC90cj5cblx0XHQ8dHI+PHRkPlN0YXRlPC90ZD48dGQ+e3tkYXRhLnN0YXRlfX08L3RkPjwvdHI+XG5cdFx0PC90YWJsZT5cblx0XHQ8bmctdGVtcGxhdGUgI25vSXRlbXM+Tm8gSXRlbXMhPC9uZy10ZW1wbGF0ZT5cblx0PC9kaXY+XG48L3NlY3Rpb24+XG48bmctdGVtcGxhdGUgI2xvYWRpbmc+TG9hZGluZy4uLjwvbmctdGVtcGxhdGU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGstZ2Vub21pY3Mtc3BhdGlhbCcsXG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJ0ay1saXN0XCI+XG5cdDxoMz5cblx0XHRTcGF0aWFsOiA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+e3tkYXRhLnRpdGxlfX08L25nLWNvbnRhaW5lcj5cblx0PC9oMz5cblx0PGRpdiAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPlxuXHRcdDx0YWJsZT5cblx0XHQ8dHI+PHRkPlRpdGxlPC90ZD48dGQ+e3tkYXRhLnRpdGxlfX08L3RkPjwvdHI+XG5cdFx0PHRyPjx0ZD5TdGF0ZTwvdGQ+PHRkPnt7ZGF0YS5zdGF0ZX19PC90ZD48L3RyPlxuXHRcdDwvdGFibGU+XG5cdFx0PG5nLXRlbXBsYXRlICNub0l0ZW1zPk5vIEl0ZW1zITwvbmctdGVtcGxhdGU+XG5cdDwvZGl2PlxuPC9zZWN0aW9uPlxuPG5nLXRlbXBsYXRlICNsb2FkaW5nPkxvYWRpbmcuLi48L25nLXRlbXBsYXRlPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgR2Vub21pY3NJbmZvQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1pbmZvL2dlbm9taWNzLWluZm8uY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzTWF0cml4Q29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1tYXRyaXgvZ2Vub21pY3MtbWF0cml4LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtdHJhY2tzL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1zcGF0aWFsL2dlbm9taWNzLXNwYXRpYWwuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgR2Vub21pY3NJbmZvQ29tcG9uZW50LFxuICAgIEdlbm9taWNzTWF0cml4Q29tcG9uZW50LFxuICAgIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzTGliTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb21wb25lbnQiLCJJbnB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7OztpQ0FKRDs7Ozs7OztBQ0FBO1FBdUJFO1NBQWlCOzs7O1FBRVYsd0NBQVE7Ozs7O2dCQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUEsQ0FBQyxDQUFDOzs7b0JBeEJ2REMsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxrQkFBa0I7d0JBQzVCLFFBQVEsRUFBRSxrY0FZbUM7d0JBQzdDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztxQkFDYjs7Ozs7aUNBRUVDLFFBQUs7O29DQXBCUjs7Ozs7OztBQ0FBO1FBdUJFO1NBQWlCOzs7O1FBRVYsMENBQVE7Ozs7O2dCQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUEsQ0FBQyxDQUFDOzs7b0JBeEJ2REQsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxvQkFBb0I7d0JBQzlCLFFBQVEsRUFBRSxvY0FZbUM7d0JBQzdDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztxQkFDYjs7Ozs7aUNBRUVDLFFBQUs7O3NDQXBCUjs7Ozs7OztBQ0FBO1FBdUJFO1NBQWlCOzs7O1FBRVYsMENBQVE7Ozs7O2dCQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUEsQ0FBQyxDQUFDOzs7b0JBeEJ2REQsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxvQkFBb0I7d0JBQzlCLFFBQVEsRUFBRSxvY0FZbUM7d0JBQzdDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztxQkFDYjs7Ozs7aUNBRUVDLFFBQUs7O3NDQXBCUjs7Ozs7OztBQ0FBO1FBdUJFO1NBQWlCOzs7O1FBRVYsMkNBQVE7Ozs7O2dCQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUEsQ0FBQyxDQUFDOzs7b0JBeEJ2REQsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxxQkFBcUI7d0JBQy9CLFFBQVEsRUFBRSxxY0FZbUM7d0JBQzdDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztxQkFDYjs7Ozs7aUNBRUVDLFFBQUs7O3VDQXBCUjs7Ozs7OztBQ0FBOzs7O29CQU9DQyxXQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFLENBQUNDLG1CQUFZLENBQUM7d0JBQ3ZCLFlBQVksRUFBRTs0QkFDWixxQkFBcUI7NEJBQ3JCLHVCQUF1Qjs0QkFDdkIsdUJBQXVCOzRCQUN2Qix3QkFBd0I7eUJBQ3pCO3dCQUNELE9BQU8sRUFBRTs0QkFDUCxxQkFBcUI7NEJBQ3JCLHVCQUF1Qjs0QkFDdkIsdUJBQXVCOzRCQUN2Qix3QkFBd0I7eUJBQ3pCO3dCQUNELFNBQVMsRUFBRSxFQUFFO3dCQUNiLGVBQWUsRUFBRTs0QkFDZixxQkFBcUI7NEJBQ3JCLHVCQUF1Qjs0QkFDdkIsd0JBQXdCOzRCQUN4Qix1QkFBdUI7eUJBQ3hCO3FCQUNGOztnQ0E1QkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=