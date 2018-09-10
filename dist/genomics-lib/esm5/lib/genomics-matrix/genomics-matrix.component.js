/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
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
                    selector: 'tk-genomics-matrix',
                    template: "<section class=\"tk-list\">\n\t<h3>\n\t\tMatrix: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    GenomicsMatrixComponent.ctorParameters = function () { return []; };
    GenomicsMatrixComponent.propDecorators = {
        dataStream: [{ type: Input }]
    };
    return GenomicsMatrixComponent;
}());
export { GenomicsMatrixComponent };
if (false) {
    /** @type {?} */
    GenomicsMatrixComponent.prototype.dataStream;
    /** @type {?} */
    GenomicsMatrixComponent.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtbWF0cml4LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlbm9taWNzLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9nZW5vbWljcy1tYXRyaXgvZ2Vub21pY3MtbWF0cml4LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBdUJ2RDtLQUFpQjs7OztJQUVWLDBDQUFROzs7OztRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQUMsQ0FBQzs7O2dCQXhCdkQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxvY0FZbUM7b0JBQzdDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7Ozs7NkJBRUUsS0FBSzs7a0NBcEJSOztTQW1CYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGstZ2Vub21pY3MtbWF0cml4JyxcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cInRrLWxpc3RcIj5cblx0PGgzPlxuXHRcdE1hdHJpeDogPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEgfCBhc3luYyBhcyBkYXRhIGVsc2UgbG9hZGluZ1wiPnt7ZGF0YS50aXRsZX19PC9uZy1jb250YWluZXI+XG5cdDwvaDM+XG5cdDxkaXYgKm5nSWY9XCJkYXRhIHwgYXN5bmMgYXMgZGF0YSBlbHNlIGxvYWRpbmdcIj5cblx0XHQ8dGFibGU+XG5cdFx0PHRyPjx0ZD5UaXRsZTwvdGQ+PHRkPnt7ZGF0YS50aXRsZX19PC90ZD48L3RyPlxuXHRcdDx0cj48dGQ+U3RhdGU8L3RkPjx0ZD57e2RhdGEuc3RhdGV9fTwvdGQ+PC90cj5cblx0XHQ8L3RhYmxlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjbm9JdGVtcz5ObyBJdGVtcyE8L25nLXRlbXBsYXRlPlxuXHQ8L2Rpdj5cbjwvc2VjdGlvbj5cbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5Mb2FkaW5nLi4uPC9uZy10ZW1wbGF0ZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NNYXRyaXhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhU3RyZWFtOiBhbnk7XG4gIHB1YmxpYyBkYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtLnN1YnNjcmliZShzdHJtID0+IHRoaXMuZGF0YSA9IHN0cm0pO1xuICB9XG5cbn1cbiJdfQ==