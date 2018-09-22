/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, forwardRef } from '@angular/core';
import * as THREE from 'three-full';
import { AbstractObject3D } from '../abstract-object-3d';
var GridHelperDirective = /** @class */ (function (_super) {
    tslib_1.__extends(GridHelperDirective, _super);
    function GridHelperDirective() {
        var _this = _super.call(this) || this;
        console.log('GridHelperDirective.constructor');
        return _this;
    }
    /**
     * @return {?}
     */
    GridHelperDirective.prototype.newObject3DInstance = /**
     * @return {?}
     */
    function () {
        console.log('GridHelperDirective.newObject3DInstance');
        return new THREE.GridHelper(this.size, this.divisions);
    };
    /**
     * @return {?}
     */
    GridHelperDirective.prototype.afterInit = /**
     * @return {?}
     */
    function () {
        console.log('GridHelperDirective.afterInit');
        // none
    };
    GridHelperDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-grid-helper',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return GridHelperDirective; }) }]
                },] }
    ];
    GridHelperDirective.ctorParameters = function () { return []; };
    GridHelperDirective.propDecorators = {
        size: [{ type: Input }],
        divisions: [{ type: Input }]
    };
    return GridHelperDirective;
}(AbstractObject3D));
export { GridHelperDirective };
if (false) {
    /** @type {?} */
    GridHelperDirective.prototype.size;
    /** @type {?} */
    GridHelperDirective.prototype.divisions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1oZWxwZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvaGVscGVycy9ncmlkLWhlbHBlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBaUIsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXpEO0lBSXlDLCtDQUFrQztJQUt6RTtRQUFBLFlBQ0UsaUJBQU8sU0FFUjtRQURDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7SUFDakQsQ0FBQzs7OztJQUVTLGlEQUFtQjs7O0lBQTdCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7SUFFUyx1Q0FBUzs7O0lBQW5CO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzdDLE9BQU87SUFDVCxDQUFDOztnQkF0QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG1CQUFtQixFQUFuQixDQUFtQixDQUFDLEVBQUUsQ0FBQztpQkFDL0Y7Ozs7dUJBR0UsS0FBSzs0QkFDTCxLQUFLOztJQWlCUiwwQkFBQztDQUFBLEFBeEJELENBSXlDLGdCQUFnQixHQW9CeEQ7U0FwQlksbUJBQW1COzs7SUFFOUIsbUNBQXNCOztJQUN0Qix3Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuLi9hYnN0cmFjdC1vYmplY3QtM2QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1ncmlkLWhlbHBlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWJzdHJhY3RPYmplY3QzRCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gR3JpZEhlbHBlckRpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgR3JpZEhlbHBlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0T2JqZWN0M0Q8VEhSRUUuQXhlc0hlbHBlcj4ge1xuXG4gIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgZGl2aXNpb25zOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zb2xlLmxvZygnR3JpZEhlbHBlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuQXhlc0hlbHBlciB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUubmV3T2JqZWN0M0RJbnN0YW5jZScpO1xuICAgIHJldHVybiBuZXcgVEhSRUUuR3JpZEhlbHBlcih0aGlzLnNpemUsIHRoaXMuZGl2aXNpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0dyaWRIZWxwZXJEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiJdfQ==