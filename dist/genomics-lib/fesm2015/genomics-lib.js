import { Injectable, NgModule, Component, Input, defineInjectable } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GenomicsLibService {
    constructor() { }
}
GenomicsLibService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
GenomicsLibService.ctorParameters = () => [];
/** @nocollapse */ GenomicsLibService.ngInjectableDef = defineInjectable({ factory: function GenomicsLibService_Factory() { return new GenomicsLibService(); }, token: GenomicsLibService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GenomicsInfoComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dataStream.subscribe(strm => this.data = strm);
    }
}
GenomicsInfoComponent.decorators = [
    { type: Component, args: [{
                selector: 'tk-genomics-info',
                template: `<section class="tk-list">
	<h3>
		Info: <ng-container *ngIf="data | async as data else loading">{{data.title}}</ng-container>
	</h3>
	<div *ngIf="data | async as data else loading">
		<table>
		<tr><td>Title</td><td>{{data.title}}</td></tr>
		<tr><td>State</td><td>{{data.state}}</td></tr>
		</table>
		<ng-template #noItems>No Items!</ng-template>
	</div>
</section>
<ng-template #loading>Loading...</ng-template>`,
                styles: [``]
            },] },
];
/** @nocollapse */
GenomicsInfoComponent.ctorParameters = () => [];
GenomicsInfoComponent.propDecorators = {
    dataStream: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GenomicsMatrixComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dataStream.subscribe(strm => this.data = strm);
    }
}
GenomicsMatrixComponent.decorators = [
    { type: Component, args: [{
                selector: 'tk-genomics-matrix',
                template: `<section class="tk-list">
	<h3>
		Matrix: <ng-container *ngIf="data | async as data else loading">{{data.title}}</ng-container>
	</h3>
	<div *ngIf="data | async as data else loading">
		<table>
		<tr><td>Title</td><td>{{data.title}}</td></tr>
		<tr><td>State</td><td>{{data.state}}</td></tr>
		</table>
		<ng-template #noItems>No Items!</ng-template>
	</div>
</section>
<ng-template #loading>Loading...</ng-template>`,
                styles: [``]
            },] },
];
/** @nocollapse */
GenomicsMatrixComponent.ctorParameters = () => [];
GenomicsMatrixComponent.propDecorators = {
    dataStream: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GenomicsTracksComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dataStream.subscribe(strm => this.data = strm);
    }
}
GenomicsTracksComponent.decorators = [
    { type: Component, args: [{
                selector: 'tk-genomics-tracks',
                template: `<section class="tk-list">
	<h3>
		Tracks: <ng-container *ngIf="data | async as data else loading">{{data.title}}</ng-container>
	</h3>
	<div *ngIf="data | async as data else loading">
		<table>
		<tr><td>Title</td><td>{{data.title}}</td></tr>
		<tr><td>State</td><td>{{data.state}}</td></tr>
		</table>
		<ng-template #noItems>No Items!</ng-template>
	</div>
</section>
<ng-template #loading>Loading...</ng-template>`,
                styles: [``]
            },] },
];
/** @nocollapse */
GenomicsTracksComponent.ctorParameters = () => [];
GenomicsTracksComponent.propDecorators = {
    dataStream: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GenomicsSpatialComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dataStream.subscribe(strm => this.data = strm);
    }
}
GenomicsSpatialComponent.decorators = [
    { type: Component, args: [{
                selector: 'tk-genomics-spatial',
                template: `<section class="tk-list">
	<h3>
		Spatial: <ng-container *ngIf="data | async as data else loading">{{data.title}}</ng-container>
	</h3>
	<div *ngIf="data | async as data else loading">
		<table>
		<tr><td>Title</td><td>{{data.title}}</td></tr>
		<tr><td>State</td><td>{{data.state}}</td></tr>
		</table>
		<ng-template #noItems>No Items!</ng-template>
	</div>
</section>
<ng-template #loading>Loading...</ng-template>`,
                styles: [``]
            },] },
];
/** @nocollapse */
GenomicsSpatialComponent.ctorParameters = () => [];
GenomicsSpatialComponent.propDecorators = {
    dataStream: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GenomicsLibModule {
}
GenomicsLibModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { GenomicsLibService, GenomicsLibModule, GenomicsSpatialComponent, GenomicsMatrixComponent, GenomicsInfoComponent, GenomicsTracksComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLWluZm8vZ2Vub21pY3MtaW5mby5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3MtbWF0cml4L2dlbm9taWNzLW1hdHJpeC5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3MtdHJhY2tzL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3Mtc3BhdGlhbC9nZW5vbWljcy1zcGF0aWFsLmNvbXBvbmVudC50cyIsIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NMaWJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RrLWdlbm9taWNzLWluZm8nLFxuICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwidGstbGlzdFwiPlxuXHQ8aDM+XG5cdFx0SW5mbzogPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPnt7ZGF0YS50aXRsZX19PC9uZy1jb250YWluZXI+XG5cdDwvaDM+XG5cdDxkaXYgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj5cblx0XHQ8dGFibGU+XG5cdFx0PHRyPjx0ZD5UaXRsZTwvdGQ+PHRkPnt7ZGF0YS50aXRsZX19PC90ZD48L3RyPlxuXHRcdDx0cj48dGQ+U3RhdGU8L3RkPjx0ZD57e2RhdGEuc3RhdGV9fTwvdGQ+PC90cj5cblx0XHQ8L3RhYmxlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5ObyBJdGVtcyE8L25nLXRlbXBsYXRlPlxuXHQ8L2Rpdj5cbjwvc2VjdGlvbj5cbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5Mb2FkaW5nLi4uPC9uZy10ZW1wbGF0ZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NJbmZvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RrLWdlbm9taWNzLW1hdHJpeCcsXG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJ0ay1saXN0XCI+XG5cdDxoMz5cblx0XHRNYXRyaXg6IDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj57e2RhdGEudGl0bGV9fTwvbmctY29udGFpbmVyPlxuXHQ8L2gzPlxuXHQ8ZGl2ICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+XG5cdFx0PHRhYmxlPlxuXHRcdDx0cj48dGQ+VGl0bGU8L3RkPjx0ZD57e2RhdGEudGl0bGV9fTwvdGQ+PC90cj5cblx0XHQ8dHI+PHRkPlN0YXRlPC90ZD48dGQ+e3tkYXRhLnN0YXRlfX08L3RkPjwvdHI+XG5cdFx0PC90YWJsZT5cblx0XHQ8bmctdGVtcGxhdGUgI25vSXRlbXM+Tm8gSXRlbXMhPC9uZy10ZW1wbGF0ZT5cblx0PC9kaXY+XG48L3NlY3Rpb24+XG48bmctdGVtcGxhdGUgI2xvYWRpbmc+TG9hZGluZy4uLjwvbmctdGVtcGxhdGU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzTWF0cml4Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGstZ2Vub21pY3MtdHJhY2tzJyxcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cInRrLWxpc3RcIj5cblx0PGgzPlxuXHRcdFRyYWNrczogPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPnt7ZGF0YS50aXRsZX19PC9uZy1jb250YWluZXI+XG5cdDwvaDM+XG5cdDxkaXYgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj5cblx0XHQ8dGFibGU+XG5cdFx0PHRyPjx0ZD5UaXRsZTwvdGQ+PHRkPnt7ZGF0YS50aXRsZX19PC90ZD48L3RyPlxuXHRcdDx0cj48dGQ+U3RhdGU8L3RkPjx0ZD57e2RhdGEuc3RhdGV9fTwvdGQ+PC90cj5cblx0XHQ8L3RhYmxlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5ObyBJdGVtcyE8L25nLXRlbXBsYXRlPlxuXHQ8L2Rpdj5cbjwvc2VjdGlvbj5cbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5Mb2FkaW5nLi4uPC9uZy10ZW1wbGF0ZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NUcmFja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ay1nZW5vbWljcy1zcGF0aWFsJyxcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cInRrLWxpc3RcIj5cblx0PGgzPlxuXHRcdFNwYXRpYWw6IDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj57e2RhdGEudGl0bGV9fTwvbmctY29udGFpbmVyPlxuXHQ8L2gzPlxuXHQ8ZGl2ICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+XG5cdFx0PHRhYmxlPlxuXHRcdDx0cj48dGQ+VGl0bGU8L3RkPjx0ZD57e2RhdGEudGl0bGV9fTwvdGQ+PC90cj5cblx0XHQ8dHI+PHRkPlN0YXRlPC90ZD48dGQ+e3tkYXRhLnN0YXRlfX08L3RkPjwvdHI+XG5cdFx0PC90YWJsZT5cblx0XHQ8bmctdGVtcGxhdGUgI25vSXRlbXM+Tm8gSXRlbXMhPC9uZy10ZW1wbGF0ZT5cblx0PC9kaXY+XG48L3NlY3Rpb24+XG48bmctdGVtcGxhdGUgI2xvYWRpbmc+TG9hZGluZy4uLjwvbmctdGVtcGxhdGU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0uc3Vic2NyaWJlKHN0cm0gPT4gdGhpcy5kYXRhID0gc3RybSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBHZW5vbWljc0luZm9Db21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLWluZm8vZ2Vub21pY3MtaW5mby5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NNYXRyaXhDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLW1hdHJpeC9nZW5vbWljcy1tYXRyaXguY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzVHJhY2tzQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy10cmFja3MvZ2Vub21pY3MtdHJhY2tzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQgfSBmcm9tICcuL2dlbm9taWNzLXNwYXRpYWwvZ2Vub21pY3Mtc3BhdGlhbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR2Vub21pY3NJbmZvQ29tcG9uZW50LFxuICAgIEdlbm9taWNzTWF0cml4Q29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgR2Vub21pY3NJbmZvQ29tcG9uZW50LFxuICAgIEdlbm9taWNzTWF0cml4Q29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBHZW5vbWljc0luZm9Db21wb25lbnQsXG4gICAgR2Vub21pY3NNYXRyaXhDb21wb25lbnQsXG4gICAgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NMaWJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0lBT0UsaUJBQWlCOzs7WUFMbEIsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7O0FDSkQ7SUF1QkUsaUJBQWlCOzs7O0lBRVYsUUFBUTtRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDOzs7O1lBeEJ2RCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7K0NBWW1DO2dCQUM3QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7Ozs7eUJBRUUsS0FBSzs7Ozs7OztBQ3BCUjtJQXVCRSxpQkFBaUI7Ozs7SUFFVixRQUFRO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7Ozs7WUF4QnZELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OzsrQ0FZbUM7Z0JBQzdDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7Ozt5QkFFRSxLQUFLOzs7Ozs7O0FDcEJSO0lBdUJFLGlCQUFpQjs7OztJQUVWLFFBQVE7UUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQzs7OztZQXhCdkQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OytDQVltQztnQkFDN0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7Ozs7O3lCQUVFLEtBQUs7Ozs7Ozs7QUNwQlI7SUF1QkUsaUJBQWlCOzs7O0lBRVYsUUFBUTtRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDOzs7O1lBeEJ2RCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7K0NBWW1DO2dCQUM3QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7Ozs7eUJBRUUsS0FBSzs7Ozs7OztBQ3BCUjs7O1lBT0MsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFO29CQUNaLHFCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHFCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtpQkFDekI7Z0JBQ0QsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsZUFBZSxFQUFFO29CQUNmLHFCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLHVCQUF1QjtpQkFDeEI7YUFDRjs7Ozs7Ozs7Ozs7Ozs7OyJ9