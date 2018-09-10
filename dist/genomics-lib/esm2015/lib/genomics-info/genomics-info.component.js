/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class GenomicsInfoComponent {
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
if (false) {
    /** @type {?} */
    GenomicsInfoComponent.prototype.dataStream;
    /** @type {?} */
    GenomicsInfoComponent.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtaW5mby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW5vbWljcy1saWIvIiwic291cmNlcyI6WyJsaWIvZ2Vub21pY3MtaW5mby9nZW5vbWljcy1pbmZvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFtQnpELE1BQU07SUFJSixpQkFBaUI7Ozs7SUFFVixRQUFRO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDOzs7O1lBeEJ2RCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7K0NBWW1DO2dCQUM3QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7Ozs7eUJBRUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ay1nZW5vbWljcy1pbmZvJyxcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cInRrLWxpc3RcIj5cblx0PGgzPlxuXHRcdEluZm86IDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj57e2RhdGEudGl0bGV9fTwvbmctY29udGFpbmVyPlxuXHQ8L2gzPlxuXHQ8ZGl2ICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+XG5cdFx0PHRhYmxlPlxuXHRcdDx0cj48dGQ+VGl0bGU8L3RkPjx0ZD57e2RhdGEudGl0bGV9fTwvdGQ+PC90cj5cblx0XHQ8dHI+PHRkPlN0YXRlPC90ZD48dGQ+e3tkYXRhLnN0YXRlfX08L3RkPjwvdHI+XG5cdFx0PC90YWJsZT5cblx0XHQ8bmctdGVtcGxhdGUgI25vSXRlbXM+Tm8gSXRlbXMhPC9uZy10ZW1wbGF0ZT5cblx0PC9kaXY+XG48L3NlY3Rpb24+XG48bmctdGVtcGxhdGUgI2xvYWRpbmc+TG9hZGluZy4uLjwvbmctdGVtcGxhdGU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEdlbm9taWNzSW5mb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGFTdHJlYW06IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0uc3Vic2NyaWJlKHN0cm0gPT4gdGhpcy5kYXRhID0gc3RybSk7XG4gIH1cbn1cbiJdfQ==