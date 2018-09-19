/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, forwardRef } from '@angular/core';
import * as THREE from 'three-full';
import { AbstractObject3D } from '../abstract-object-3d';
var AxesHelperDirective = /** @class */ (function (_super) {
    tslib_1.__extends(AxesHelperDirective, _super);
    function AxesHelperDirective() {
        var _this = _super.call(this) || this;
        console.log('AxesHelperDirective.constructor');
        return _this;
    }
    /**
     * @return {?}
     */
    AxesHelperDirective.prototype.newObject3DInstance = /**
     * @return {?}
     */
    function () {
        console.log('AxesHelperDirective.newObject3DInstance');
        return new THREE.AxesHelper(this.size);
    };
    /**
     * @return {?}
     */
    AxesHelperDirective.prototype.afterInit = /**
     * @return {?}
     */
    function () {
        console.log('AxesHelperDirective.afterInit');
        // none
    };
    AxesHelperDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-axes-helper',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return AxesHelperDirective; }) }]
                },] },
    ];
    /** @nocollapse */
    AxesHelperDirective.ctorParameters = function () { return []; };
    AxesHelperDirective.propDecorators = {
        size: [{ type: Input }]
    };
    return AxesHelperDirective;
}(AbstractObject3D));
export { AxesHelperDirective };
if (false) {
    /** @type {?} */
    AxesHelperDirective.prototype.size;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhlcy1oZWxwZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvaGVscGVycy9heGVzLWhlbHBlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBaUIsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQU1oQiwrQ0FBa0M7SUFJekU7UUFBQSxZQUNFLGlCQUFPLFNBRVI7UUFEQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7O0tBQ2hEOzs7O0lBRVMsaURBQW1COzs7SUFBN0I7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hDOzs7O0lBRVMsdUNBQVM7OztJQUFuQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQzs7S0FFOUM7O2dCQXJCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsbUJBQW1CLEVBQW5CLENBQW1CLENBQUMsRUFBRSxDQUFDO2lCQUMvRjs7Ozs7dUJBR0UsS0FBSzs7OEJBVlI7RUFReUMsZ0JBQWdCO1NBQTVDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLWF4ZXMtaGVscGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBeGVzSGVscGVyRGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBBeGVzSGVscGVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5BeGVzSGVscGVyPiB7XG5cbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc29sZS5sb2coJ0F4ZXNIZWxwZXJEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLkF4ZXNIZWxwZXIge1xuICAgIGNvbnNvbGUubG9nKCdBeGVzSGVscGVyRGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLkF4ZXNIZWxwZXIodGhpcy5zaXplKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0F4ZXNIZWxwZXJEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiJdfQ==