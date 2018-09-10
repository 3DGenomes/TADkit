/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class GenomicsTracksComponent {
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
if (false) {
    /** @type {?} */
    GenomicsTracksComponent.prototype.dataStream;
    /** @type {?} */
    GenomicsTracksComponent.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtdHJhY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlbm9taWNzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9nZW5vbWljcy10cmFja3MvZ2Vub21pY3MtdHJhY2tzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFtQnpELE1BQU07SUFJSixpQkFBaUI7Ozs7SUFFVixRQUFRO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDOzs7O1lBeEJ2RCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7K0NBWW1DO2dCQUM3QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7Ozs7eUJBRUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ay1nZW5vbWljcy10cmFja3MnLFxuICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwidGstbGlzdFwiPlxuXHQ8aDM+XG5cdFx0VHJhY2tzOiA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+e3tkYXRhLnRpdGxlfX08L25nLWNvbnRhaW5lcj5cblx0PC9oMz5cblx0PGRpdiAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPlxuXHRcdDx0YWJsZT5cblx0XHQ8dHI+PHRkPlRpdGxlPC90ZD48dGQ+e3tkYXRhLnRpdGxlfX08L3RkPjwvdHI+XG5cdFx0PHRyPjx0ZD5TdGF0ZTwvdGQ+PHRkPnt7ZGF0YS5zdGF0ZX19PC90ZD48L3RyPlxuXHRcdDwvdGFibGU+XG5cdFx0PG5nLXRlbXBsYXRlICNub0l0ZW1zPk5vIEl0ZW1zITwvbmctdGVtcGxhdGU+XG5cdDwvZGl2PlxuPC9zZWN0aW9uPlxuPG5nLXRlbXBsYXRlICNsb2FkaW5nPkxvYWRpbmcuLi48L25nLXRlbXBsYXRlPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc1RyYWNrc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0uc3Vic2NyaWJlKHN0cm0gPT4gdGhpcy5kYXRhID0gc3RybSk7XG4gIH1cblxufVxuIl19