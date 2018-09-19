/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, forwardRef } from '@angular/core';
import * as THREE from 'three-full';
import { AbstractObject3D } from '../abstract-object-3d';
export class PointLightDirective extends AbstractObject3D {
    constructor() {
        super();
        console.log('PointLightDirective.constructor');
    }
    /**
     * @return {?}
     */
    newObject3DInstance() {
        console.log('PointLightDirective.newObject3DInstance');
        return new THREE.PointLight(this.color, this.intensity, this.distance);
    }
    /**
     * @return {?}
     */
    afterInit() {
        console.log('PointLightDirective.afterInit');
        // none
    }
}
PointLightDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-point-light',
                providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => PointLightDirective) }]
            },] },
];
/** @nocollapse */
PointLightDirective.ctorParameters = () => [];
PointLightDirective.propDecorators = {
    color: [{ type: Input }],
    intensity: [{ type: Input }],
    distance: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PointLightDirective.prototype.color;
    /** @type {?} */
    PointLightDirective.prototype.intensity;
    /** @type {?} */
    PointLightDirective.prototype.distance;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQtbGlnaHQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvbGlnaHQvcG9pbnQtbGlnaHQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBaUIsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBTXpELE1BQU0sMEJBQTJCLFNBQVEsZ0JBQWtDO0lBTXpFO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7S0FDaEQ7Ozs7SUFFUyxtQkFBbUI7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDeEU7Ozs7SUFFUyxTQUFTO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQzs7S0FFOUM7OztZQXZCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7YUFDL0Y7Ozs7O29CQUdFLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUtZnVsbCc7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdDNEIH0gZnJvbSAnLi4vYWJzdHJhY3Qtb2JqZWN0LTNkJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtcG9pbnQtbGlnaHQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0T2JqZWN0M0QsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBvaW50TGlnaHREaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBvaW50TGlnaHREaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLlBvaW50TGlnaHQ+IHtcblxuICBASW5wdXQoKSBjb2xvcjogVEhSRUUuQ29sb3I7XG4gIEBJbnB1dCgpIGludGVuc2l0eTogbnVtYmVyO1xuICBASW5wdXQoKSBkaXN0YW5jZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc29sZS5sb2coJ1BvaW50TGlnaHREaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZXdPYmplY3QzREluc3RhbmNlKCk6IFRIUkVFLlBvaW50TGlnaHQge1xuICAgIGNvbnNvbGUubG9nKCdQb2ludExpZ2h0RGlyZWN0aXZlLm5ld09iamVjdDNESW5zdGFuY2UnKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLlBvaW50TGlnaHQodGhpcy5jb2xvciwgdGhpcy5pbnRlbnNpdHksIHRoaXMuZGlzdGFuY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnUG9pbnRMaWdodERpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBub25lXG4gIH1cblxufVxuIl19