/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractCamera } from './abstract-camera';
import * as THREE from 'three-full';
export class PerspectiveCameraDirective extends AbstractCamera {
    constructor() {
        console.log('PerspectiveCameraDirective.constructor');
        super();
    }
    /**
     * @return {?}
     */
    afterInit() {
        console.log('PerspectiveCameraDirective.afterInit');
        // let aspectRatio = undefined; // Updated later
        this.camera = new THREE.PerspectiveCamera(this.fov, undefined, this.near, this.far);
        // Set position and look at
        this.camera.position.x = this.positionX;
        this.camera.position.y = this.positionY;
        this.camera.position.z = this.positionZ;
        this.camera.updateProjectionMatrix();
    }
    /**
     * @param {?} aspect
     * @return {?}
     */
    updateAspectRatio(aspect) {
        console.log('PerspectiveCameraDirective.updateAspectRatio: ' + aspect);
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }
}
PerspectiveCameraDirective.decorators = [
    { type: Directive, args: [{
                selector: 'three-perspective-camera',
                providers: [{ provide: AbstractCamera, useExisting: forwardRef(() => PerspectiveCameraDirective) }]
            },] },
];
/** @nocollapse */
PerspectiveCameraDirective.ctorParameters = () => [];
PerspectiveCameraDirective.propDecorators = {
    fov: [{ type: Input }],
    near: [{ type: Input }],
    far: [{ type: Input }],
    positionX: [{ type: Input }],
    positionY: [{ type: Input }],
    positionZ: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PerspectiveCameraDirective.prototype.fov;
    /** @type {?} */
    PerspectiveCameraDirective.prototype.near;
    /** @type {?} */
    PerspectiveCameraDirective.prototype.far;
    /** @type {?} */
    PerspectiveCameraDirective.prototype.positionX;
    /** @type {?} */
    PerspectiveCameraDirective.prototype.positionY;
    /** @type {?} */
    PerspectiveCameraDirective.prototype.positionZ;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RocmVlLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9jYW1lcmFzL3BlcnNwZWN0aXZlLWNhbWVyYS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBTXBDLE1BQU0saUNBQWtDLFNBQVEsY0FBdUM7SUFhckY7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDdEQsS0FBSyxFQUFFLENBQUM7S0FDVDs7OztJQUVTLFNBQVM7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDOztRQUVwRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUN2QyxJQUFJLENBQUMsR0FBRyxFQUNSLFNBQVMsRUFDVCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQzs7UUFHRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7S0FDdEM7Ozs7O0lBRU0saUJBQWlCLENBQUMsTUFBYztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7Ozs7WUExQ3hDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLENBQUM7YUFDcEc7Ozs7O2tCQUtFLEtBQUs7bUJBQ0wsS0FBSztrQkFDTCxLQUFLO3dCQUVMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENhbWVyYSB9IGZyb20gJy4vYWJzdHJhY3QtY2FtZXJhJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlLWZ1bGwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aHJlZS1wZXJzcGVjdGl2ZS1jYW1lcmEnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFic3RyYWN0Q2FtZXJhLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZSkgfV1cbn0pXG5leHBvcnQgY2xhc3MgUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdENhbWVyYTxUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYT4ge1xuXG4gIC8vIEBJbnB1dCgpIGNhbWVyYVRhcmdldDogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgQElucHV0KCkgZm92OiBudW1iZXI7XG4gIEBJbnB1dCgpIG5lYXI6IG51bWJlcjtcbiAgQElucHV0KCkgZmFyOiBudW1iZXI7XG5cbiAgQElucHV0KCkgcG9zaXRpb25YOiBudW1iZXI7XG4gIEBJbnB1dCgpIHBvc2l0aW9uWTogbnVtYmVyO1xuICBASW5wdXQoKSBwb3NpdGlvblo6IG51bWJlcjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS5jb25zdHJ1Y3RvcicpO1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJJbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS5hZnRlckluaXQnKTtcbiAgICAvLyBsZXQgYXNwZWN0UmF0aW8gPSB1bmRlZmluZWQ7IC8vIFVwZGF0ZWQgbGF0ZXJcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShcbiAgICAgIHRoaXMuZm92LFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgdGhpcy5uZWFyLFxuICAgICAgdGhpcy5mYXJcbiAgICApO1xuXG4gICAgLy8gU2V0IHBvc2l0aW9uIGFuZCBsb29rIGF0XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueCA9IHRoaXMucG9zaXRpb25YO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uWTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gdGhpcy5wb3NpdGlvblo7XG4gICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUFzcGVjdFJhdGlvKGFzcGVjdDogbnVtYmVyKSB7XG4gICAgY29uc29sZS5sb2coJ1BlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlLnVwZGF0ZUFzcGVjdFJhdGlvOiAnICsgYXNwZWN0KTtcbiAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSBhc3BlY3Q7XG4gICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICB9XG5cblxufVxuIl19