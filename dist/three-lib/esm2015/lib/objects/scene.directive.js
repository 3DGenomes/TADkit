/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import * as THREE from 'three-full';
import { AbstractObject3D } from './abstract-object-3d';
export class SceneDirective extends AbstractObject3D {
    constructor() {
        console.log('SceneDirective.constructor');
        super();
    }
    /**
     * @return {?}
     */
    afterInit() {
        console.log('SceneDirective.afterInit');
    }
    /**
     * @return {?}
     */
    newObject3DInstance() {
        console.log('SceneDirective.newObject3DInstance');
        return new THREE.Scene();
    }
}
SceneDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-scene',
                providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => SceneDirective) }]
            },] },
];
/** @nocollapse */
SceneDirective.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdGhyZWUtbGliLyIsInNvdXJjZXMiOlsibGliL29iamVjdHMvc2NlbmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUF3QixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFNeEQsTUFBTSxxQkFBc0IsU0FBUSxnQkFBNkI7SUFFL0Q7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDMUMsS0FBSyxFQUFFLENBQUM7S0FDVDs7OztJQUVTLFNBQVM7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRVMsbUJBQW1CO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzFCOzs7WUFsQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7YUFDMUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQsIElucHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0M0QgfSBmcm9tICcuL2Fic3RyYWN0LW9iamVjdC0zZCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RocmVlLXNjZW5lJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdE9iamVjdDNELCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTY2VuZURpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgU2NlbmVEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdDNEPFRIUkVFLlNjZW5lPiB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLmNvbnN0cnVjdG9yJyk7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZnRlckluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1NjZW5lRGlyZWN0aXZlLmFmdGVySW5pdCcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5ld09iamVjdDNESW5zdGFuY2UoKTogVEhSRUUuU2NlbmUge1xuICAgIGNvbnNvbGUubG9nKCdTY2VuZURpcmVjdGl2ZS5uZXdPYmplY3QzREluc3RhbmNlJyk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5TY2VuZSgpO1xuICB9XG5cbn1cbiJdfQ==