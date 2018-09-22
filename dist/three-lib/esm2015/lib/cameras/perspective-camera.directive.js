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
            },] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc3BlY3RpdmUtY2FtZXJhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3RocmVlLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9jYW1lcmFzL3BlcnNwZWN0aXZlLWNhbWVyYS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBTXBDLE1BQU0saUNBQWtDLFNBQVEsY0FBdUM7SUFhckY7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDdEQsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDOzs7O0lBRVMsU0FBUztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDcEQsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQ3ZDLElBQUksQ0FBQyxHQUFHLEVBQ1IsU0FBUyxFQUNULElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO1FBRUYsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVNLGlCQUFpQixDQUFDLE1BQWM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7OztZQTNDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFDO2FBQ3BHOzs7O2tCQUtFLEtBQUs7bUJBQ0wsS0FBSztrQkFDTCxLQUFLO3dCQUVMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLOzs7O0lBTk4seUNBQXFCOztJQUNyQiwwQ0FBc0I7O0lBQ3RCLHlDQUFxQjs7SUFFckIsK0NBQTJCOztJQUMzQiwrQ0FBMkI7O0lBQzNCLCtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDYW1lcmEgfSBmcm9tICcuL2Fic3RyYWN0LWNhbWVyYSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZS1mdWxsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhyZWUtcGVyc3BlY3RpdmUtY2FtZXJhJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBYnN0cmFjdENhbWVyYSwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUpIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RDYW1lcmE8VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE+IHtcblxuICAvLyBASW5wdXQoKSBjYW1lcmFUYXJnZXQ6IFRIUkVFLk9iamVjdDNEO1xuXG4gIEBJbnB1dCgpIGZvdjogbnVtYmVyO1xuICBASW5wdXQoKSBuZWFyOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZhcjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHBvc2l0aW9uWDogbnVtYmVyO1xuICBASW5wdXQoKSBwb3NpdGlvblk6IG51bWJlcjtcbiAgQElucHV0KCkgcG9zaXRpb25aOiBudW1iZXI7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUuY29uc3RydWN0b3InKTtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFmdGVySW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc3BlY3RpdmVDYW1lcmFEaXJlY3RpdmUuYWZ0ZXJJbml0Jyk7XG4gICAgLy8gbGV0IGFzcGVjdFJhdGlvID0gdW5kZWZpbmVkOyAvLyBVcGRhdGVkIGxhdGVyXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoXG4gICAgICB0aGlzLmZvdixcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMubmVhcixcbiAgICAgIHRoaXMuZmFyXG4gICAgKTtcblxuICAgIC8vIFNldCBwb3NpdGlvbiBhbmQgbG9vayBhdFxuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uWDtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvblk7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IHRoaXMucG9zaXRpb25aO1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVBc3BlY3RSYXRpbyhhc3BlY3Q6IG51bWJlcikge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzcGVjdGl2ZUNhbWVyYURpcmVjdGl2ZS51cGRhdGVBc3BlY3RSYXRpbzogJyArIGFzcGVjdCk7XG4gICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gYXNwZWN0O1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxuXG5cbn1cbiJdfQ==