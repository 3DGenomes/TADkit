/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
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
                    selector: 'tk-genomics-info',
                    template: "<section class=\"tk-list\">\n\t<h3>\n\t\tInfo: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    GenomicsInfoComponent.ctorParameters = function () { return []; };
    GenomicsInfoComponent.propDecorators = {
        dataStream: [{ type: Input }]
    };
    return GenomicsInfoComponent;
}());
export { GenomicsInfoComponent };
if (false) {
    /** @type {?} */
    GenomicsInfoComponent.prototype.dataStream;
    /** @type {?} */
    GenomicsInfoComponent.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtaW5mby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW5vbWljcy1saWIvIiwic291cmNlcyI6WyJsaWIvZ2Vub21pY3MtaW5mby9nZW5vbWljcy1pbmZvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBdUJ2RDtLQUFpQjs7OztJQUVWLHdDQUFROzs7OztRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQUMsQ0FBQzs7O2dCQXhCdkQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxrY0FZbUM7b0JBQzdDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7Ozs7NkJBRUUsS0FBSzs7Z0NBcEJSOztTQW1CYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGstZ2Vub21pY3MtaW5mbycsXG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJ0ay1saXN0XCI+XG5cdDxoMz5cblx0XHRJbmZvOiA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YSB8IGFzeW5jIGFzIGRhdGEgZWxzZSBsb2FkaW5nXCI+e3tkYXRhLnRpdGxlfX08L25nLWNvbnRhaW5lcj5cblx0PC9oMz5cblx0PGRpdiAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPlxuXHRcdDx0YWJsZT5cblx0XHQ8dHI+PHRkPlRpdGxlPC90ZD48dGQ+e3tkYXRhLnRpdGxlfX08L3RkPjwvdHI+XG5cdFx0PHRyPjx0ZD5TdGF0ZTwvdGQ+PHRkPnt7ZGF0YS5zdGF0ZX19PC90ZD48L3RyPlxuXHRcdDwvdGFibGU+XG5cdFx0PG5nLXRlbXBsYXRlICNub0l0ZW1zPk5vIEl0ZW1zITwvbmctdGVtcGxhdGU+XG5cdDwvZGl2PlxuPC9zZWN0aW9uPlxuPG5nLXRlbXBsYXRlICNsb2FkaW5nPkxvYWRpbmcuLi48L25nLXRlbXBsYXRlPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5vbWljc0luZm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG59XG4iXX0=