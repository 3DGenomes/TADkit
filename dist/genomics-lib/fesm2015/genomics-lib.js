import { Injectable, NgModule, Component, Input, defineInjectable } from '@angular/core';
import * as ThreeWidgets from 'three-lib';
import { ThreeLibModule } from 'three-lib';
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
class GenomicsThreejsComponent {
    constructor() {
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
    ngOnInit() {
        this.dataStream.subscribe(strm => this.data = strm);
        console.log('ThreeWidgets: ', ThreeWidgets);
    }
}
GenomicsThreejsComponent.decorators = [
    { type: Component, args: [{
                selector: 'genomics-threejs',
                template: `<three-test></three-test>
<!-- <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>
  <three-webgl-renderer #mainRenderer>
    <three-perspective-camera [fov]=60 [near]=1 [far]=1100 positionX=20 positionY=50 positionZ=50></three-perspective-camera>
    <three-scene>
      <three-axes-helper size=200></three-axes-helper>
      <three-grid-helper size=100 divisions=10></three-grid-helper>
      <three-point-light color="white" intensity="1" distance="1000" translateX=50 translateY=50 translateZ=50></three-point-light>
      <three-object-loader
        model="assets/examples/threejs-test.json"
        [translateX]="x"
        [translateZ]="z"
        [renderer]="mainRenderer"
        [rotateX]="rotationX"
        [rotateY]="rotationY"
        [rotateZ]="rotationZ"
        [translateY]="translationY"
      >
      </three-object-loader>
    </three-scene>
  </three-webgl-renderer>
</three-orbit-controls> -->
`,
                styles: [``]
            },] },
];
/** @nocollapse */
GenomicsThreejsComponent.ctorParameters = () => [];
GenomicsThreejsComponent.propDecorators = {
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

export { GenomicsLibService, GenomicsLibModule, GenomicsSpatialComponent, GenomicsThreejsComponent, GenomicsMatrixComponent, GenomicsInfoComponent, GenomicsTracksComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbGliLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLWluZm8vZ2Vub21pY3MtaW5mby5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3MtbWF0cml4L2dlbm9taWNzLW1hdHJpeC5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3MtdHJhY2tzL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQudHMiLCJuZzovL2dlbm9taWNzLWxpYi9saWIvZ2Vub21pY3Mtc3BhdGlhbC9nZW5vbWljcy1zcGF0aWFsLmNvbXBvbmVudC50cyIsIm5nOi8vZ2Vub21pY3MtbGliL2xpYi9nZW5vbWljcy10aHJlZWpzL2dlbm9taWNzLXRocmVlanMuY29tcG9uZW50LnRzIiwibmc6Ly9nZW5vbWljcy1saWIvbGliL2dlbm9taWNzLWxpYi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc0xpYlNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGstZ2Vub21pY3MtaW5mbycsXG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJ0ay1saXN0XCI+XG5cdDxoMz5cblx0XHRJbmZvOiA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+e3tkYXRhLnRpdGxlfX08L25nLWNvbnRhaW5lcj5cblx0PC9oMz5cblx0PGRpdiAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPlxuXHRcdDx0YWJsZT5cblx0XHQ8dHI+PHRkPlRpdGxlPC90ZD48dGQ+e3tkYXRhLnRpdGxlfX08L3RkPjwvdHI+XG5cdFx0PHRyPjx0ZD5TdGF0ZTwvdGQ+PHRkPnt7ZGF0YS5zdGF0ZX19PC90ZD48L3RyPlxuXHRcdDwvdGFibGU+XG5cdFx0PG5nLXRlbXBsYXRlICNub0l0ZW1zPk5vIEl0ZW1zITwvbmctdGVtcGxhdGU+XG5cdDwvZGl2PlxuPC9zZWN0aW9uPlxuPG5nLXRlbXBsYXRlICNsb2FkaW5nPkxvYWRpbmcuLi48L25nLXRlbXBsYXRlPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc0luZm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGstZ2Vub21pY3MtbWF0cml4JyxcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cInRrLWxpc3RcIj5cblx0PGgzPlxuXHRcdE1hdHJpeDogPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPnt7ZGF0YS50aXRsZX19PC9uZy1jb250YWluZXI+XG5cdDwvaDM+XG5cdDxkaXYgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj5cblx0XHQ8dGFibGU+XG5cdFx0PHRyPjx0ZD5UaXRsZTwvdGQ+PHRkPnt7ZGF0YS50aXRsZX19PC90ZD48L3RyPlxuXHRcdDx0cj48dGQ+U3RhdGU8L3RkPjx0ZD57e2RhdGEuc3RhdGV9fTwvdGQ+PC90cj5cblx0XHQ8L3RhYmxlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5ObyBJdGVtcyE8L25nLXRlbXBsYXRlPlxuXHQ8L2Rpdj5cbjwvc2VjdGlvbj5cbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5Mb2FkaW5nLi4uPC9uZy10ZW1wbGF0ZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NNYXRyaXhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ay1nZW5vbWljcy10cmFja3MnLFxuICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwidGstbGlzdFwiPlxuXHQ8aDM+XG5cdFx0VHJhY2tzOiA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+e3tkYXRhLnRpdGxlfX08L25nLWNvbnRhaW5lcj5cblx0PC9oMz5cblx0PGRpdiAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPlxuXHRcdDx0YWJsZT5cblx0XHQ8dHI+PHRkPlRpdGxlPC90ZD48dGQ+e3tkYXRhLnRpdGxlfX08L3RkPjwvdHI+XG5cdFx0PHRyPjx0ZD5TdGF0ZTwvdGQ+PHRkPnt7ZGF0YS5zdGF0ZX19PC90ZD48L3RyPlxuXHRcdDwvdGFibGU+XG5cdFx0PG5nLXRlbXBsYXRlICNub0l0ZW1zPk5vIEl0ZW1zITwvbmctdGVtcGxhdGU+XG5cdDwvZGl2PlxuPC9zZWN0aW9uPlxuPG5nLXRlbXBsYXRlICNsb2FkaW5nPkxvYWRpbmcuLi48L25nLXRlbXBsYXRlPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0uc3Vic2NyaWJlKHN0cm0gPT4gdGhpcy5kYXRhID0gc3RybSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RrLWdlbm9taWNzLXNwYXRpYWwnLFxuICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwidGstbGlzdFwiPlxuXHQ8aDM+XG5cdFx0U3BhdGlhbDogPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPnt7ZGF0YS50aXRsZX19PC9uZy1jb250YWluZXI+XG5cdDwvaDM+XG5cdDxkaXYgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj5cblx0XHQ8dGFibGU+XG5cdFx0PHRyPjx0ZD5UaXRsZTwvdGQ+PHRkPnt7ZGF0YS50aXRsZX19PC90ZD48L3RyPlxuXHRcdDx0cj48dGQ+U3RhdGU8L3RkPjx0ZD57e2RhdGEuc3RhdGV9fTwvdGQ+PC90cj5cblx0XHQ8L3RhYmxlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5ObyBJdGVtcyE8L25nLXRlbXBsYXRlPlxuXHQ8L2Rpdj5cbjwvc2VjdGlvbj5cbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5Mb2FkaW5nLi4uPC9uZy10ZW1wbGF0ZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRocmVlV2lkZ2V0cyBmcm9tICd0aHJlZS1saWInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZW5vbWljcy10aHJlZWpzJyxcbiAgdGVtcGxhdGU6IGA8dGhyZWUtdGVzdD48L3RocmVlLXRlc3Q+XG48IS0tIDx0aHJlZS1vcmJpdC1jb250cm9scyBbcm90YXRlU3BlZWRdPTEgW3pvb21TcGVlZF09MS4yIFtsaXN0ZW5pbmdDb250cm9sRWxlbWVudF09bWFpblJlbmRlcmVyLnJlbmRlclBhbmU+XG4gIDx0aHJlZS13ZWJnbC1yZW5kZXJlciAjbWFpblJlbmRlcmVyPlxuICAgIDx0aHJlZS1wZXJzcGVjdGl2ZS1jYW1lcmEgW2Zvdl09NjAgW25lYXJdPTEgW2Zhcl09MTEwMCBwb3NpdGlvblg9MjAgcG9zaXRpb25ZPTUwIHBvc2l0aW9uWj01MD48L3RocmVlLXBlcnNwZWN0aXZlLWNhbWVyYT5cbiAgICA8dGhyZWUtc2NlbmU+XG4gICAgICA8dGhyZWUtYXhlcy1oZWxwZXIgc2l6ZT0yMDA+PC90aHJlZS1heGVzLWhlbHBlcj5cbiAgICAgIDx0aHJlZS1ncmlkLWhlbHBlciBzaXplPTEwMCBkaXZpc2lvbnM9MTA+PC90aHJlZS1ncmlkLWhlbHBlcj5cbiAgICAgIDx0aHJlZS1wb2ludC1saWdodCBjb2xvcj1cIndoaXRlXCIgaW50ZW5zaXR5PVwiMVwiIGRpc3RhbmNlPVwiMTAwMFwiIHRyYW5zbGF0ZVg9NTAgdHJhbnNsYXRlWT01MCB0cmFuc2xhdGVaPTUwPjwvdGhyZWUtcG9pbnQtbGlnaHQ+XG4gICAgICA8dGhyZWUtb2JqZWN0LWxvYWRlclxuICAgICAgICBtb2RlbD1cImFzc2V0cy9leGFtcGxlcy90aHJlZWpzLXRlc3QuanNvblwiXG4gICAgICAgIFt0cmFuc2xhdGVYXT1cInhcIlxuICAgICAgICBbdHJhbnNsYXRlWl09XCJ6XCJcbiAgICAgICAgW3JlbmRlcmVyXT1cIm1haW5SZW5kZXJlclwiXG4gICAgICAgIFtyb3RhdGVYXT1cInJvdGF0aW9uWFwiXG4gICAgICAgIFtyb3RhdGVZXT1cInJvdGF0aW9uWVwiXG4gICAgICAgIFtyb3RhdGVaXT1cInJvdGF0aW9uWlwiXG4gICAgICAgIFt0cmFuc2xhdGVZXT1cInRyYW5zbGF0aW9uWVwiXG4gICAgICA+XG4gICAgICA8L3RocmVlLW9iamVjdC1sb2FkZXI+XG4gICAgPC90aHJlZS1zY2VuZT5cbiAgPC90aHJlZS13ZWJnbC1yZW5kZXJlcj5cbjwvdGhyZWUtb3JiaXQtY29udHJvbHM+IC0tPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcbiAgcHVibGljIHggPSAyMDtcbiAgcHVibGljIHogPSAyMDtcbiAgcHVibGljIHJvdGF0aW9uWCA9IDE7XG4gIHB1YmxpYyByb3RhdGlvblkgPSAyO1xuICBwdWJsaWMgcm90YXRpb25aID0gMztcbiAgcHVibGljIHRyYW5zbGF0aW9uWSA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICAgIGNvbnNvbGUubG9nKCdUaHJlZVdpZGdldHM6ICcsIFRocmVlV2lkZ2V0cyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgR2Vub21pY3NJbmZvQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1pbmZvL2dlbm9taWNzLWluZm8uY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzTWF0cml4Q29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1tYXRyaXgvZ2Vub21pY3MtbWF0cml4LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtdHJhY2tzL2dlbm9taWNzLXRyYWNrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vub21pY3NTcGF0aWFsQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5vbWljcy1zcGF0aWFsL2dlbm9taWNzLXNwYXRpYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEdlbm9taWNzVGhyZWVqc0NvbXBvbmVudCB9IGZyb20gJy4vZ2Vub21pY3MtdGhyZWVqcy9nZW5vbWljcy10aHJlZWpzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaHJlZUxpYk1vZHVsZSB9IGZyb20gJ3RocmVlLWxpYic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFRocmVlTGliTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR2Vub21pY3NJbmZvQ29tcG9uZW50LFxuICAgIEdlbm9taWNzTWF0cml4Q29tcG9uZW50LFxuICAgIEdlbm9taWNzVHJhY2tzQ29tcG9uZW50LFxuICAgIEdlbm9taWNzU3BhdGlhbENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RocmVlanNDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEdlbm9taWNzSW5mb0NvbXBvbmVudCxcbiAgICBHZW5vbWljc01hdHJpeENvbXBvbmVudCxcbiAgICBHZW5vbWljc1NwYXRpYWxDb21wb25lbnQsXG4gICAgR2Vub21pY3NUcmFja3NDb21wb25lbnQsXG4gICAgR2Vub21pY3NUaHJlZWpzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NMaWJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7SUFPRSxpQkFBaUI7OztZQUxsQixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7Ozs7QUNKRDtJQXVCRSxpQkFBaUI7Ozs7SUFFVixRQUFRO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7Ozs7WUF4QnZELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OzsrQ0FZbUM7Z0JBQzdDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7Ozt5QkFFRSxLQUFLOzs7Ozs7O0FDcEJSO0lBdUJFLGlCQUFpQjs7OztJQUVWLFFBQVE7UUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQzs7OztZQXhCdkQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OytDQVltQztnQkFDN0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7Ozs7O3lCQUVFLEtBQUs7Ozs7Ozs7QUNwQlI7SUF1QkUsaUJBQWlCOzs7O0lBRVYsUUFBUTtRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDOzs7O1lBeEJ2RCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7K0NBWW1DO2dCQUM3QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7Ozs7eUJBRUUsS0FBSzs7Ozs7OztBQ3BCUjtJQXVCRSxpQkFBaUI7Ozs7SUFFVixRQUFRO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7Ozs7WUF4QnZELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OzsrQ0FZbUM7Z0JBQzdDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7Ozt5QkFFRSxLQUFLOzs7Ozs7O0FDcEJSO0lBd0NFO2lCQVBXLEVBQUU7aUJBQ0YsRUFBRTt5QkFDTSxDQUFDO3lCQUNELENBQUM7eUJBQ0QsQ0FBQzs0QkFDRSxDQUFDO0tBRU47Ozs7SUFFVixRQUFRO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsQ0FBQzs7OztZQXpDL0MsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNCWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7Ozs7eUJBRUUsS0FBSzs7Ozs7OztBQy9CUjs7O1lBU0MsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUM7Z0JBQ3ZDLFlBQVksRUFBRTtvQkFDWixxQkFBcUI7b0JBQ3JCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLHdCQUF3QjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHFCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsd0JBQXdCO2lCQUN6QjtnQkFDRCxTQUFTLEVBQUUsRUFBRTtnQkFDYixlQUFlLEVBQUU7b0JBQ2YscUJBQXFCO29CQUNyQix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2Qix3QkFBd0I7aUJBQ3pCO2FBQ0Y7Ozs7Ozs7Ozs7Ozs7OzsifQ==