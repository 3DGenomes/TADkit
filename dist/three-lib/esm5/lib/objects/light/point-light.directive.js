/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, forwardRef } from '@angular/core';
import * as THREE from 'three-full';
import { AbstractObject3D } from '../abstract-object-3d';
var PointLightDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PointLightDirective, _super);
    function PointLightDirective() {
        var _this = _super.call(this) || this;
        console.log('PointLightDirective.constructor');
        return _this;
    }
    /**
     * @return {?}
     */
    PointLightDirective.prototype.newObject3DInstance = /**
     * @return {?}
     */
    function () {
        console.log('PointLightDirective.newObject3DInstance');
        return new THREE.PointLight(this.color, this.intensity, this.distance);
    };
    /**
     * @return {?}
     */
    PointLightDirective.prototype.afterInit = /**
     * @return {?}
     */
    function () {
        console.log('PointLightDirective.afterInit');
        // none
    };
    PointLightDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'three-point-light',
                    providers: [{ provide: AbstractObject3D, useExisting: forwardRef(function () { return PointLightDirective; }) }]
                },] },
    ];
    /** @nocollapse */
    PointLightDirective.ctorParameters = function () { return []; };
    PointLightDirective.propDecorators = {
        color: [{ type: Input }],
        intensity: [{ type: Input }],
        distance: [{ type: Input }]
    };
    return PointLightDirective;
}(AbstractObject3D));
export { PointLightDirective };
if (false) {
    /** @type {?} */
    PointLightDirective.prototype.color;
    /** @type {?} */
    PointLightDirective.prototype.intensity;
    /** @type {?} */
    PointLightDirective.prototype.distance;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQtbGlnaHQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWlCLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUFNaEIsK0NBQWtDO0lBTXpFO1FBQUEsWUFDRSxpQkFBTyxTQUVSO1FBREMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDOztLQUNoRDs7OztJQUVTLGlEQUFtQjs7O0lBQTdCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDeEU7Ozs7SUFFUyx1Q0FBUzs7O0lBQW5CO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDOztLQUU5Qzs7Z0JBdkJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUIsQ0FBQyxFQUFFLENBQUM7aUJBQy9GOzs7Ozt3QkFHRSxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSzs7OEJBWlI7RUFReUMsZ0JBQWdCO1NBQTVDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuaW1wb3J0IHsgQWJzdHJhY3RPYmplY3QzRCB9IGZyb20gJy4uL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXBvaW50LWxpZ2h0JyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQb2ludExpZ2h0RGlyZWN0aXZlKSB9XVxufSlcbmV4cG9ydCBjbGFzcyBQb2ludExpZ2h0RGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RPYmplY3QzRDxUSFJFRS5Qb2ludExpZ2h0PiB7XG5cbiAgQElucHV0KCkgY29sb3I6IFRIUkVFLkNvbG9yO1xuICBASW5wdXQoKSBpbnRlbnNpdHk6IG51bWJlcjtcbiAgQElucHV0KCkgZGlzdGFuY2U6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmV3T2JqZWN0M0RJbnN0YW5jZSgpOiBUSFJFRS5Qb2ludExpZ2h0IHtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5Qb2ludExpZ2h0KHRoaXMuY29sb3IsIHRoaXMuaW50ZW5zaXR5LCB0aGlzLmRpc3RhbmNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbm9uZVxuICB9XG5cbn1cbiJdfQ==