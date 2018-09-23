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
                template: "<section class=\"tk-list\">\n\t<h3>\n\t\tInfo: <ng-container *ngIf=\"data | async as data else loading\">{{data.title}}</ng-container>\n\t</h3>\n\t<div *ngIf=\"data | async as data else loading\">\n\t\t<table>\n\t\t<tr><td>Title</td><td>{{data.title}}</td></tr>\n\t\t<tr><td>State</td><td>{{data.state}}</td></tr>\n\t\t</table>\n\t\t<ng-template #noItems>No Items!</ng-template>\n\t</div>\n</section>\n<ng-template #loading>Loading...</ng-template>",
                styles: [""]
            }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vub21pY3MtaW5mby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW5vbWljcy1saWIvIiwic291cmNlcyI6WyJsaWIvZ2Vub21pY3MtaW5mby9nZW5vbWljcy1pbmZvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPekQsTUFBTTtJQUlKLGdCQUFnQixDQUFDOzs7O0lBRVYsUUFBUTtRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7WUFiRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsNGNBQTZDOzthQUU5Qzs7Ozt5QkFFRSxLQUFLOzs7O0lBQU4sMkNBQXlCOztJQUN6QixxQ0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGstZ2Vub21pY3MtaW5mbycsXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW5vbWljcy1pbmZvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ2Vub21pY3MtaW5mby5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR2Vub21pY3NJbmZvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YVN0cmVhbTogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbS5zdWJzY3JpYmUoc3RybSA9PiB0aGlzLmRhdGEgPSBzdHJtKTtcbiAgfVxufVxuIl19